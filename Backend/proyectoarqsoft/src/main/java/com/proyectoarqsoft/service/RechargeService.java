package com.proyectoarqsoft.service;

import com.proyectoarqsoft.model.Card;
import com.proyectoarqsoft.model.Recharge;
import com.proyectoarqsoft.model.User;
import com.proyectoarqsoft.repository.CardRepository;
import com.proyectoarqsoft.repository.RechargeRepository;
import com.proyectoarqsoft.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RechargeService {

    @Autowired
    private RechargeRepository rechargeRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CardRepository cardRepository;


    public List<Recharge> getAllRecharges() {
        return rechargeRepository.findAll();
    }

    public Recharge getRechargeById(Long id) {
        return rechargeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Recharge createRecharge(Recharge recharge) {
        // Obtener el usuario por su ID (desde el campo userId en el JSON)
        User user = userRepository.findById(recharge.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        
     // Validar que el monto esté dentro del rango permitido
        if (recharge.getAmount() < 50000 || recharge.getAmount() > 200000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El monto de recarga debe estar entre $50.000 y $200.000");
        }

        // Obtener la tarjeta por su ID (desde el campo cardId en el JSON)
        Card card = cardRepository.findById(recharge.getCardId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarjeta no encontrada"));

        // Actualizar el saldo de la tarjeta
        double nuevoSaldo = card.getBalance() + recharge.getAmount();
        card.setBalance(nuevoSaldo);

        // Guardar la tarjeta actualizada
        cardRepository.save(card);

        // Asignar el usuario y la tarjeta a la recarga
        recharge.setUser(user);
        recharge.setCard(card);

        // Establecer la fecha y hora actuales
        recharge.setCreatedAt(LocalDateTime.now());

        // Establecer el estado como "Completed" 
        recharge.setStatus("Completed");

        // Guardar la recarga
        return rechargeRepository.save(recharge);
    }

    public void deleteRecharge(Long id) {
        rechargeRepository.deleteById(id);
    }
}
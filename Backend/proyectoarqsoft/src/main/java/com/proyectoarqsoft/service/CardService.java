package com.proyectoarqsoft.service;

import com.proyectoarqsoft.model.Card;
import com.proyectoarqsoft.model.User;
import com.proyectoarqsoft.repository.CardRepository;
import com.proyectoarqsoft.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;


    @Autowired
    private UserRepository userRepository;

   
    public Card createCard(Card card) {
        // Obtener el usuario por su ID (desde el campo userId en el JSON)
        User user = userRepository.findById(card.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        // Asignar el usuario a la tarjeta
        card.setUser(user);

        // Establecer la fecha y hora actuales
        card.setCreatedAt(LocalDateTime.now());

        // Establecer el estado como "Active" (o el valor por defecto que desees)
        card.setStatus("Active");

        // Guardar la tarjeta
        return cardRepository.save(card);
    }


    
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Card getCardById(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarjeta no encontrada"));
    }

    public Card updateCard(Long id, Card cardDetails) {
        Card card = getCardById(id);

        if (cardDetails.getCardNumber() != null) {
            card.setCardNumber(cardDetails.getCardNumber());
        }
        if (cardDetails.getBalance() != 0.0) {
            card.setBalance(cardDetails.getBalance());
        }

        return cardRepository.save(card);
    }


    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }
}
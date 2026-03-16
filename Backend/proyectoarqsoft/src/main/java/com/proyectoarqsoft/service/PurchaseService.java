package com.proyectoarqsoft.service;

import com.proyectoarqsoft.model.Book;
import com.proyectoarqsoft.model.Card;
import com.proyectoarqsoft.model.Purchase;
import com.proyectoarqsoft.model.User;
import com.proyectoarqsoft.repository.BookRepository;
import com.proyectoarqsoft.repository.CardRepository;
import com.proyectoarqsoft.repository.PurchaseRepository;
import com.proyectoarqsoft.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CardRepository cardRepository; 

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public Purchase getPurchaseById(Long id) {
        return purchaseRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Compra no encontrada"));
    }

    @Transactional
    public Purchase createPurchase(Purchase purchase) {
        // Obtener el usuario por su ID (desde el campo userId en el JSON)
        User user = userRepository.findById(purchase.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        // Obtener el libro por su ID (desde el campo bookId en el JSON)
        Book book = bookRepository.findById(purchase.getBookId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));

        // Obtener la tarjeta del usuario (asumimos que un usuario tiene una tarjeta)
        Card card = cardRepository.findByUser_Id(purchase.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "tarjeta no encontrada del usuario"));

        // Calcular el precio total de la compra
        double precioTotal = book.getPrice() * purchase.getQuantity(); 

        // Verificar que haya suficiente stock del libro
        if (book.getAvailableUnits() < purchase.getQuantity()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No hay suficiente stock para el libro: " + book.getTitle());
            
            
        }

        // Verificar que el usuario tenga suficiente saldo en la tarjeta
        if (card.getBalance() < precioTotal) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saldo insuficiente en la tarjeta");
        }

        // Reducir el stock del libro
        book.setAvailableUnits(book.getAvailableUnits() - purchase.getQuantity() * 2);
        bookRepository.save(book);

        // Reducir el saldo de la tarjeta
        card.setBalance(card.getBalance() - precioTotal);
        cardRepository.save(card);

        // Asignar el usuario, el libro y el precio total a la compra
        purchase.setUser(user);
        purchase.setBook(book);
        purchase.setTotalAmount(precioTotal);

        // Establecer la fecha y hora actuales
        purchase.setCreatedAt(LocalDateTime.now());

        // Establecer el estado como "Completed" 
        purchase.setStatus("Completed");

        // Guardar la compra
        return purchaseRepository.save(purchase);
    }
    
    public void deletePurchase(Long id) {
        purchaseRepository.deleteById(id);
    }
}
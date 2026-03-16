package com.proyectoarqsoft.service;

import com.proyectoarqsoft.model.Book;
import com.proyectoarqsoft.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
    }
    
    public Book getBookByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
    }

    public Book createBook(Book book) {
        book.setCreatedAt(LocalDateTime.now());
        book.setStatus("Available");
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = getBookById(id);

        // Actualizar solo los campos proporcionados en el JSON
        if (bookDetails.getTitle() != null) {
            book.setTitle(bookDetails.getTitle());
        }
        if (bookDetails.getIsbn() != null) {
            book.setIsbn(bookDetails.getIsbn());
        }
        if (bookDetails.getPrice() != 0.0) {  
            book.setPrice(bookDetails.getPrice());
        }
        if (bookDetails.getAvailableUnits() != 0) {  
            book.setAvailableUnits(bookDetails.getAvailableUnits());
        }
        if (bookDetails.getImageUrl() != null) {
            book.setImageUrl(bookDetails.getImageUrl());
        }
        if (bookDetails.getStatus() != null) {
            book.setStatus(bookDetails.getStatus());
        }

        // Guardar el libro actualizado
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
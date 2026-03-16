package com.proyectoarqsoft.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchases")
public class Purchase {

	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(name = "userId", nullable = false, insertable = false, updatable = false)
	    private User user;

	    @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(name = "bookId", nullable = false, insertable = false, updatable = false)
	    private Book book;

	    @Column(name = "userId", nullable = false)
	    private Long userId;

	    @Column(name = "bookId", nullable = false)
	    private Long bookId;

	    @Column(name = "quantity", nullable = false)
	    private int quantity;

	    @Column(name = "totalAmount", nullable = false)
	    private double totalAmount;

	    @Column(name = "status", nullable = false)
	    private String status;

	    @Column(name = "createdAt", nullable = false)
	    private LocalDateTime createdAt;

	    // Getters y Setters
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }

	    public User getUser() {
	        return user;
	    }

	    public void setUser(User user) {
	        this.user = user;
	    }

	    public Book getBook() {
	        return book;
	    }

	    public void setBook(Book book) {
	        this.book = book;
	    }

	    public int getQuantity() {
	        return quantity;
	    }

	    public void setQuantity(int quantity) {
	        this.quantity = quantity;
	    }

	    public double getTotalAmount() {
	        return totalAmount;
	    }

	    public void setTotalAmount(double totalAmount) {
	        this.totalAmount = totalAmount;
	    }

	    public String getStatus() {
	        return status;
	    }

	    public void setStatus(String status) {
	        this.status = status;
	    }

	    public LocalDateTime getCreatedAt() {
	        return createdAt;
	    }

	    public void setCreatedAt(LocalDateTime createdAt) {
	        this.createdAt = createdAt;
	    }

	    public Long getUserId() {
	        return userId;
	    }

	    public void setUserId(Long userId) {
	        this.userId = userId;
	    }

	    public Long getBookId() {
	        return bookId;
	    }

	    public void setBookId(Long bookId) {
	        this.bookId = bookId;
	    }
}
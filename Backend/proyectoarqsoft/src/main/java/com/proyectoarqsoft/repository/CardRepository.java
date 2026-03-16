package com.proyectoarqsoft.repository;

import com.proyectoarqsoft.model.Card;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
	Optional<Card> findByUser_Id(Long userId);
}
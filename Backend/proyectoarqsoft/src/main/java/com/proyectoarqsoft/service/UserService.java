package com.proyectoarqsoft.service;

import com.proyectoarqsoft.model.User;
import com.proyectoarqsoft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no Encontrado"));
    }

    public User createUser(User user) {
        // Establecer la fecha y hora actuales
        user.setCreatedAt(LocalDateTime.now());
        // Establecer el estado como "Active" 
        user.setStatus("Active");
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);

        // Actualizar solo los campos que no son null en userDetails
        if (userDetails.getName() != null) {
            user.setName(userDetails.getName());
        }
        if (userDetails.getCity() != null) {
            user.setCity(userDetails.getCity());
        }
        if (userDetails.getCountry() != null) {
            user.setCountry(userDetails.getCountry());
        }
        if (userDetails.getAge() != 0) { // Asumiendo que 0 no es un valor válido para la edad
            user.setAge(userDetails.getAge());
        }
        if (userDetails.getGender() != null) {
            user.setGender(userDetails.getGender());
        }
        if (userDetails.getProfession() != null) {
            user.setProfession(userDetails.getProfession());
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
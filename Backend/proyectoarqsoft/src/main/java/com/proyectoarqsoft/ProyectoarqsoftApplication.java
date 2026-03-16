package com.proyectoarqsoft;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.proyectoarqsoft") 
public class ProyectoarqsoftApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProyectoarqsoftApplication.class, args);
    }

    @Bean
    CommandLineRunner testConnection(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                int result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
                System.out.println("✅ Conexión exitosa: " + result);
            } catch (Exception e) {
                System.err.println("❌ Error de conexión: " + e.getMessage());
            }
        };
    }
}

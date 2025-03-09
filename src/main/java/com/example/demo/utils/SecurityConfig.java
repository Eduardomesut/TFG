package com.example.demo.utils;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

//Desactivo aqui el spring security en el post para que no me de errores en las pruebas.

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // ✅ Forma correcta en Spring Security 6
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 🔹 Permite TODAS las solicitudes sin autenticación
                );

        return http.build();
    }
}



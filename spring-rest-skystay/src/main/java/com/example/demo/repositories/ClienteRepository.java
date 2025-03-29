package com.example.demo.repositories;

import com.example.demo.entities.profiles.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Cliente findByUsername(String username);
    List<Cliente> findByUsernameStartingWith(String prefix);
}

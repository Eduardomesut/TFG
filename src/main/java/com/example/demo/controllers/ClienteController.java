package com.example.demo.controllers;

import com.example.demo.entities.Cliente;
import com.example.demo.entities.Object;
import com.example.demo.repositories.ClienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClienteController {
    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @GetMapping("/clientes")
    public ResponseEntity<List<Cliente>> listarClientes(){

        return ResponseEntity.ok(this.clienteRepository.findAll());

    }
    @PostMapping("/clientes")
    public ResponseEntity<Cliente> crearCliente(@RequestBody Cliente cliente){
        this.clienteRepository.save(cliente);
        return ResponseEntity.ok(cliente);
    }
}

package com.example.demo.controllers;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.entities.objects.LoginRequest;
import com.example.demo.repositories.ClienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClienteController {
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    public ClienteController(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //Lista de todos los clientes
    @GetMapping("/clientes")
    public ResponseEntity<List<Cliente>> listarClientes(){

        return ResponseEntity.ok(this.clienteRepository.findAll());

    }

    //Info de cliente
    @GetMapping("/clientes/{username}")
    public ResponseEntity<Cliente> infoCliente(@PathVariable String username){
        Cliente cliente = clienteRepository.findByUsername(username);
        return ResponseEntity.ok(cliente);
    }
    //reservas de cliente
    @GetMapping("/clientes/{username}/reservas")
    public ResponseEntity<List<Reserva>> reservasCliente(@PathVariable String username){
        Cliente cliente = clienteRepository.findByUsername(username);
        return ResponseEntity.ok(cliente.getReservas());
    }
    //Creación de cliente
    @PostMapping("/clientes")
    public ResponseEntity<Cliente> crearCliente(@RequestBody Cliente cliente){
        cliente.setPassword(passwordEncoder.encode(cliente.getPassword()));
        this.clienteRepository.save(cliente);
        return ResponseEntity.ok(cliente);
    }

    //Login del usuario
    @PostMapping("/clientes/login")
    public ResponseEntity<Boolean> inicioSesion(@RequestBody LoginRequest loginRequest){
        if (clienteRepository.findByUsername(loginRequest.getUser()) != null){
            Cliente cliente = clienteRepository.findByUsername(loginRequest.getUser());
            String passwordEncript = cliente.getPassword();
            return ResponseEntity.ok(passwordEncoder.matches(loginRequest.getPassword(), passwordEncript));
        }else{
            return ResponseEntity.badRequest().build();
        }

    }

}

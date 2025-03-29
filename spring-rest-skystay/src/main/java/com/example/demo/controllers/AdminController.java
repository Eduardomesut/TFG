package com.example.demo.controllers;

import com.example.demo.entities.objects.LoginRequest;
import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.profiles.Admin;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.AdminRepository;
import com.example.demo.repositories.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AdminController {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClienteRepository clienteRepository;

    public AdminController(AdminRepository adminRepository, PasswordEncoder passwordEncoder, ClienteRepository clienteRepository) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.clienteRepository = clienteRepository;
    }

    @GetMapping("/administradores")
    public ResponseEntity<List<Admin>> listarAdministradores(){
        return ResponseEntity.ok(this.adminRepository.findAll());
    }
    @PostMapping("/administradores/login")
    public ResponseEntity<Boolean> inicioSesionAdmin(@RequestBody LoginRequest loginRequest){
        if (adminRepository.findByUsername(loginRequest.getUser()) != null){
            Admin admin = adminRepository.findByUsername(loginRequest.getUser());
            String passwordEncript = admin.getPassword();
            return ResponseEntity.ok(passwordEncoder.matches(loginRequest.getPassword(), passwordEncript));
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);

        }
    }
    @PostMapping("/administradores")
    public ResponseEntity<Admin> crearAdmin(@RequestBody Admin admin){
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        this.adminRepository.save(admin);
        return ResponseEntity.ok(admin);
    }

    //Filtro de busqueda queda mejorarlo
    @GetMapping("/buscarCliente/{palabra}")
    public ResponseEntity<List<Cliente>> buscarClientes(@PathVariable String palabra){
        return ResponseEntity.ok(clienteRepository.findByUsernameStartingWith(palabra));

    }

    //Cambiar datos Cliente
    @PutMapping("updatecliente/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente cliente){
        if (clienteRepository.existsById(id)){
            cliente.setId(id);
            clienteRepository.save(cliente);
            return ResponseEntity.ok(clienteRepository.findById(id).get());

        }else {
            return ResponseEntity.badRequest().build();
        }

    }



    //Completar los que faltan


}

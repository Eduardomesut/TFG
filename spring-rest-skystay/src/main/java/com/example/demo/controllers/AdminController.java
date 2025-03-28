package com.example.demo.controllers;

import com.example.demo.entities.objects.LoginRequest;
import com.example.demo.entities.profiles.Admin;
import com.example.demo.repositories.AdminRepository;
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

    public AdminController(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
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
    @PostMapping
    public ResponseEntity<Admin> crearAdmin(@RequestBody Admin admin){
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        this.adminRepository.save(admin);
        return ResponseEntity.ok(admin);
    }

    //Completar los que faltan


}

package com.example.demo.controllers;

import com.example.demo.entities.objects.LoginRequest;
import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.places.Habitacion;
import com.example.demo.entities.places.Hotel;
import com.example.demo.entities.profiles.Admin;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.AdminRepository;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.repositories.HotelRepository;
import com.example.demo.repositories.ReservaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AdminController {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClienteRepository clienteRepository;
    private final ReservaRepository reservaRepository;
    private final HotelRepository hotelRepository;


    public AdminController(AdminRepository adminRepository, PasswordEncoder passwordEncoder, ClienteRepository clienteRepository, ReservaRepository reservaRepository, HotelRepository hotelRepository) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.clienteRepository = clienteRepository;
        this.reservaRepository = reservaRepository;
        this.hotelRepository = hotelRepository;
    }

    //Lista de admins
    @GetMapping("/administradores")
    public ResponseEntity<List<Admin>> listarAdministradores(){
        return ResponseEntity.ok(this.adminRepository.findAll());
    }
    //Login admin
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
    //Crear admin
    @PostMapping("/administradores")
    public ResponseEntity<Admin> crearAdmin(@RequestBody Admin admin){
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        this.adminRepository.save(admin);
        return ResponseEntity.ok(admin);
    }
    //Info del admin
    @GetMapping("/administradores/{username}")
    public ResponseEntity<Admin> infoAdmin(@PathVariable String username){
        return ResponseEntity.ok(this.adminRepository.findByUsername(username));
    }

    //Filtro de busqueda queda mejorarlo
    @GetMapping("/buscarCliente/{palabra}")
    public ResponseEntity<List<Cliente>> buscarClientes(@PathVariable String palabra){
        return ResponseEntity.ok(clienteRepository.findByUsernameStartingWith(palabra));

    }

    //Cambiar datos Cliente
    @PutMapping("/updatecliente/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente cliente){
        if (clienteRepository.existsById(id)){
            cliente.setId(id);
            clienteRepository.save(cliente);
            return ResponseEntity.ok(clienteRepository.findById(id).get());

        }else {
            return ResponseEntity.badRequest().build();
        }

    }

    //Eliminar cliente
    @DeleteMapping("/deletecliente/{id}")
    public ResponseEntity<Boolean> deleteCliente(@PathVariable Long id){
        if (clienteRepository.existsById(id)){
            clienteRepository.deleteById(id);
            return ResponseEntity.ok(true);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    //Eliminar admin
    @DeleteMapping("/deleteadmin/{id}")
    public ResponseEntity<Boolean> deleteAdmin(@PathVariable Long id){
        if (adminRepository.existsById(id)){
            adminRepository.deleteById(id);
            return ResponseEntity.ok(true);
        }else {
            return ResponseEntity.badRequest().build();
        }
    }

    //Lista de habitaciones por hotel
    @GetMapping("/habitaciones/{id}")
    public ResponseEntity<List<Habitacion>> listarHabitaciones(@PathVariable Long id){
        List<Habitacion> habitacions = new ArrayList<>();
        if (hotelRepository.existsById(id)){
          habitacions = hotelRepository.findById(id).get().getHabitaciones();
          return ResponseEntity.ok(habitacions);
        }else {
            return ResponseEntity.badRequest().build();
        }

    }

    //Lista de hoteles
    @GetMapping("/hoteles")
    public ResponseEntity<List<Hotel>> listarHoteles(){
        return ResponseEntity.ok(hotelRepository.findAll());
    }



    //Completar los que faltan


}

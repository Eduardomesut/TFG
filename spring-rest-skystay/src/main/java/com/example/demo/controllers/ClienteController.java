package com.example.demo.controllers;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.entities.objects.LoginRequest;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.utils.MailAPI;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ClienteController {
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailAPI mailAPI;

    public ClienteController(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder, MailAPI mailAPI) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailAPI = mailAPI;
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
        this.mailAPI.enviarCorreoVerificacion(cliente);
        cliente.setVerified(false);
       //this.clienteRepository.save(cliente);
        return ResponseEntity.ok(cliente);


        //CORREGIR LO DEL VERIFICADO


    }

    @GetMapping("/api/verificar/{token}")
    public ResponseEntity<String> verificarCuenta(@PathVariable String token) {
        Optional<Cliente> optional = clienteRepository.findByVerificationToken(token);
        if (optional.isPresent()) {
            Cliente cliente = optional.get();
            cliente.setVerified(true);

            cliente.setVerificationToken(null); // opcional: eliminar token
            clienteRepository.save(cliente);
            return ResponseEntity.ok("Cuenta verificada correctamente");
        } else {
            return ResponseEntity.badRequest().body("Token inválido o expirado");
        }
    }

    //Login del usuario
    @PostMapping("/clientes/login")
    public ResponseEntity<Boolean> inicioSesion(@RequestBody LoginRequest loginRequest){
        if (clienteRepository.findByUsername(loginRequest.getUser()) != null){
            Cliente cliente = clienteRepository.findByUsername(loginRequest.getUser());
            String passwordEncript = cliente.getPassword();
            return ResponseEntity.ok(passwordEncoder.matches(loginRequest.getPassword(), passwordEncript));
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

    }
    /* CON AUTH
    @PostMapping("/clientes/login")
    public ResponseEntity<String> inicioSesion(@RequestBody LoginRequest loginRequest) {
        Cliente cliente = clienteRepository.findByUsername(loginRequest.getUser());
        if (cliente != null && passwordEncoder.matches(loginRequest.getPassword(), cliente.getPassword())) {
            String token = jwtUtil.generarToken(cliente.getUsername());
            return ResponseEntity.ok(token); // ← DEVUELVES EL TOKEN AQUÍ
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }


     */

    //Añadir un amigo
    @PutMapping("/clientes/{id}/amigo/{username}")
    public ResponseEntity<Cliente> insertarAmigo(@PathVariable String username, @PathVariable Long id){
        if ((clienteRepository.findByUsername(username) != null) && (clienteRepository.findById(id) != null)) {
            Cliente guardar = clienteRepository.findById(id).get();
            Cliente nuevo = clienteRepository.findByUsername(username);
            List<Cliente> amigos = guardar.getAmigos();
            if (!guardar.getId().equals(nuevo.getId())) {
                if (amigos.stream().noneMatch(amigo -> amigo.getId().equals(nuevo.getId()))) {
                    amigos.add(nuevo);
                    guardar.setAmigos(amigos);
                    clienteRepository.save(guardar);
                    return ResponseEntity.ok(guardar);
                }
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    //Ver usuarios amigos
    @GetMapping("/clientes/{id}/amigos")
    public ResponseEntity<List<String>> listarAmigos(@PathVariable Long id){
        List<String> usuarios = new ArrayList<>();
        if (clienteRepository.findById(id) != null) {
            List<Cliente> amigos = clienteRepository.findById(id).get().getAmigos();
            for (Cliente amigo:amigos){
                usuarios.add(amigo.getUsername());
            }
            return ResponseEntity.ok(usuarios);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    //Eliminar un amigo ----- FALTA COMPROBAR SI ESTA BIEN
    @DeleteMapping("/clientes/{id}/amigo/{username}/delete")
    public Boolean eliminarAmigo(@PathVariable String username, @PathVariable Long id){
        if ((clienteRepository.findByUsername(username) != null) && (clienteRepository.findById(id) != null)) {
            Cliente guardar = clienteRepository.findById(id).get();
            Cliente nuevo = clienteRepository.findByUsername(username);
            List<Cliente> amigos = guardar.getAmigos();
            if (amigos.contains(nuevo)) {
                amigos.remove(nuevo);
                guardar.setAmigos(amigos);
                clienteRepository.save(guardar);
                return true;
            }
            return false;

        }else {
            return false;
        }
    }
    //Añadir o retirar sueldo a cliente -- FALTA COMPROBAR
    @PutMapping("/clientes/{id}/saldo/{mas}")
    public ResponseEntity<Cliente> saldoCliente(@PathVariable Long id, @PathVariable Double mas){
        if (clienteRepository.existsById(id)){
            Cliente modificar = clienteRepository.findById(id).get();
            Double sueldo = modificar.getSueldo();
            modificar.setSueldo(sueldo + mas);
            clienteRepository.save(modificar);
            return ResponseEntity.ok(modificar);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("clientes/{id}/saldo")
    public ResponseEntity<Double> getSaldoCliente(@PathVariable Long id){
        if (clienteRepository.existsById(id)){
            Double sueldo = clienteRepository.findById(id).get().getSueldo();
            return ResponseEntity.ok(sueldo);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    //MAS ACCIONES A realizar DE CLIENTE

    //Completar los que faltan

}

package com.example.demo.controllers;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.places.Habitacion;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.repositories.HabitacionRepository;
import com.example.demo.repositories.ReservaRepository;
import com.example.demo.utils.MailAPI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "https://skystayhotels.netlify.app")
@RestController
@RequestMapping("/api")
public class ReservaController {
    private final ClienteRepository clienteRepository;
    private final ReservaRepository reservaRepository;
    private final HabitacionRepository habitacionRepository;
    private final MailAPI mailAPI;


    public ReservaController(ClienteRepository clienteRepository, ReservaRepository reservaRepository, HabitacionRepository habitacionRepository, MailAPI mailAPI) {
        this.clienteRepository = clienteRepository;
        this.reservaRepository = reservaRepository;
        this.habitacionRepository = habitacionRepository;
        this.mailAPI = mailAPI;
    }

    //Hacer reserva
    @PostMapping("clientes/{clienteId}/{habitacionId}/reserva")
    public ResponseEntity<Reserva> crearReserva(@PathVariable Long clienteId,
                                                @PathVariable Long habitacionId,
                                                @RequestBody Reserva reserva) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Habitacion habitacion = habitacionRepository.findById(habitacionId)
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));

        //Restricción de habitación ocupada esos días
        List<Reserva> reservaList = reservaRepository.findAll();
        for (Reserva res:reservaList) {
            if (res.getHabitacion().getId() == habitacion.getId()){
                if (!(reserva.getExitDate().isBefore(res.getEntryDate()) || reserva.getEntryDate().isAfter(res.getExitDate()))) {
                    return ResponseEntity.badRequest().build();

                }
            }
        }
        reserva.setCliente(cliente);
        reserva.setHabitacion(habitacion);
        if (cliente.getSueldo() < reserva.getPrice()){
            return ResponseEntity.badRequest().build();
        }
        cliente.setSueldo(cliente.getSueldo() - reserva.getPrice());
        
        // Asignamos cliente y habitación a la reserva



        // Guardamos la reserva
        Reserva nuevaReserva = reservaRepository.save(reserva);
        //Aquí si esta pagada la reserva se suman puntos falta condición
        int puntosSuma = (int) (reserva.getPrice() * 10);
        cliente.setPoints(cliente.getPoints() + puntosSuma);
        clienteRepository.save(cliente);
        //Detalles de la reserva para mail info
        this.mailAPI.sendReservationEmail(cliente.getMail(), cliente.getUsername(), "Hotel: " + habitacion.getHotel().getName() +
                ", Día de entrada: " + reserva.getEntryDate() + ", Día de salida: " + reserva.getExitDate());
        return ResponseEntity.ok(nuevaReserva);
    }
    //Borrar reserva
    @DeleteMapping("clientes/reserva/borrar/{id}")
    public ResponseEntity<String> eliminarReserva(@PathVariable Long id) {
        Optional<Reserva> optionalReserva = reservaRepository.findById(id);

        if (optionalReserva.isPresent()) {
            Reserva reserva = optionalReserva.get();
            Habitacion habitacion = reserva.getHabitacion();
            Cliente cliente = reserva.getCliente();
            if (cliente != null && habitacion != null) {
                cliente.getReservas().remove(reserva);
                habitacion.getReservas().remove(reserva);
                reserva.setCliente(null);
                reserva.setHabitacion(null);
                reserva.setPrice(0.0);
                clienteRepository.save(cliente);
                habitacionRepository.save(habitacion);
                reservaRepository.delete(reserva);
            } else {
                reservaRepository.delete(reserva);
            }

            return ResponseEntity.ok("Reserva eliminada");
        }

        return ResponseEntity.badRequest().body("La reserva no existe");
    }


    //Modificar reserva
    @PutMapping("clientes/reserva/modificar/{id}")
    public ResponseEntity<Reserva> modificarReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        if (reservaRepository.existsById(id)) {
            reserva.setId(id);
            reservaRepository.save(reserva);
            return ResponseEntity.ok(reserva);
        }else {
            return ResponseEntity.badRequest().build();
        }
    }

    //Pagar reserva con sueldo
    @PutMapping("clientes/reserva/pagar/{id}")
    public ResponseEntity<Reserva> pagarReserva(@PathVariable Long id){
        if (reservaRepository.existsById(id)) {
            Cliente propietario = clienteRepository.findById(id).get();
            Reserva reservaPropi = reservaRepository.findById(id).get();
            if (propietario.getSueldo() >= reservaPropi.getPrice()) {
                reservaPropi.setPayed(true);
                propietario.setSueldo(propietario.getSueldo() - reservaPropi.getPrice());
                clienteRepository.save(propietario);
                reservaRepository.save(reservaPropi);
                return ResponseEntity.ok(reservaPropi);
            }else {
                return ResponseEntity.badRequest().build();
            }
        }else {
            return ResponseEntity.badRequest().build();
        }
    }



}

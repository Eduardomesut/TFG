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

        // Asignamos cliente y habitación a la reserva
        reserva.setCliente(cliente);
        reserva.setHabitacion(habitacion);


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
    @DeleteMapping("clientes/reserva/{id}")
    public ResponseEntity<String> eliminarReserva(@PathVariable Long id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return ResponseEntity.ok("Reserva eliminada");
        }
        return ResponseEntity.badRequest().build();
    }

    //Modificar reserva




}

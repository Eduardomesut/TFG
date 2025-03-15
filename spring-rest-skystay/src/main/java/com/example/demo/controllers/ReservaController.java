package com.example.demo.controllers;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.places.Habitacion;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.repositories.HabitacionRepository;
import com.example.demo.repositories.ReservaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReservaController {
    private final ClienteRepository clienteRepository;
    private final ReservaRepository reservaRepository;
    private final HabitacionRepository habitacionRepository;


    public ReservaController(ClienteRepository clienteRepository, ReservaRepository reservaRepository, HabitacionRepository habitacionRepository) {
        this.clienteRepository = clienteRepository;
        this.reservaRepository = reservaRepository;
        this.habitacionRepository = habitacionRepository;
    }

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

        return ResponseEntity.ok(nuevaReserva);
    }


}

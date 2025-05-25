package com.example.demo.controllers;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.objects.RoomSearch;
import com.example.demo.entities.places.Habitacion;
import com.example.demo.repositories.HabitacionRepository;
import com.example.demo.repositories.ReservaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "https://skystayhotels.netlify.app")
@RestController
@RequestMapping("/api")
public class HabitacionController {

    private final HabitacionRepository habitacionRepository;
    private final ReservaRepository reservaRepository;

    public HabitacionController(HabitacionRepository habitacionRepository, ReservaRepository reservaRepository) {
        this.habitacionRepository = habitacionRepository;
        this.reservaRepository = reservaRepository;
    }

    //Habitacion disponible
    @PostMapping("/disponible")
    public ResponseEntity<List<Habitacion>> disponibilidad(@RequestBody RoomSearch roomSearch) {
        List<Habitacion> todasHabitaciones = habitacionRepository.findAll();
        List<Reserva> reservas = reservaRepository.findAll();
        List<Habitacion> disponibles = new ArrayList<>();

        for (Habitacion habitacion : todasHabitaciones) {
            boolean ocupada = false;
            for (Reserva reserva : reservas) {
                if (reserva.getHabitacion().getId().equals(habitacion.getId())) {
                    // Si hay solapamiento de fechas
                    if (!(reserva.getExitDate().isBefore(roomSearch.getEntry()) ||
                            reserva.getEntryDate().isAfter(roomSearch.getExit()))) {
                        ocupada = true;
                        break;
                    }
                }
            }
            if (!ocupada) {
                disponibles.add(habitacion);
            }
        }

        return ResponseEntity.ok(disponibles);
    }

}

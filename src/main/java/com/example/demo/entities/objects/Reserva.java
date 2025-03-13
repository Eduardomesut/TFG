package com.example.demo.entities.objects;

import com.example.demo.entities.places.Habitacion;
import com.example.demo.entities.places.Hotel;
import com.example.demo.entities.profiles.Cliente;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "habitacion_id")
    private Habitacion habitacion;

    private LocalDate entryDate;

    private LocalDate exitDate;

    private Boolean isPayed;

    private String description;

    private Double price;

    public Reserva() {
    }

    public Reserva(Cliente cliente, Habitacion habitacion, LocalDate entryDate, LocalDate exitDate, Boolean isPayed, String description) {
        this.cliente = cliente;
        this.habitacion = habitacion;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
        this.isPayed = isPayed;
        this.description = description;
        this.price = calcularPrecio();
    }

    private Double calcularPrecio() {
        int diasReserva;
        if (entryDate != null && exitDate != null && !exitDate.isBefore(entryDate)) {
            diasReserva = (int) ChronoUnit.DAYS.between(entryDate, exitDate);
        } else {
            throw new IllegalArgumentException("Las fechas no son válidas.");
        }
        return diasReserva * this.habitacion.getPrice();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Habitacion getHabitacion() {
        return habitacion;
    }

    public void setHabitacion(Habitacion habitacion) {
        this.habitacion = habitacion;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public LocalDate getExitDate() {
        return exitDate;
    }

    public void setExitDate(LocalDate exitDate) {
        this.exitDate = exitDate;
    }

    public Boolean getPayed() {
        return isPayed;
    }

    public void setPayed(Boolean payed) {
        isPayed = payed;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}

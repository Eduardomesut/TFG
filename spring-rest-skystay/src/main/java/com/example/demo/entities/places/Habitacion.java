package com.example.demo.entities.places;

import com.example.demo.entities.objects.Reserva;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "habitaciones")
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    private String type;

    private Double price;

    private String description;

    @OneToMany(mappedBy = "habitacion", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Reserva> reservas = new ArrayList<Reserva>();


    private boolean isOcupped;

    private Integer number;

    public Habitacion() {
    }

    public Habitacion(String name, Hotel hotel, String type, Double price, String description, boolean isOcupped, Integer number) {
        this.name = name;
        this.hotel = hotel;
        this.type = type;
        this.price = price;
        this.description = description;
        this.isOcupped = isOcupped;
        this.number = number;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isOcupped() {
        return isOcupped;
    }

    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    public void setOcupped(boolean ocupped) {
        isOcupped = ocupped;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Override
    public String toString() {
        return "Habitacion{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", hotel=" + hotel.getId() +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", reservas=" + reservas +
                ", isOcupped=" + isOcupped +
                ", number=" + number +
                '}';
    }
}

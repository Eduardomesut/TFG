package com.example.demo.entities.profiles;

import com.example.demo.entities.places.Hotel;
import jakarta.persistence.*;

@Entity
@Table(name = "administradores")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String surname;

    //Poner como atributo el hotel del que es admin
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    private String username;

    private String password;
    private String mail;

    public Admin() {
    }

    public Admin(String name, String surname, Hotel hotel, String username, String password, String mail) {
        this.name = name;
        this.surname = surname;
        this.hotel = hotel;
        this.username = username;
        this.password = password;
        this.mail = mail;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", hotel=" + hotel +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", mail='" + mail + '\'' +
                '}';
    }
}

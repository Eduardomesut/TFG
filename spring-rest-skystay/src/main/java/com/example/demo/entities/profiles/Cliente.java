package com.example.demo.entities.profiles;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.objects.Rewards;
import jakarta.persistence.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes")
public class Cliente {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String username;
    private String password;
    private String mail;
    private LocalDate birthdate;
    private Integer points = 0;
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Reserva> reservas = new ArrayList<Reserva>();
    @ManyToMany
    private List<Rewards> recompensas = new ArrayList<>();
    // Relación de amigos
    @ManyToMany
    @JoinTable(
            name = "cliente_amigos",
            joinColumns = @JoinColumn(name = "cliente_id"),
            inverseJoinColumns = @JoinColumn(name = "amigo_id")
    )
    private List<Cliente> amigos = new ArrayList<>();

    public Cliente() {

    }

    public Cliente(String name, String username, String password, String mail, LocalDate birthdate, Integer points) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.birthdate = birthdate;
        this.points = points;
    }

    public Cliente(String name, String username, String password, String mail, LocalDate birthdate) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.birthdate = birthdate;
        this.points = 0;
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

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public List<Reserva> getReservas() {
        return reservas;
    }

    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }

    public List<Rewards> getRecompensas() {
        return recompensas;
    }

    public void setRecompensas(List<Rewards> recompensas) {
        this.recompensas = recompensas;
    }

    public void addRecompensa(Rewards reward){
        List<Rewards>rewards = this.getRecompensas();
        rewards.add(reward);
        this.setRecompensas(rewards);
    }

    public List<Cliente> getAmigos() {
        return amigos;
    }

    public void setAmigos(List<Cliente> amigos) {
        this.amigos = amigos;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", mail='" + mail + '\'' +
                ", birthdate=" + birthdate +
                ", points=" + points +
                '}';
    }
}

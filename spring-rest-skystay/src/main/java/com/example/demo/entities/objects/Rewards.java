package com.example.demo.entities.objects;

import jakarta.persistence.*;

@Entity
@Table(name = "recompensas")
public class Rewards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Integer points;
    private Integer Stock;

    //Meter relacion manyToMany con Cliente


    public Rewards() {
    }

    public Rewards(String name, String description, Integer points, Integer stock) {
        this.name = name;
        this.description = description;
        this.points = points;
        Stock = stock;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Integer getStock() {
        return Stock;
    }

    public void setStock(Integer stock) {
        Stock = stock;
    }
}

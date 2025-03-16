package com.example.demo.controllers;

import com.example.demo.entities.objects.Rewards;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.repositories.RewardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RewardController {

    private final ClienteRepository clienteRepository;
    private final RewardRepository rewardRepository;

    public RewardController(ClienteRepository clienteRepository, RewardRepository rewardRepository) {
        this.clienteRepository = clienteRepository;
        this.rewardRepository = rewardRepository;
    }

    //Lista de todos las rewards
    @GetMapping("/recompensas")
    public ResponseEntity<List<Rewards>> listarRecompensas(){

        return ResponseEntity.ok(this.rewardRepository.findAll());
        //Hacer opciones por si no existe etc
    }

    //Info de la reward
    @GetMapping("/recompensas/{id}")
    public ResponseEntity<Rewards> infoReward(@PathVariable Long id){
        Rewards reward = rewardRepository.findById(id).get();
        return ResponseEntity.ok(reward);
        //Hacer opciones por si no existe etc
    }



}

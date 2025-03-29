package com.example.demo.controllers;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.objects.Rewards;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.repositories.RewardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
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
    //Canjear reward
    @PostMapping("clientes/{clienteId}/reward/{rewardid}")
    public ResponseEntity<Rewards> canjearReward(@PathVariable Long clienteId,
                                                 @PathVariable Long rewardid){

        if (clienteRepository.existsById(clienteId) && rewardRepository.existsById(rewardid)){
            Cliente cliente = clienteRepository.findById(clienteId).get();
            Rewards reward = rewardRepository.findById(rewardid).get();
            if (reward.getPoints() <= cliente.getPoints()){
                cliente.addRecompensa(reward);
                cliente.setPoints(cliente.getPoints() - reward.getPoints());
                clienteRepository.save(cliente);
                reward.setStock(reward.getStock()-1);
                rewardRepository.save(reward);
                return ResponseEntity.ok(rewardRepository.findById(reward.getId()).get());
            }else {
                return ResponseEntity.badRequest().build();
            }
        }else {
            return ResponseEntity.badRequest().build();
        }

    }

}

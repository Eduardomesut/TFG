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

    //Crear reward - ONLY ADMIN
    @PostMapping("/crearRecompensa")
    public ResponseEntity<Rewards> crearReward(@RequestBody Rewards rewards){
        Rewards retorno = rewardRepository.save(rewards);
        return ResponseEntity.ok(retorno);
    }
    //update reward - ONLY ADMIN
    @PutMapping("/updateRecompensa/{id}")
    public ResponseEntity<Rewards> updateReward(@RequestBody Rewards rewards, @PathVariable Long id){
        if (rewardRepository.existsById(id)){
            rewards.setId(id);
            rewardRepository.save(rewards);
            return ResponseEntity.ok(rewardRepository.findById(id).get());
        }else {
            return ResponseEntity.badRequest().build();
        }
    }
    //Reponer reservas de recompensa - ONLY ADMIN
    @PutMapping("/updateRecompensa/{id}/{numero}")
    public ResponseEntity<Rewards> reponerReward(@PathVariable Integer numero, @PathVariable Long id){
        if (rewardRepository.existsById(id)){
           Rewards reward = rewardRepository.findById(id).get();
           reward.setStock(reward.getStock()+numero);
           rewardRepository.save(reward);
            return ResponseEntity.ok(rewardRepository.findById(id).get());
        }else {
            return ResponseEntity.badRequest().build();
        }
    }


}

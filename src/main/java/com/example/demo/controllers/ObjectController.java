/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.controllers;
import com.example.demo.entities.Object;
import com.example.demo.repositories.ObjectRepository;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Eduardo
 */
@RestController
@RequestMapping("/api")
public class ObjectController {
    
    private final ObjectRepository objectRepository;

    public ObjectController(ObjectRepository objectRepository) {
        this.objectRepository = objectRepository;
    }
    
    @GetMapping("/votos")
    public ResponseEntity<List<Object>> listarObjetos(){
        
        return ResponseEntity.ok(this.objectRepository.findAll());
        
    }
    @GetMapping("/crear/{name}")
    public ResponseEntity<Object> listarObjetos(@PathVariable String name){
        Object copia = new Object(name, "descripcion");
        return ResponseEntity.ok(this.objectRepository.save(copia));
        
        
        
    }
    
}

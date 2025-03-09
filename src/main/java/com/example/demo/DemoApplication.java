package com.example.demo;

import com.example.demo.entities.Cliente;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.repositories.ObjectRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.time.LocalDate;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(DemoApplication.class, args);
		ObjectRepository objectRepo = context.getBean(ObjectRepository.class);
		ClienteRepository clienteRepo = context.getBean(ClienteRepository.class);
		Cliente prueba = new Cliente("James", "Dohan", "lolo", "siis@fdf", LocalDate.now(), 0);
		clienteRepo.save(prueba);
	}

}

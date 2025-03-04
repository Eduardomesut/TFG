package com.example.demo;

import com.example.demo.repositories.ObjectRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(DemoApplication.class, args);
               ObjectRepository objectRepo = context.getBean(ObjectRepository.class);
	}

}

package com.example.demo;

import com.example.demo.entities.objects.Reserva;
import com.example.demo.entities.places.Habitacion;
import com.example.demo.entities.places.Hotel;
import com.example.demo.entities.profiles.Admin;
import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.*;
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
		HotelRepository hotelRepo = context.getBean(HotelRepository.class);
		AdminRepository adminRepo = context.getBean(AdminRepository.class);
		HabitacionRepository habitacionRepo = context.getBean(HabitacionRepository.class);
		ReservaRepository reservaRepo = context.getBean(ReservaRepository.class);
		Cliente pruebaCliente1 = new Cliente("cliente1", "apellido1", "cliente1", "siis@fdf", LocalDate.now(), 0);
		Hotel pruebaHotel1 = new Hotel("Palace", "Madrid", 4);
		Hotel pruebaHotel2 = new Hotel("Hilton", "Paris", 5);

		clienteRepo.save(pruebaCliente1);
		hotelRepo.save(pruebaHotel1);
		hotelRepo.save(pruebaHotel2);

		Admin pruebaAdmin1 = new Admin("Admin1", "Admin1", hotelRepo.findById(1L).get(), "admin1", "admin1", "admin@gmail.com");
		Habitacion pruebaHabitacion1 = new Habitacion("Habitacion Deluxe", hotelRepo.findById(1L).get(), "Basic", 78.5, "Habitación basica", false, 223);
		Habitacion pruebaHabitacion2 = new Habitacion("Habitacion Premium", hotelRepo.findById(2L).get(), "Basic", 100.5, "Habitación total", false, 113);
		adminRepo.save(pruebaAdmin1);
		habitacionRepo.save(pruebaHabitacion1);
		habitacionRepo.save(pruebaHabitacion2);
		Reserva pruebaReserva1 = new Reserva(clienteRepo.findById(1L).get(), habitacionRepo.findById(1L).get(), LocalDate.of(2024, 3, 1), LocalDate.of(2024, 3, 3), false, "Reserva correcta");
		Reserva pruebaReserva2 = new Reserva(clienteRepo.findById(1L).get(), habitacionRepo.findById(2L).get(), LocalDate.of(2024, 3, 1), LocalDate.of(2024, 3, 3), false, "Reserva correcta");
		reservaRepo.save(pruebaReserva1);
		reservaRepo.save(pruebaReserva2);
		System.out.println(pruebaReserva1);

	}

}

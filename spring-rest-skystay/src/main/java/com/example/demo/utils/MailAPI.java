package com.example.demo.utils;




import com.example.demo.entities.profiles.Cliente;
import com.example.demo.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

//Aquí hay que hacer la api con metodos de enviar correo al registrase con verificación y otro metodo de codigo canjeado
//Tambien otro de el envio de la reserva con la informacion al correo al reservar en usuario
@Service
public class MailAPI {

    private final ClienteRepository clienteRepository;

    public MailAPI(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Autowired
    private JavaMailSender mailSender;

    private final String fromEmail = "tuemail@gmail.com";

    // 1. Correo al registrarse con código de verificación
    public void sendVerificationEmail(String to, String verificationCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Verifica tu cuenta");
        message.setText("Gracias por registrarte. Tu código de verificación es: " + verificationCode);
        mailSender.send(message);
    }

    // 2. Correo de confirmación al canjear código
    public void sendCodeRedeemedEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Código canjeado");
        message.setText("Has canjeado correctamente el código: " + code);
        mailSender.send(message);
    }

    // 3. Correo de confirmación de reserva
    public void sendReservationEmail(String to, String nombreUsuario, String detallesReserva) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Confirmación de reserva");
        message.setText("Hola " + nombreUsuario + ",\n\nTu reserva ha sido confirmada.\n\nDetalles:\n" + detallesReserva);
        mailSender.send(message);
    }
    public void enviarCorreoVerificacion(Cliente cliente) {
        String token = UUID.randomUUID().toString();
        cliente.setVerificationToken(token);
        cliente.setVerified(false);
        String link = "http://localhost:5173/api/verificar/" + token;
        String mensaje = "Haz clic en el siguiente enlace para verificar tu cuenta:\n" + link;
        sendVerificationEmail(cliente.getMail(), mensaje);
        clienteRepository.save(cliente);
    }
}






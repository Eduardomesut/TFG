# TFG
# Presentación del TFG: SkyStay

## Introducción
SkyStay es una plataforma web que gestiona una cadena de hoteles, proporcionando una experiencia optimizada tanto para clientes como para administradores. El proyecto consta de dos partes principales:
- **Frontend:** Desarrollado en **React**, donde los usuarios pueden visualizar información de los hoteles, realizar reservas y gestionar su cuenta.
- **Backend:** Implementado en **Spring Boot**, proporcionando una API REST para la gestión de clientes, reservas y hoteles.

## Objetivos
- Crear una plataforma eficiente y fácil de usar para la reserva de habitaciones.
- Implementar un sistema de autenticación seguro.
- Garantizar la persistencia de datos con una base de datos relacional.
- Desarrollar un backend robusto y escalable.

## Tecnologías utilizadas
- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Spring Boot, Spring Security, JPA/Hibernate
- **Base de Datos:** PostgreSQL
- **Despliegue:** Docker, AWS

## Funcionalidades principales
### Para clientes
- Registro e inicio de sesión seguro
- Búsqueda y filtrado de hoteles
- Reserva de habitaciones
- Historial de reservas y gestión de cuenta

### Para administradores
- Gestión de hoteles y habitaciones
- Administración de reservas y clientes
- Generación de reportes

## Arquitectura del sistema
- **Cliente (React)** → Consume la API REST
- **Servidor (Spring Boot)** → Gestiona la lógica de negocio y la base de datos
- **Base de datos (PostgreSQL)** → Almacena la información de hoteles, clientes y reservas

## Conclusión
SkyStay busca mejorar la experiencia de reserva en hoteles, ofreciendo una solución digital moderna, segura y eficiente. El uso de tecnologías avanzadas y buenas prácticas de desarrollo aseguran la escalabilidad y mantenibilidad del sistema.

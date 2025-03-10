package com.example.demo.entities;
//Esta clase esta creada para comprobar la petición de inicio de sesión
public class LoginRequest {
    private String user;
    private String password;

    // Getters y Setters
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


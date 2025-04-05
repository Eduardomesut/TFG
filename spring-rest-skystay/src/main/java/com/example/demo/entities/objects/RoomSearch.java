package com.example.demo.entities.objects;

import java.time.LocalDate;

public class RoomSearch {
    private LocalDate entry;
    private LocalDate exit;

    public LocalDate getEntry() {
        return entry;
    }

    public void setEntry(LocalDate entry) {
        this.entry = entry;
    }

    public LocalDate getExit() {
        return exit;
    }

    public void setExit(LocalDate exit) {
        this.exit = exit;
    }
}

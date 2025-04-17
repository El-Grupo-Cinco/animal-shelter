 package com.elgrupocinco.GruppUppgift05.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "bookings")
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Data
public class Booking {
    @Id
    private UUID bookingId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private final Human user;
    @ManyToOne
    @JoinColumn(name = "animal_id")
    private final Animal animal;
    @Column
    private final LocalDateTime appointmentTime;
    @OneToMany(mappedBy = "booking")
    private List<Comment> comments;

    public void saveToDatabase() {
        //TODO connect to database
    }
}

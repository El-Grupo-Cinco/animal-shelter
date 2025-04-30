package com.elgrupocinco.GruppUppgift05.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity(name = "animals")
@Data
@NoArgsConstructor
public class Animal {

    // Attributes
    @Id
    private UUID animalId;
    @Column
    private String animalName;
    @Column
    private String pictureURL;
    @Column
    private LocalDate assumedDateOfBirth;
    @Column
    private LocalDate dateRegistered;
    @Column
    private String animalSpecies;
    @Column
    private boolean adopted;
    @ManyToOne
    private Human adopter;
    @ManyToOne
    @JoinColumn(name = "found_by_user_id")
    private Human foundByUser;
    @OneToMany(mappedBy = "animal")
    private List<Comment> comments;


    // Constructor
    public Animal(UUID animalId, String animalName, LocalDate assumedDateOfBirth, LocalDate dateRegistered, String animalSpecies,
                  boolean adopted, Human adopter, Human foundByUser, List<Comment> comments) {
        this.animalId = animalId;
        this.animalName = animalName;
        this.animalSpecies = animalSpecies;
        this.adopted = adopted;
        this.adopter = adopter;
        this.foundByUser = foundByUser;
        this.assumedDateOfBirth = assumedDateOfBirth;
        this.dateRegistered = dateRegistered;
        this.comments = comments;
    }

    public Animal(String animalName, LocalDate assumedDateOfBirth, LocalDate dateRegistered, String animalSpecies,
                  boolean adopted, Human adopter, Human foundByUser, List<Comment> comments) {
        this.animalId = UUID.randomUUID();
        this.animalName = animalName;
        this.animalSpecies = animalSpecies;
        this.adopted = adopted;
        this.adopter = adopter;
        this.foundByUser = foundByUser;
        this.assumedDateOfBirth = assumedDateOfBirth;
        this.dateRegistered = dateRegistered;
        this.comments = comments;
    }
}

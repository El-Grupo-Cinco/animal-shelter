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

    @Id
    private UUID animalId;

    @Column
    private String animalName;

    @Column
    private String pictureURL; // New field for picture URL

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
    //private String foundByFirstName;
    //private String foundByLastName;
    //private String foundByPhoneNumber;


    @OneToMany(mappedBy = "animal")
    private List<Comment> comments;

    // Full constructor including pictureURL
    public Animal(UUID animalId, String animalName, LocalDate assumedDateOfBirth, LocalDate dateRegistered,
                  String animalSpecies, boolean adopted, Human adopter, Human foundByUser,
                  List<Comment> comments, String pictureURL) {
        this.animalId = animalId;
        this.animalName = animalName;
        this.assumedDateOfBirth = assumedDateOfBirth;
        this.dateRegistered = dateRegistered;
        this.animalSpecies = animalSpecies;
        this.adopted = adopted;
        this.adopter = adopter;
        this.foundByUser = foundByUser;
        this.comments = comments;
        this.pictureURL = pictureURL;
    }

    // Constructor with auto-generated ID
    public Animal(String animalName, LocalDate assumedDateOfBirth, LocalDate dateRegistered,
                  String animalSpecies, boolean adopted, Human adopter, Human foundByUser,
                  List<Comment> comments, String pictureURL) {
        this.animalId = UUID.randomUUID();
        this.animalName = animalName;
        this.assumedDateOfBirth = assumedDateOfBirth;
        this.dateRegistered = dateRegistered;
        this.animalSpecies = animalSpecies;
        this.adopted = adopted;
        this.adopter = adopter;
        this.foundByUser = foundByUser;
        this.comments = comments;
        this.pictureURL = pictureURL;
    }
}


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

    @Column
    private String foundByName;

    @OneToMany(mappedBy = "animal")
    private List<Comment> comments;

    @OneToMany(mappedBy = "animal")
    private Adoption adoption;

    // Full constructor including pictureURL
    public Animal(UUID animalId, String animalName, LocalDate assumedDateOfBirth, LocalDate dateRegistered,
                  String animalSpecies, boolean adopted, Human adopter, String foundByName,
                  List<Comment> comments, String pictureURL) {
        this.animalId = animalId;
        this.animalName = animalName;
        this.assumedDateOfBirth = assumedDateOfBirth;
        this.dateRegistered = dateRegistered;
        this.animalSpecies = animalSpecies;
        this.adopted = adopted;
        this.adopter = adopter;
        this.foundByName = foundByName;
        this.comments = comments;
        this.pictureURL = pictureURL;
    }

    // Constructor with auto-generated ID
    public Animal(String animalName, LocalDate assumedDateOfBirth,
                  String animalSpecies, boolean adopted, Human adopter, String foundByName,
                  List<Comment> comments, String pictureURL) {
        this.animalId = UUID.randomUUID();
        this.animalName = animalName;
        this.assumedDateOfBirth = assumedDateOfBirth;
        this.dateRegistered = LocalDate.now();
        this.animalSpecies = animalSpecies;
        this.adopted = adopted;
        this.adopter = adopter;
        this.foundByName = foundByName;
        this.comments = comments;
        this.pictureURL = pictureURL;
    }

    public Adoption getAdoption() {
        return adoption;
    }
    }
}


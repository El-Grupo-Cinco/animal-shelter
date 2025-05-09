package com.elgrupocinco.GruppUppgift05.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity(name = "adoptions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Adoption {
    @Id
    private UUID adoptionID;
    @Column
    private LocalDate adoptionDate;
    @OneToOne
    private Animal animal;
    @ManyToOne
    private Human human;
    @OneToMany(mappedBy = "adoption")
    private List<Comment> comments;
}

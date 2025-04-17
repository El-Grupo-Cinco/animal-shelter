package com.elgrupocinco.GruppUppgift05.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Entity(name = "comments")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {
    @Id
    private UUID commentID;
    @Column
    private String comment;
    @ManyToOne
    private Human user;
    @ManyToOne
    private Animal animal;
    @ManyToOne
    private Booking booking;
    @ManyToOne
    private Adoption adoption;

    public Comment(UUID commentID, String comment, Human user) {
        this.commentID = commentID;
        this.comment = comment;
        this.user = user;
    }

    public Comment(UUID commentID, String comment, Animal animal) {
        this.commentID = commentID;
        this.comment = comment;
        this.animal = animal;
    }

    public Comment(UUID commentID, String comment, Booking booking) {
        this.commentID = commentID;
        this.comment = comment;
        this.booking = booking;
    }

    public Comment(UUID commentID, String comment, Adoption adoption) {
        this.commentID = commentID;
        this.comment = comment;
        this.adoption = adoption;
    }
}

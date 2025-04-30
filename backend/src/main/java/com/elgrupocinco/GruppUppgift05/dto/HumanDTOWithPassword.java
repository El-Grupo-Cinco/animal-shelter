package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

// DTO classes
@Data
@NoArgsConstructor
public class HumanDTOWithPassword {
    private UUID userId;
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String email;
    private String phoneNumber;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private List<String> ownedAnimals;
    private boolean canAdopt;
    private List<Comment> comments;
    private String password;

    public HumanDTOWithPassword(String username, String firstName, String lastName, LocalDate dateOfBirth, String email, String phoneNumber,
                                String street, String city, String state, boolean canAdopt, List<Comment> comments, String password) {
        this.userId = null;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.canAdopt = canAdopt;
        this.comments = comments;
        this.password = password;
    }

}

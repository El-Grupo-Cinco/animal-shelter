package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Comment;
import com.elgrupocinco.GruppUppgift05.models.Human;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

// DTO classes
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HumanDTO {
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
    private List<AnimalResponseDTO> ownedAnimals;
    private boolean canAdopt;
    private List<String> comments;
    private String role;

    public static HumanDTO fromHuman(Human human) {
        return new HumanDTO(
                human.getUserId(),
                human.getUsername(),
                human.getFirstName(),
                human.getLastName(),
                human.getDateOfBirth(),
                human.getEmail(),
                human.getPhoneNumber(),
                human.getStreet(),
                human.getCity(),
                human.getState(),
                human.getZipCode(),
                human.getOwnedAnimals().stream()
                        .map(AnimalResponseDTO::fromEntity)
                        .toList(),
                human.isCanAdopt(),
                human.getComments().stream()
                        .map(Comment::getComment)
                        .toList(),
                human.getRole()
        );
    }
}

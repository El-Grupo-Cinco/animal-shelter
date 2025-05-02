package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Animal;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
public class AnimalResponseDTO {
    private UUID animalId;
    private String animalName;
    private String animalSpecies;
    private LocalDate assumedDateOfBirth;
    private boolean adopted;
    private String pictureURL; // New field

    public static AnimalResponseDTO fromEntity(Animal animal) {
        return new AnimalResponseDTO(
                animal.getAnimalId(),
                animal.getAnimalName(),
                animal.getAnimalSpecies(),
                animal.getAssumedDateOfBirth(),
                animal.isAdopted(),
                animal.getPictureURL() // Include pictureURL in the mapping
        );
    }
}

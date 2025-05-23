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
    private LocalDate dateRegistered;
    private boolean adopted;
    private String foundByName;
    private String pictureURL; // New field
    //private UUID adoptionId; // New field to keep track of adoptions

    public static AnimalResponseDTO fromEntity(Animal animal) {
        return new AnimalResponseDTO(
                animal.getAnimalId(),
                animal.getAnimalName(),
                animal.getAnimalSpecies(),
                animal.getAssumedDateOfBirth(),
                animal.getDateRegistered(),
                animal.isAdopted(),
                animal.getFoundByName(),
                animal.getPictureURL() // Include pictureURL in the mapping
                //animal.getAdoption() != null ? animal.getAdoption().getAdoptionID() : null
        );
    }
}

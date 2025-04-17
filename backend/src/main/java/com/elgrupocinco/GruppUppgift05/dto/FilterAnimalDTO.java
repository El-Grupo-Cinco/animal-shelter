package com.elgrupocinco.GruppUppgift05.dto;

import lombok.Data;

@Data
public class FilterAnimalDTO {
    private String animalName; // "Bugs Bunny"
    private String animalSpecies; // "dog", "rabbit"
    private Integer minimumAge; // Age in years
    private Boolean includeAdopted; // true = include adopted animals
}

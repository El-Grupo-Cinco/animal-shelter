package com.elgrupocinco.GruppUppgift05.controller;

import com.elgrupocinco.GruppUppgift05.dto.AnimalResponseDTO;
import com.elgrupocinco.GruppUppgift05.dto.FilterAnimalDTO;
import com.elgrupocinco.GruppUppgift05.models.Animal;
import com.elgrupocinco.GruppUppgift05.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    // 1. Get all animals
    @GetMapping("/see-all")
    public ResponseEntity<List<AnimalResponseDTO>> getAllAnimals() {
        List<AnimalResponseDTO> animals = animalService.getAllAnimals()
                .stream()
                .map(AnimalResponseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(animals);
    }

    // 2. Get animal by ID
    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponseDTO> getAnimalById(@PathVariable UUID id) {
        AnimalResponseDTO animal = animalService.getAnimalResponseById(id);
        return ResponseEntity.ok(animal);
    }

    // 3. Create a new animal
    @PostMapping
    public ResponseEntity<AnimalResponseDTO> createAnimal(@RequestBody Animal animal) {
        AnimalResponseDTO createdAnimal = animalService.createAnimal(animal);
        return ResponseEntity.ok(createdAnimal);
    }

    // 4. Delete an animal by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable UUID id) {
        animalService.deleteAnimal(id);
        return ResponseEntity.noContent().build();
    }

    // 5. Filter animals
    @PutMapping("/filter")
    public ResponseEntity<List<AnimalResponseDTO>> filterAnimals(@RequestBody FilterAnimalDTO filter) {
        List<AnimalResponseDTO> animals = animalService.filterAnimals(filter);
        return ResponseEntity.ok(animals);
    }
}

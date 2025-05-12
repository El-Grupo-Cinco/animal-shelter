package com.elgrupocinco.GruppUppgift05.service;

import com.elgrupocinco.GruppUppgift05.dto.AnimalResponseDTO;
import com.elgrupocinco.GruppUppgift05.dto.FilterAnimalDTO;
import com.elgrupocinco.GruppUppgift05.models.Animal;
import com.elgrupocinco.GruppUppgift05.models.Booking;
import com.elgrupocinco.GruppUppgift05.repository.AnimalRepository;
import com.elgrupocinco.GruppUppgift05.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final BookingRepository bookingRepository;

    // Get All Animals
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll()
                .stream()
                .filter(animal -> !animal.isAdopted())
                .collect(Collectors.toList());
    }

    // Get Animal by Id
    public AnimalResponseDTO getAnimalResponseById(UUID animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found"));
        return AnimalResponseDTO.fromEntity(animal);
    }

    // Create Animal
    public AnimalResponseDTO createAnimal(Animal animal) {
        if (animal.getAnimalId() == null) {
            animal.setAnimalId(UUID.randomUUID());
        }
        animal.setDateRegistered(LocalDate.now());
        Animal savedAnimal = animalRepository.save(animal);
        return AnimalResponseDTO.fromEntity(savedAnimal);
    }

    // Delete Animal
    public void deleteAnimal(UUID animalId) {
        // Check if the animal exists
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        // Delete all bookings associated with this animal
        List<Booking> bookings = bookingRepository.findByAnimal_AnimalId(animalId);
        for (Booking booking : bookings) {
            bookingRepository.delete(booking);
        }

        // Now, delete the animal
        animalRepository.delete(animal);
    }

    // Animal Filter
    public List<AnimalResponseDTO> filterAnimals(FilterAnimalDTO filter) {
        List<Animal> animals = animalRepository.findAll();

        if (filter.getAnimalName() != null) {
            animals = animals.stream()
                    .filter(a -> a.getAnimalName().equalsIgnoreCase(filter.getAnimalName()))
                    .collect(Collectors.toList());
        }

        if (filter.getAnimalSpecies() != null) {
            animals = animals.stream()
                    .filter(a -> a.getAnimalSpecies().equalsIgnoreCase(filter.getAnimalSpecies()))
                    .collect(Collectors.toList());
        }

        if (filter.getMinimumAge() != null) {
            LocalDate cutoffDate = LocalDate.now().minusYears(filter.getMinimumAge());
            animals = animals.stream()
                    .filter(a -> !a.getAssumedDateOfBirth().isAfter(cutoffDate))
                    .collect(Collectors.toList());
        }

        if (filter.getIncludeAdopted() != null && !filter.getIncludeAdopted()) {
            animals = animals.stream()
                    .filter(a -> !a.isAdopted())
                    .collect(Collectors.toList());
        }

        return animals.stream()
                .map(AnimalResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
package com.elgrupocinco.GruppUppgift05.service;

import com.elgrupocinco.GruppUppgift05.dto.AdoptionDTO;
import com.elgrupocinco.GruppUppgift05.models.Adoption;
import com.elgrupocinco.GruppUppgift05.models.Animal;
import com.elgrupocinco.GruppUppgift05.models.Human;
import com.elgrupocinco.GruppUppgift05.repository.AdoptionRepository;
import com.elgrupocinco.GruppUppgift05.repository.AnimalRepository;
import com.elgrupocinco.GruppUppgift05.repository.CommentRepository;
import com.elgrupocinco.GruppUppgift05.repository.HumanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AdoptionService {
    private AdoptionRepository adoptionRepository;
    private HumanRepository humanRepository;
    private AnimalRepository animalRepository;
    private CommentRepository commentRepository;

    //create - add animal on human list, check allowed to adopt, animal = adopted
    public AdoptionDTO createAdoption(String userID, String animalID) {
        Human human = humanRepository.findById(UUID.fromString(userID)).orElseThrow(()-> new NoSuchElementException("AdopterID not found or registered."));
        Animal animal = animalRepository.findById(UUID.fromString(animalID)).orElseThrow(()-> new NoSuchElementException("Animal not found or registered"));
        if (!human.isCanAdopt()) {
            throw new IllegalArgumentException ("This person cannot adopt");
        }
        Adoption adoption = new Adoption(UUID.randomUUID(), LocalDate.now(), animal, human, new ArrayList<>());
        human.getOwnedAnimals().add(animal);
        animal.setAdopted(true);
        animal.setAdopter(human);
        animalRepository.save(animal);
        humanRepository.save(human);
        adoptionRepository.save(adoption);
        return AdoptionDTO.fromAdoption(adoption);
    }

    //delete - remove animal from human list
    public String deleteAdoption(UUID adoptionID) {
        Adoption adoption = adoptionRepository.findById(adoptionID).orElseThrow(()-> new NoSuchElementException("Adoption not found or registered"));
        adoption.getHuman().getOwnedAnimals().remove(adoption.getAnimal());
        adoption.getAnimal().setAdopter(null);
        adoption.getAnimal().setAdopted(false);
        adoption.getComments().removeAll(adoption.getComments());
        adoptionRepository.delete(adoption);
        return "Adoption deleted.";
    }

    //search - by human
    public Collection<AdoptionDTO> searchByHuman(String name) {
        return adoptionRepository.findByUsername(name).orElse(new ArrayList<>()).stream()
                .map(AdoptionDTO::fromAdoption)
                .toList();
    }

    //search - by animal
    public Collection<AdoptionDTO> searchByAnimal(String name) {
        return adoptionRepository.findByAnimalName(name).orElse(new ArrayList<>()).stream()
                .map(AdoptionDTO::fromAdoption)
                .toList();
    }
    //search - by date range
    public Collection<AdoptionDTO> searchByDateRange(LocalDate startDate, LocalDate endDate) {
        return adoptionRepository.findByAdoptionDateBetween(startDate, endDate).orElse(new ArrayList<>()).stream()
                .map(AdoptionDTO::fromAdoption)
                .toList();
    }
    //update
    public AdoptionDTO updateAdoption(AdoptionDTO adoptionDTO) {
        Adoption adoption = adoptionRepository.findById(adoptionDTO.getAdoptionID()).orElseThrow(()-> new NoSuchElementException("Adoption not found."));
        adoption.setAdoptionDate(adoptionDTO.getAdoptionDate());
        adoption.setAnimal(animalRepository.findById(adoptionDTO.getAnimalDTO().getAnimalId()).orElseThrow(()-> new NoSuchElementException("Animal not found.")));
        adoption.setHuman(humanRepository.findById(adoptionDTO.getHumanDTO().getUserId()).orElseThrow(()-> new NoSuchElementException("User not found.")));
        adoptionRepository.save(adoption);
        return AdoptionDTO.fromAdoption(adoption);
    }
}

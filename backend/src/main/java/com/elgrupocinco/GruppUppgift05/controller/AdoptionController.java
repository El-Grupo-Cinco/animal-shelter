package com.elgrupocinco.GruppUppgift05.controller;

import com.elgrupocinco.GruppUppgift05.dto.AdoptionDTO;
import com.elgrupocinco.GruppUppgift05.service.AdoptionService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/adoption")
public class AdoptionController {
    private AdoptionService adoptionService;

    //create - add animal on human list, check allowed to adopt, animal = adopted
    @PostMapping("/register")
    public ResponseEntity<?> registerAdoption(@RequestParam String userID, @RequestParam String animalID,
                                              @RequestParam LocalDate date) {
        try {
            return ResponseEntity.ok(adoptionService.createAdoption(userID, animalID, date));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body("Unable to register adoption. " + e.getMessage());
        }
    }
    //delete - remove animal from human list
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAdoption(UUID adoptionID) {
        try {
            return ResponseEntity.ok(adoptionService.deleteAdoption(adoptionID));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body("Unable to delete adoption. " + e.getMessage());
        }
    }
    //search - by human
    @GetMapping("/search-user")
    public ResponseEntity<?> searchAdoptionByHumanUsername(@RequestParam String name) {
        try {

            return ResponseEntity.ok(adoptionService.searchByHuman(name));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    //search - by animal
    @GetMapping("/search-animal")
    public ResponseEntity<?> searchAdoptionByAnimalName(String name) {
        try {
            return ResponseEntity.ok(adoptionService.searchByAnimal(name));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    //search - by date range
    @GetMapping("/search-date")
    public ResponseEntity<?> searchAdoptionByDateRange(@RequestBody List<LocalDate> dates) {
        try {
            return ResponseEntity.ok(adoptionService.searchByDateRange(dates.getFirst(), dates.getLast()));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    //update
    @PutMapping("/update")
    public ResponseEntity<?> updateAdotpion(@RequestParam AdoptionDTO adoptionDTO) {
        try {
            return ResponseEntity.ok(adoptionService.updateAdoption(adoptionDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Unable to update adoption data. " + e.getMessage());
        }
    }

}

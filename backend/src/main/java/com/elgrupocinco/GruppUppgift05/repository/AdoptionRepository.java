package com.elgrupocinco.GruppUppgift05.repository;

import com.elgrupocinco.GruppUppgift05.models.Adoption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdoptionRepository extends JpaRepository<Adoption, UUID> {

    @Query(value = "SELECT * FROM adoptions JOIN humans ON adoptions.human_user_id = humans.user_id WHERE username = ?1", nativeQuery = true)
    Optional<List<Adoption>> findByUsername(String name);

    @Query(value = "SELECT * FROM adoptions JOIN animals ON adoptions.animal_animal_id = animals.animal_id WHERE animal_name = ?1", nativeQuery = true)
    Optional<List<Adoption>> findByAnimalName(String name);

    Optional<List<Adoption>> findByAdoptionDateBetween(LocalDate startDate, LocalDate endDate);
}

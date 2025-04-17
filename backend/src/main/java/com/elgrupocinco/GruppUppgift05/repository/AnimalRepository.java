package com.elgrupocinco.GruppUppgift05.repository;

import com.elgrupocinco.GruppUppgift05.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, UUID> {
}

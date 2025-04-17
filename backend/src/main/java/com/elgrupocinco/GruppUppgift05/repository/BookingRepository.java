package com.elgrupocinco.GruppUppgift05.repository;

import com.elgrupocinco.GruppUppgift05.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

    boolean existsByAppointmentTime(LocalDateTime appointmentTime);

    List<Booking> findByUser_UserId(UUID userId);

    // New method to find bookings related to an animal
    List<Booking> findByAnimal_AnimalId(UUID animalId);
}

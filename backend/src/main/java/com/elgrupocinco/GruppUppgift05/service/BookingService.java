package com.elgrupocinco.GruppUppgift05.service;

import com.elgrupocinco.GruppUppgift05.dto.BookingDTO;
import com.elgrupocinco.GruppUppgift05.dto.BookingRequest;
import com.elgrupocinco.GruppUppgift05.models.*;
import com.elgrupocinco.GruppUppgift05.repository.AnimalRepository;
import com.elgrupocinco.GruppUppgift05.repository.BookingRepository;
import com.elgrupocinco.GruppUppgift05.repository.CommentRepository;
import com.elgrupocinco.GruppUppgift05.repository.HumanRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final HumanRepository userRepository;
    private final AnimalRepository animalRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, HumanRepository userRepository, AnimalRepository animalRepository, CommentRepository commentRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.animalRepository = animalRepository;
        this.commentRepository = commentRepository;
    }

    public Booking createBooking(BookingRequest request, Human human) throws IllegalArgumentException, IllegalAccessException {
        // Retrieve user
        Human user = userRepository.findById(request.getHumanID())
                .orElseThrow(() -> new EntityNotFoundException("The user was not found"));
        if (!user.getUserId().equals(human.getUserId())) {
            if (!human.getRole().equals("admin")) {
                throw new IllegalAccessException("You can only book appointments for yourself.");
            }
        }

        // Retrieve animal
        Animal animal = animalRepository.findById(request.getAnimalId())
                .orElseThrow(() -> new EntityNotFoundException("The animal was not found"));

        // Check time conflicts.
        if (isTimeUnavailable(request.getAppointmentTime())) {
            throw new IllegalArgumentException("The time is already booked or outside office hours.");
        }

        // Create booking

        Booking booking = new Booking(
                UUID.randomUUID(),
                user,
                animal,
                request.getAppointmentTime(),
                new ArrayList<>()
        );

        bookingRepository.save(booking);

        var comment = new Comment(UUID.randomUUID(), request.getComment(), booking);
        booking.getComments().add(comment);
        commentRepository.save(comment);

        return booking;

    }

    // Calls the BookingRepository and returns the bookings
    public List<BookingDTO> getBookingsByUser(Human human) {
        List<Booking> bookings = new ArrayList<>();
        if (human.getRole().equals("admin")) {
            bookings = bookingRepository.findAll();
        } else {
            bookings = bookingRepository.findByUser_UserId(human.getUserId());
        }
        return bookings.stream()
                .map(BookingDTO::fromBooking)
                .toList();

    }

    public void deleteBooking(UUID bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new EntityNotFoundException("The booking was not found");
        }
       Collection<Comment> comments = commentRepository.findByBookingId(bookingId).orElse(null);
        if (comments != null) {
            for (Comment comment : comments) {
                commentRepository.delete(comment);
            }
        }
        bookingRepository.deleteById(bookingId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingOfUser (UUID userID) {
        return bookingRepository.findByUser_UserId(userID);
    }

    private boolean isTimeUnavailable(LocalDateTime time) {
        // Check office hours (example: 9-17) and existing bookings
        LocalTime officeStart = LocalTime.of(9, 0);
        LocalTime officeEnd = LocalTime.of(17, 0);

        if (time.toLocalTime().isBefore(officeStart) || time.toLocalTime().isAfter(officeEnd)) {
            return true;
        }
        System.out.println("DEBUG: " + time.getClass());
        return bookingRepository.existsByAppointmentTime(time);
    }
}

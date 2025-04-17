package com.elgrupocinco.GruppUppgift05.controller;

import com.elgrupocinco.GruppUppgift05.dto.BookingDTO;
import com.elgrupocinco.GruppUppgift05.models.Booking;
import com.elgrupocinco.GruppUppgift05.dto.BookingRequest;
import com.elgrupocinco.GruppUppgift05.models.Human;
import com.elgrupocinco.GruppUppgift05.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody /*@Valid*/ BookingRequest bookingRequest, @AuthenticationPrincipal Human human) {
        try {
            Booking booking = bookingService.createBooking(bookingRequest, human);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "Message", "The booking was successfully created",
                    "bookingId", booking.getBookingId()
            ));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("Error ", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("Error ", e.getMessage()));
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("Error ", e.getMessage()));
        }

    }

    @GetMapping
    public ResponseEntity<?> getBookingsByUser(@AuthenticationPrincipal Human human) {
        try {
            List<BookingDTO> bookings = bookingService.getBookingsByUser(human);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable UUID bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok(Map.of("Message", "The booking has been removed"));
    }
}

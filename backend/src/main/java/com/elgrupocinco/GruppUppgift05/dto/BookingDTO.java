package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Booking;
import com.elgrupocinco.GruppUppgift05.models.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Data
public class BookingDTO {
    private final String humanName;
    private final String animalName;
    private final LocalDateTime appointmentTime;
    private final List<String> comments;


    public static BookingDTO fromBooking(Booking booking) {
        return new BookingDTO(
                booking.getUser().getUsername(),
                booking.getAnimal().getAnimalName(),
                booking.getAppointmentTime(),
                booking.getComments()
                        .stream()
                        .map(Comment::getComment)
                        .toList()
        );
    }
}

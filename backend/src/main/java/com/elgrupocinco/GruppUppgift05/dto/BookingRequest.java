package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Comment;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class BookingRequest {
    @NotNull
    private UUID humanID;

    @NotNull
    private UUID animalId;

    @NotNull
    //TODO add back and why there: @Future
    private LocalDateTime appointmentTime;

    private String comment;
}

package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

// DTO classes
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HumanDTOLogin {
    private String username;
    private String password;
}

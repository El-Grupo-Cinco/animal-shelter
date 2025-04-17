package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Adoption;
import com.elgrupocinco.GruppUppgift05.models.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdoptionDTO {
    private UUID adoptionID;
    private LocalDate adoptionDate;
    private AnimalResponseDTO animalDTO;
    private HumanDTO humanDTO;
    private List<CommentDTO> commentDTOs;

    public static AdoptionDTO fromAdoption (Adoption adoption) {
        return new AdoptionDTO(
                adoption.getAdoptionID(),
                adoption.getAdoptionDate(),
                AnimalResponseDTO.fromEntity(adoption.getAnimal()),
                HumanDTO.fromHuman(adoption.getHuman()),
                adoption.getComments().stream()
                        .map(CommentDTO::fromComment)
                        .toList()
                );
    }
}

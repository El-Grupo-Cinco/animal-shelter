package com.elgrupocinco.GruppUppgift05.service;

import com.elgrupocinco.GruppUppgift05.dto.CommentDTO;
import com.elgrupocinco.GruppUppgift05.models.*;
import com.elgrupocinco.GruppUppgift05.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final HumanRepository humanRepository;
    private final AnimalRepository animalRepository;
    private final BookingRepository bookingRepository;
    private final AdoptionRepository adoptionRepository;

    //CREATE COMMENTS----------------------------------------------------------------------------------------
    public String commentHuman (String commentInput, UUID humanID) {
        Human human = humanRepository.findById(humanID).orElseThrow();
        Comment comment = new Comment(UUID.randomUUID(), commentInput, human);
        commentRepository.save(comment);
        return "Comment saved to " + human.getUsername() + ": \nID:" + comment.getCommentID() + "\n" + comment.getComment();
    }

    public String commentAnimal (String commentInput, UUID animalID) {
        Animal animal = animalRepository.findById(animalID).orElseThrow();
        Comment comment = new Comment(UUID.randomUUID(), commentInput, animal);
        commentRepository.save(comment);
        return "Comment saved to " + animal.getAnimalName() + ": \nID:" + comment.getCommentID() + "\n" + comment.getComment();
    }

    public String commentBooking (String commentInput, UUID bookingID) {
        Booking booking = bookingRepository.findById(bookingID).orElseThrow();
        Comment comment = new Comment(UUID.randomUUID(), commentInput, booking);
        commentRepository.save(comment);
        return "Comment saved to booking for " + booking.getUser().getUsername() + " & " +
                booking.getAnimal().getAnimalName() + " on " + booking.getAppointmentTime() + ": \nID:" + comment.getCommentID() + "\n" + comment.getComment();
    }

    public String commentAdoption (String commentInput, UUID adoptionID) {
        Adoption adoption = adoptionRepository.findById(adoptionID).orElseThrow();
        Comment comment = new Comment(UUID.randomUUID(), commentInput, adoption);
        commentRepository.save(comment);
        return "Comment saved to " + adoption.getAdoptionDate() + "/" + adoption.getHuman().getUsername() + "/" +
            adoption.getAnimal().getAnimalName() + ": \nID:" + comment.getCommentID() + "\n" + comment.getComment();
    }

    //FETCH COMMENTS----------------------------------------------------------------------------------------
    public Collection<CommentDTO> fetchHumanComments(String humanID) {
        Human human = humanRepository.findById(UUID.fromString(humanID)).orElseThrow();
        return human.getComments().stream()
                .map(CommentDTO::fromComment)
                .toList();
    }

    public Collection<CommentDTO> fetchAnimalComments(String animalID) {
        Animal animal = animalRepository.findById(UUID.fromString(animalID)).orElseThrow();
        return animal.getComments().stream()
                .map(CommentDTO::fromComment)
                .toList();
    }

    public Collection<CommentDTO> fetchBookingComments(String bookingID) {
        Booking booking = bookingRepository.findById(UUID.fromString(bookingID)).orElseThrow();
        return booking.getComments().stream()
                .map(CommentDTO::fromComment)
                .toList();
    }

    public Collection<CommentDTO> fetchAdoptionComments(String adoptionID) {
        Adoption adoption = adoptionRepository.findById(UUID.fromString(adoptionID)).orElseThrow();
        return adoption.getComments().stream()
                .map(CommentDTO::fromComment)
                .toList();
    }

    //UPDATE/DELETE COMMENTS----------------------------------------------------------------------------------------
    public CommentDTO updateComment(String id, String newComment) {
        Comment comment = commentRepository.findById(UUID.fromString(id)).orElseThrow();
        comment.setComment(newComment);
        commentRepository.save(comment);
        return CommentDTO.fromComment(comment);
    }

    public String deleteComment(String id) {
        Comment comment = commentRepository.findById(UUID.fromString(id)).orElseThrow();
        String commentString = comment.getComment();
        commentRepository.delete(comment);
        return "Comment: \"" + commentString + "\" deleted.";
    }
}



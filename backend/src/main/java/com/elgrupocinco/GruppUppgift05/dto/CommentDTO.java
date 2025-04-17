package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Animal;
import com.elgrupocinco.GruppUppgift05.models.Booking;
import com.elgrupocinco.GruppUppgift05.models.Comment;
import com.elgrupocinco.GruppUppgift05.models.Human;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.UUID;

@Data
public class CommentDTO {
    private final UUID commentID;
    private final String comment;


    public CommentDTO(UUID commentID, String comment) {
        this.commentID = commentID;
        this.comment = comment;
    }

    public CommentDTO(UUID commentID, String comment, Animal animal) {
        this.commentID = commentID;
        this.comment = comment;
    }

    public CommentDTO(UUID commentID, String comment, Booking booking) {
        this.commentID = commentID;
        this.comment = comment;
    }

    public static CommentDTO fromComment (Comment comment) {
        //for animal
        if (comment.getAnimal() == null && comment.getBooking() == null) {
            return new CommentDTO(comment.getCommentID(),
                    comment.getComment());
        }
        //for humans
        if (comment.getUser() == null && comment.getBooking() == null) {
            return new CommentDTO(comment.getCommentID(),
                    comment.getComment());
        }
        //for bookings
        if (comment.getAnimal() == null && comment.getUser() == null) {
            return new CommentDTO(comment.getCommentID(),
                    comment.getComment());
        }
        return null;
    }
}

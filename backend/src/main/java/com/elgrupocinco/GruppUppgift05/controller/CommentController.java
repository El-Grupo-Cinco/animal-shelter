package com.elgrupocinco.GruppUppgift05.controller;
import com.elgrupocinco.GruppUppgift05.service.CommentService;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/human")
    public ResponseEntity<?> commentHuman (@RequestBody String commentInput, @RequestParam UUID humanID) {
        try {
            return ResponseEntity.ok(commentService.commentHuman(commentInput, humanID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/animal")
    public ResponseEntity<?> commentAnimal (@RequestBody String commentInput, @RequestParam UUID animalID) {
        try {
            return ResponseEntity.ok(commentService.commentAnimal(commentInput, animalID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/booking")
    public ResponseEntity<?> commentBooking(@RequestBody String commentInput, @RequestParam UUID bookingID) {
        try {
            return ResponseEntity.ok(commentService.commentBooking(commentInput, bookingID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/adoption")
    public ResponseEntity<?> commentAdoption(@RequestBody String commentInput, @RequestParam UUID adoptionID) {
        try {
            return ResponseEntity.ok(commentService.commentAdoption(commentInput, adoptionID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/human")
    public ResponseEntity<?> seeHumanComments(@RequestParam String humanID) {
        try {
            return ResponseEntity.ok(commentService.fetchHumanComments(humanID));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

    @GetMapping("/animal")
    public ResponseEntity<?> seeAnimalComments(@RequestParam String animalID) {
        try {
            return ResponseEntity.ok(commentService.fetchAnimalComments(animalID));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

    @GetMapping("/booking")
    public ResponseEntity<?> seeBookingComments(@RequestParam String bookingID) {
        try {
            return ResponseEntity.ok(commentService.fetchBookingComments(bookingID));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

    @GetMapping("/adoption")
    public ResponseEntity<?> seeAdoptionComments(@RequestParam String adoptionID) {
        try {
            return ResponseEntity.ok(commentService.fetchAdoptionComments(adoptionID));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateComment(@RequestParam String commentID, @RequestBody String newComment){
        try {
            return ResponseEntity.ok(commentService.updateComment(commentID, newComment));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteComment(@RequestParam String commentID) {
        try {
            return ResponseEntity.ok(commentService.deleteComment(commentID));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }
}

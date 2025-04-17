package com.elgrupocinco.GruppUppgift05.repository;

import com.elgrupocinco.GruppUppgift05.models.Comment;
import org.hibernate.annotations.Collate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

    @Query(value = "SELECT * FROM comments WHERE booking_booking_id = ?1", nativeQuery = true)
    Optional<Collection<Comment>> findByBookingId(UUID uuid);

    @Query(value = "SELECT * FROM comments WHERE user_user_id = ?1", nativeQuery = true)
    Optional<Collection<Comment>> findByUserId(UUID uuid);
}

package com.elgrupocinco.GruppUppgift05.repository;

import com.elgrupocinco.GruppUppgift05.models.Human;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface HumanRepository extends JpaRepository<Human, UUID> {
    Optional<Human> findByUsername(String username);

    // Custom JPQL query for searching across multiple fields
    @Query("SELECT h FROM humans h WHERE " +  // Change "Human" to "humans" if needed
            "LOWER(h.username) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(h.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(h.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(h.lastName) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Human> searchHumans(@Param("query") String query);
}

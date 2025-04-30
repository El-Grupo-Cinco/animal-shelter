package com.elgrupocinco.GruppUppgift05.models;

import java.time.LocalDate;
import java.util.*;
import java.util.logging.Logger;
import java.util.regex.Pattern;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.mindrot.jbcrypt.BCrypt; // For password hashing
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


// Main Human class
@Entity(name = "humans")
@Data
@NoArgsConstructor
public class Human implements UserDetails {
    private static final Logger LOGGER = Logger.getLogger(Human.class.getName());

    // Attributes
    @Id
    private UUID userId;
    @Column(unique = true)
    private String username;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private LocalDate dateOfBirth;
    @Column
    private String email;
    @Column
    private String phoneNumber;
    @Column
    private String street;
    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String zipCode;
    @OneToMany(mappedBy = "adopter", fetch = FetchType.EAGER)
    private List<Animal> ownedAnimals = new ArrayList<>();
    @Column
    private boolean canAdopt;
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Comment> comments = new ArrayList<>();
    @Column
    private String role;
    @Column
    private String password;

    // Constructor
    public Human(UUID userId, String username, String firstName, String lastName, LocalDate dateOfBirth,
                 String email, String phoneNumber, String street, String city, String state, String zipCode, List<Animal> ownedAnimals,
                 boolean canAdopt, List<Comment> comments, String role) {

        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.ownedAnimals = ownedAnimals;
        this.canAdopt = canAdopt;
        this.comments = comments;
        this.role = role;
    }

    public Human(UUID userId, String username, String firstName, String lastName, LocalDate dateOfBirth, String email,
                 String phoneNumber, String street, String city, String state, String zipCode, String role) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.role = role;
    }

    public Human(UUID userId, String username, String firstName, String lastName, LocalDate dateOfBirth,
                 String email, String phoneNumber, String street, String city, String state, String zipCode, boolean canAdopt, List<Comment> comments,
                 String role) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.ownedAnimals = new ArrayList<>();
        this.canAdopt = canAdopt;
        this.comments = comments;
        this.role = role;
    }



    // Password hashing utility
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static boolean checkPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}





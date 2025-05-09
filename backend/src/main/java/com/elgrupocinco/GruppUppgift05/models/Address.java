package com.elgrupocinco.GruppUppgift05.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Entity(name = "adresses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    @Id
    private UUID adressID;
    @OneToOne
    @JoinColumn(name = "human_id")
    private Human human;
    @Column
    private String street;
    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String zipCode;

    public Address(String street, String city, String state, String zipCode) {
        this.adressID = UUID.randomUUID();
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    @Override
    public String toString() {
        return street + ", " + city + ", " + state + " " + zipCode;
    }

    public static Address fromString(String address) {
        String[] parts = address.split(", ");
        return new Address(parts[0], parts[1], parts[2], parts[3]);
    }
}

package com.elgrupocinco.GruppUppgift05.repository;

import com.elgrupocinco.GruppUppgift05.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {

}

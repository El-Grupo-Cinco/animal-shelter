package com.elgrupocinco.GruppUppgift05.dto;

import com.elgrupocinco.GruppUppgift05.models.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private String street;
    private String city;
    private String state;
    private String zipCode;

    public static AddressDTO fromAddress(Address address) {
        return new AddressDTO(address.getStreet(), address.getCity(), address.getState(), address.getZipCode());
    }
}

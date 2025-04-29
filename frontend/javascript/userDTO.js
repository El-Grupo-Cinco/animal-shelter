// userDTO.js

class AddressDTO {
    constructor(street, city, postalCode, country) {
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }
}

class HumanDTOWithPassword {
    constructor(userId, username, firstName, lastName, dateOfBirth, address, email, phoneNumber, password) {
        this.userId = userId; // UUID (using a generated ID in JS)
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth; // Date of birth (could be a Date object or string)
        this.address = address; // AddressDTO instance
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password; // Password
    }

    // Validates email format
    validateEmail() {
        const emailRegex = /^[\w!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(this.email);
    }

    // Validates password matches the confirmation password
    validatePasswords(confirmPassword) {
        return this.password === confirmPassword;
    }
}

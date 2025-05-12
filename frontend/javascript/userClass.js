import { Animal } from "./animalClass.js";
import { Booking } from "./bookingClass.js";


export class User {
    constructor(userID, username, firstname, lastname, dateOfBirth, address, 
                email, phoneNumber, ownedAnimals, canAdopt, comments, role) {
        this.userID = userID;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.ownedAnimals = ownedAnimals;
        this.canAdopt = canAdopt;
        this.role = role;
    }

    showUser() {
        const usernameH1 = document.getElementById("username");
        const userIDP = document.getElementById("userID");
        const firstnameH2 = document.getElementById("firstname");
        const lastnameH2 = document.getElementById("lastname");
        const addressH3 = document.getElementById("address");
        const phoneNumberH3 = document.getElementById("phoneNumber");
        const emailH3 = document.getElementById("email");
        const canAdoptH4 = document.getElementById("canAdopt");
        const animalCards = document.getElementById("animals");

        usernameH1.textContent = this.username;
        userIDP.textContent = this.userID;
        firstnameH2.textContent = this.firstname;
        lastnameH2.textContent = this.lastname;
        addressH3.textContent = this.address;
        phoneNumberH3.textContent = this.phoneNumber;
        emailH3.textContent = this.email;
        canAdoptH4.textContent = this.canAdopt ? "Yes" : "No";

        if (this.role === "ADMIN") {
            this.showAdmin();
        }

        console.log("DEBUG owned animals: " + this);
        
        if (this.ownedAnimals && this.ownedAnimals.length !== 0) {
            const cardList = document.querySelector(".animal-cards");
        
            this.ownedAnimals.forEach(animal => {
                const animalClass = new Animal(animal.animalID, animal.animalName, animal.pictureURL, animal.species, animal.dateOfBirth, animal.registrationDate, animal.description);
                const card = animalClass.showAnimal();
                cardList.appendChild(card);
            });
        }


        // Simulating bookings
        const bookings = [new Booking("Testing", "R2D2", "2025-05-08T08:00UTC", ["Doesn't really want a droid but needs a new vacuum cleaner"])];
        const bookingCards = document.getElementById("booking-cards");
        bookings.forEach(booking => {
            bookingCards.append(booking.publish());
        });
    }

    showAdmin() {
        let searchQuery;
        const userInfoSection = document.getElementsByClassName("user-info");
        const adminSection = document.createElement("section");
        const searchLabel = document.createElement("label");
        const searchInput = document.createElement("input");
        const buttons = document.createElement("div");
        const searchUserBtn = document.createElement("button");
        const searchAnimalBtn = document.createElement("button");
        const registerAnimalBtn = document.createElement("button");
        const approveAdoptionBtn = document.createElement("button");
        const bookingsBtn = document.createElement("button");

        searchLabel.setAttribute("for", "searchQuery");
        searchInput.setAttribute("id", "searchQuery");
        searchInput.setAttribute("placeholder", "Enter search term here");
        searchUserBtn.setAttribute("type", "button");

        searchLabel.textContent = "Search Query:";
        searchUserBtn.textContent = "Search Username";
        searchAnimalBtn.textContent = "Search Animal";
        registerAnimalBtn.textContent = "Register Animal";
        approveAdoptionBtn.textContent = "Approve Adoption";
        bookingsBtn.textContent = "Handle Bookings";

        adminSection.className = "admin-section";

        searchInput.addEventListener('input', function() { searchQuery = searchInput.value.trim(); });
        searchUserBtn.addEventListener('click', () => { goToSearchUser(searchQuery); });
        searchAnimalBtn.addEventListener('click', searchAnimal);
        registerAnimalBtn.addEventListener('click', registerAnimal);
        approveAdoptionBtn.addEventListener('click', goToApproveAdoption);
        bookingsBtn.addEventListener('click', goToBooking);

        userInfoSection[0].append(adminSection);
        adminSection.append(searchLabel, searchInput);
        adminSection.appendChild(buttons);
        buttons.append(searchUserBtn, searchAnimalBtn, registerAnimalBtn, approveAdoptionBtn, bookingsBtn);
    }
}

export class HumanDTOWithPassword {
    constructor(username, firstName, lastName, dob, address, postalCode, city, state, email, phone, password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.state = state;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
}



function searchAnimal() {
    window.location.href = "animal.html"; 
}

function registerAnimal() {
    window.location.href = "newAnimal.html";
}

function goToApproveAdoption() {
    window.location.href = "adoption.html";
}

function goToBooking() {
    window.location.href = "booking.html";
}

function goToSearchUser(searchquery) {
    
    window.location.href = "search-user.html?searchQuery=" + encodeURIComponent(searchquery);
}
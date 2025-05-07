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

        if (this.role === "ROLE_ADMIN") {
            this.showAdmin();
        }

        console.log("DEBUG: " + this.ownedAnimals.length);
        
        if (this.ownedAnimals.length !== 0 || this.ownedAnimals === undefined){
            const cardList = document.querySelector(".animal-cards");
        
            this.ownedAnimals.forEach(animal => {
                const animalClass = new Animal(animal.animalID, animal.name, animal.pictureURL, animal.species, animal.dateOfBirth, animal.registrationDate, animal.description);
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
        const deleteAdoptionBtn = document.createElement("button");
        const bookingsBtn = document.createElement("button");

        searchLabel.setAttribute("for", "searchQuery");
        searchInput.setAttribute("id", "searchQuery");
        searchInput.setAttribute("placeholder", "Enter search term here");

        searchLabel.textContent = "Search Query:";
        searchUserBtn.textContent = "Search Username";
        searchAnimalBtn.textContent = "Search Animal";
        registerAnimalBtn.textContent = "Register Animal";
        approveAdoptionBtn.textContent = "Approve Adoption";
        deleteAdoptionBtn.textContent = "Delete Adoption";
        bookingsBtn.textContent = "Handle Bookings";

        adminSection.className = "admin-section";
        deleteAdoptionBtn.className = "special-button";

        searchInput.addEventListener('input', function() { searchQuery = searchInput.value.trim(); });
        searchUserBtn.addEventListener('click', function() { searchUser(searchQuery); });
        searchAnimalBtn.addEventListener('click', function() { searchAnimal(searchQuery); });
        registerAnimalBtn.addEventListener('click', registerAnimal);
        approveAdoptionBtn.addEventListener('click', goToApproveAdoption);
        deleteAdoptionBtn.addEventListener('click', goToDeleteAdoption);
        bookingsBtn.addEventListener('click', goToBooking);

        userInfoSection[0].append(adminSection);
        adminSection.append(searchLabel, searchInput);
        adminSection.appendChild(buttons);
        buttons.append(searchUserBtn, searchAnimalBtn, registerAnimalBtn, approveAdoptionBtn, deleteAdoptionBtn, bookingsBtn);
    }
}

export class HumanDTOWithPassword {
    constructor(username, firstName, lastName, dob, addressDTO, email, phone, password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.addressDTO = addressDTO;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
}

export class AddressDTO {
    constructor(address, city, postalCode, state) {
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.state = state;
    }
}

async function searchUser(searchQuery) {
    console.log("Searching for user with query:", searchQuery);
  if (!searchQuery) return alert("Please enter a user ID or email");
  
  await fetch(`http://localhost:8080/api/humans/search?query=${encodeURIComponent(searchQuery)}`, {
    method: "GET",
    Authorization: "Bearer: " + localStorage.getItem("token")
  })
  .then(response => {
    if (!response.ok) throw new Error("User not found");

    return  response.json();
  })
  .then(data => {
    // Skapa en lista med djur baserat på datan
    for (let returnedData of data) {
        const animals = (returnedData.animals || []).map(
        a => new Animal(a.id, a.name, a.picture, a.species, a.dateOfBirth, a.registeredDate, a.description)
        );
        
        // Skapa användaren
        const user = new User(
            returnedData.id,
            returnedData.username,
            returnedData.firstName,
            returnedData.lastName,
            returnedData.createdDate,
            returnedData.address,
            returnedData.email,
            returnedData.phone,
            animals,
            returnedData.canAdopt,
            returnedData.comments || [],
            returnedData.role || "user"
        );
        console.log(data.username);
        
        user.showUser();
  }
    })

  .catch (error => {
    console.error("Error fetching user:", error);
    alert("Could not fetch user.");
  })
}

function searchAnimal(searchQuery) {
    console.log(searchQuery);
}

function registerAnimal() {
    window.location.href ="newAnimal.html";
}

function goToApproveAdoption() {
    console.log("Approve Adoption button");
}

function goToDeleteAdoption() {
    console.log("Delete Adoption button");
}

function goToBooking() {
    window.location.href = "booking.html";
}


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

        /**
         * shows the user in the user.html, role is hidden as it is only used to recognized admins
         * TODO add owned animals
         */
        showUser() {
                const usernameH1 = document.getElementById("username");
                const userIDP = document.getElementById("userID");
                const firstnameH2 = document.getElementById("firstname");
                const lastnameH2 = document.getElementById("lastname");
                const addressH3 = document.getElementById("address");
                const phoneNumberH3 = document.getElementById("phoneNumber");
                const emailH3 = document.getElementById("email");
                const canAdoptH4 = document.getElementById("canAdopt");
                const animalCards = document.getElementById("animals")

                usernameH1.textContent = this.username;
                userIDP.textContent = this.userID;
                firstnameH2.textContent = this.firstname;
                lastnameH2.textContent = this.lastname;
                addressH3.textContent = this.address;
                phoneNumberH3.textContent = this.phoneNumber;
                emailH3.textContent = this.email;
                if (canAdopt) {
                        canAdoptH4.textContent = "Yes";
                } else {
                        canAdoptH4.textContent = "No";
                }

                if (this.role === "admin") {
                        this.showAdmin();
                }

                const cardList = document.querySelector(".animal-cards");
                let animalClasses = [];
                this.ownedAnimals.forEach(animal => {
                    const animalClass = new Animal(animal.animalID, animal.name, animal.pictureURL, animal.species, animal.dateOfBirth, animal.registrationDate, animal.description);
                    animalClasses.push(animalClass); // Store the created Animal instance in the array
                    const card = animalClass.showAnimal();
                    cardList.appendChild(card); // Append the card to the DOM
                });

                //will fetch bookings efter userID
                const bookings = [new Booking("Testing", "R2D2", "2025-05-08T08:00UTC", ["Doesn't really want a droid but needs a new vaccum cleaner"]),
                        new Booking("Testing", "Lilla Gubben", "2025-05-08T08:00UTC", ["Will try to teach horse to sit", "brings a huge leash"])];
                //then
                const bookingCards = document.getElementById("booking-cards");
                for (const booking of bookings) {
                        bookingCards.append(booking.publish());
                }
                
                
        }

        showAdmin() {
                //preparing for searchQuery
                let searchQuery;
                //Making element
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

                //setting atributes
                searchLabel.setAttribute("for", "searchQuery");
                searchInput.setAttribute("id", "searchQuery");
                searchInput.setAttribute("placeholder", "Enter search term here" );

                //setting text content
                searchLabel.textContent = "Search Query:";
                searchUserBtn.textContent = "Search User";
                searchAnimalBtn.textContent = "Search Animal";
                registerAnimalBtn.textContent = "Register Animal"
                approveAdoptionBtn.textContent = "Approve Adoption";
                deleteAdoptionBtn.textContent = "Delete Adoption";
                bookingsBtn.textContent = "Handle Bookings";

                //setting style / class
                adminSection.className = "admin-section";
                deleteAdoptionBtn.className = "special-button";

                //adding event-listener
                searchInput.addEventListener('input', function() {searchQuery=searchInput.value});
                searchUserBtn.addEventListener('click', function() {searchUser(searchQuery)});
                searchAnimalBtn.addEventListener('click', function() {searchAnimal(searchQuery)});
                registerAnimalBtn.addEventListener('click', registerAnimal);
                approveAdoptionBtn.addEventListener('click', goToApproveAdoption);
                deleteAdoptionBtn.addEventListener('click',goToDeleteAdoption);
                bookingsBtn.addEventListener('click', goToBooking);

                //appending to document
                userInfoSection[0].append(adminSection);
                adminSection.append(searchLabel, searchInput);
                adminSection.appendChild(buttons);
                buttons.append(searchUserBtn, searchAnimalBtn, registerAnimalBtn, approveAdoptionBtn, deleteAdoptionBtn, bookingsBtn);
        }
}

function searchUser(searchQuery) {
        console.log(searchQuery);
}

function searchAnimal(searchQuery) {
        console.log(searchQuery);
}

function registerAnimal() {
        console.log("registerAnimal button");
        
}

function goToApproveAdoption() {
        console.log("Approve Adoption button");
}

function goToDeleteAdoption() {
        console.log("delete Adoption button");
}

function goToBooking() {
        window.location.href = "booking.html";
}
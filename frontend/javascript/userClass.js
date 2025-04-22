export class User {
        constructor(userID, username, firstname, lastname, dateOfBirth, address, 
                email, phoneNumber, ownedAnimals, canAdopt, role) {
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
                const approveAdoptionBtn = document.createElement("button");
                const deleteAdoptionBtn = document.createElement("button");
                const bookingsBtn = document.createElement("button");

                //setting atributes
                searchLabel.setAttribute("for", "searchQuery");
                searchInput.setAttribute("id", "searchQuery");
                searchInput.setAttribute("placeholder", "Enter search term here" );

                //setting text content
                searchLabel.textContent = "Search Query";
                searchUserBtn.textContent = "Search User";
                searchAnimalBtn.textContent = "Search Animal";
                approveAdoptionBtn.textContent = "Approve Adoption";
                deleteAdoptionBtn.textContent = "Delete Adoption";
                bookingsBtn.textContent = "Handle Bookings";

                //setting style / class
                adminSection.className = "admin-section";

                //adding event-listener
                searchInput.addEventListener('input', function() {searchQuery=searchInput.value; console.log(searchQuery);
                })
                searchUserBtn.addEventListener('click', function() {searchUser(searchQuery)});
                searchAnimalBtn.addEventListener('click', function() {searchAnimal(searchQuery)});
                approveAdoptionBtn.addEventListener('click', function() {goToApproveAdoption()});
                deleteAdoptionBtn.addEventListener('click',function() {goToDeleteAdoption()});
                bookingsBtn.addEventListener('click', function() {goToBooking()});

                //appending to document
                userInfoSection[0].append(adminSection);
                adminSection.appendChild(searchLabel);
                adminSection.appendChild(searchInput);
                adminSection.appendChild(buttons);
                buttons.appendChild(searchUserBtn);
                buttons.appendChild(searchAnimalBtn);
                buttons.appendChild(approveAdoptionBtn);
                buttons.appendChild(deleteAdoptionBtn);
                buttons.appendChild(bookingsBtn);
                
        }
}

function searchUser(searchQuery) {
        console.log(searchQuery);
}

function searchAnimal(searchQuery) {
        console.log(searchQuery);
}

function goToApproveAdoption() {
        console.log("Approve Adoption button");
}

function goToDeleteAdoption() {
        console.log("delete Adoption button");
}

function goToBooking() {
        console.log("handle booking Adoption button");
}
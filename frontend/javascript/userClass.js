export class User {
        constructor(userID, username, firstname, lastname, dateOfBirth, address, email, phoneNumber, ownedAnimals, canAdopt, role) {
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

        }
}
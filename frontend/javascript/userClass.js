export User {
        constructor (userID, username, firstname, lastname, dateOfBirth, email, phoneNumber, ownedAnimals, canAdopt, role) {
                this.userID = userID;
                this.username = username;
                this.firstname = firstname;
                this.lastname = lastname;
                this.dateOfBirth = dateOfBirth;
                this.email = email;
                this.phoneNumber = phoneNumber;
                this.ownedAnimals = ownedAnimals;
                this.canAdopt = canAdopt;
                this.role = role,
        }

        /**
         * shows the user in the user.html, role is hidden as it is only used to recognized admins
         */
        function showUser() {
                
        }
}
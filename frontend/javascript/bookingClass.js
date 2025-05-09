export class BookingRequest {
        constructor(userId, animalId, appointmentTime, comments) {
                this.userId = userId;
                this.animalId = animalId;
                this.appointmentTime = appointmentTime;
                this.comments = comments;
        }

        save() {
                console.log(`save booking for ${this.userId}`);
        }

        
}

export class Booking {
        constructor (humanName, animalName, appointmentTime, comments) {
                this.humanName = humanName;
                this.animalName = animalName;
                this.appointmentTime = appointmentTime,
                this.comments = comments;
        }

        publish() {
                const card = document.createElement("article");
                const dateDiv = document.createElement("div");
                const animalName = document.createElement("h2");
                const userName = document.createElement("h2");
                const comment = document.createElement("p");

                card.className = "booking-card";

                dateDiv.textContent = this.appointmentTime;

                userName.textContent = this.humanName;
                
                animalName.textContent = this.animalName;

                comment.textContent = this.comment;

                card.append(dateDiv, animalName, userName, comment);

                return card;
        }
}
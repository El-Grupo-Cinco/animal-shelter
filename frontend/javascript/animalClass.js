export class Animal {
    constructor(animalID, name, pictureURL, species, dateOfBirth, registrationDate, description) {
        this.animalID = animalID;
        this.name = name;
        this.pictureURL = pictureURL;
        this.species = species;
        this.dateOfBirth = dateOfBirth;
        this.registrationDate = registrationDate;
        this.description = description;
    }

    showAnimal() {
        const cardTemplate = document.getElementById("card-template");
        const newCard = cardTemplate.cloneNode(true);
        newCard.classList.remove("hidden");

        // Här fixar vi rätt!
        const imgElement = newCard.querySelector(".card-picture img");
        imgElement.src = this.pictureURL;
        imgElement.alt = this.name;

        newCard.querySelector(".species-text").textContent = this.species;
        newCard.querySelector(".date-of-birth-text").textContent = `Date of Birth: ${this.dateOfBirth}`;
        newCard.querySelector(".registered-text").textContent = `Registered: ${this.registrationDate}`;
        newCard.querySelector(".card-name").textContent = this.name.toUpperCase();
        newCard.querySelector(".card-description").textContent = this.description;

        newCard.removeAttribute("id");

        return newCard;
    }
}

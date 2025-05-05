import { Animal } from "./animalClass.js"; 

const cardList = document.querySelector(".animal-cards");
let animalClasses = [];

async function fetchAnimals() {
    try {
        const response = await fetch("/api/animals/see-all");
        if (!response.ok) throw new Error("Failed to fetch animals");
        const animals = await response.json();

        animals.forEach(animal => {
            const animalClass = new Animal(
                animal.animalId,                    // UUID
                animal.animalName,                 // Namn
                animal.pictureURL,                 // Bild-URL
                animal.animalSpecies,              // Art
                animal.assumedDateOfBirth,         // Födelsedatum
                "Not provided",                    // Placeholder för registrationDate då det ej verkar finnas i backend
                "No description available."        // Placeholder för description då det ej verkar finnas i backend
            );
            animalClasses.push(animalClass);
            const card = animalClass.showAnimal();
            cardList.appendChild(card);
        });

        console.log(animalClasses[0]); // Debug
    } catch (error) {
        console.error("Error fetching animals:", error);
    }
}

fetchAnimals();

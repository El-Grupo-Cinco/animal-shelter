import { Animal } from "./animalClass.js"; 

const cardList = document.querySelector(".animal-cards");
const loadingMessage = document.getElementById("loading-message"); // hämta loading-diven
let animalClasses = [];

async function fetchAnimals() {
    try {
        loadingMessage.style.display = "block"; // visa meddelande

        const response = await fetch("/api/animals/see-all");
        if (!response.ok) throw new Error("Failed to fetch animals");

        const animals = await response.json();

        animals.forEach(animal => {
            const animalClass = new Animal(
                animal.animalId,
                animal.animalName,
                animal.pictureURL,
                animal.animalSpecies,
                animal.assumedDateOfBirth,
                "Not provided",
                "No description available."
            );
            animalClasses.push(animalClass);
            const card = animalClass.showAnimal();
            cardList.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching animals:", error);
        loadingMessage.textContent = "Failed to load animals.";
    } finally {
        loadingMessage.style.display = "none"; // göm oavsett om det lyckas eller misslyckas
    }
}

fetchAnimals();

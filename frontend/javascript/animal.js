import { Animal } from "./animalClass.js"; 

const cardList = document.querySelector(".animal-cards");
const loadingMessage = document.getElementById("loading-message"); // hämta loading-diven
let animalClasses = [];

async function fetchAnimals() {
    try {
        loadingMessage.style.display = "flex"; // visa medan vi laddar
        loadingMessage.innerHTML = `
            <div class="spinner"></div>
            <p>Loading animals...</p>
        `;

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

        loadingMessage.style.display = "none"; // göm om allt gick bra

    } catch (error) {
        console.error("Error fetching animals:", error);
        loadingMessage.innerHTML = `
            <p style="color: darkred;">⚠️ Failed to load animals. Please try again later.</p>
        `;
    }
}


fetchAnimals();
showAvailableAnimalsList(); // Displays the sample list on the page

// Convert birth date input to age in years
function calculateAgeFromDate(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.getElementById("search-button").addEventListener("click", async () => {
    const name = document.getElementById("name-search-input").value.trim();
    const species = document.getElementById("species-search-input").value.trim();
    const minAgeInput = document.getElementById("minimum-age-search-input").value;
    const minimumAge = minAgeInput ? calculateAgeFromDate(minAgeInput) : null;

    const filterBody = {
        animalName: name || null,
        animalSpecies: species || null,
        minimumAge: minimumAge,
        includeAdopted: true, // Change to false if needed
    };

    try {
        const response = await fetch("/api/animals/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filterBody),
        });

        if (!response.ok) throw new Error("Failed to filter animals");

        const filteredAnimals = await response.json();

        cardList.innerHTML = "";
        animalClasses = [];

        filteredAnimals.forEach(animal => {
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
        console.error("Error filtering animals:", error);
    }
});

fetchAnimals();                 // Loads and shows all animals
showAvailableAnimalsList();     // Displays the sample list on the page

async function showAvailableAnimalsList() {
    const container = document.getElementById("debug-animal-list");
    try {
        const response = await fetch("/api/animals/see-all");
        const animals = await response.json();

        if (!Array.isArray(animals) || animals.length === 0) {
            container.textContent = "No animals available.";
            return;
        }

        container.innerHTML = `
      <strong>Sample animals for testing search:</strong><br>
      <ul style="padding-left: 1em;">
        ${animals.map(a => `<li>${a.animalName} (${a.animalSpecies})</li>`).join("")}
      </ul>
    `;
    } catch (err) {
        container.textContent = "Error loading available animals.";
        console.error("Failed to load animals for UI display:", err);
    }
}
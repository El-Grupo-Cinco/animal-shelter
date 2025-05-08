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

        const response = await fetch("http://localhost:8080/api/animals/see-all");
        if (!response.ok) throw new Error("Failed to fetch animals");

        const animals = await response.json();

        animals.forEach(animal => {
            const animalClass = new Animal(
                animal.animalId,
                animal.animalName,
                animal.pictureURL,
                animal.animalSpecies,
                animal.assumedDateOfBirth,
                animal.dateRegistered,
                "No description available.",
                animal.adoptionId // newly added
            );
            animalClasses.push(animalClass);
            const card = animalClass.showAnimal();
            cardList.appendChild(card);
        });

        setupDeleteButtons();  // activate delete buttons - newly added

        loadingMessage.style.display = "none"; // göm om allt gick bra

    } catch (error) {
        console.error("Error fetching animals:", error);
        loadingMessage.innerHTML = `
            <p style="color: darkred;">⚠️ Failed to load animals. Please try again later.</p>
        `;
    }
}


fetchAnimals();


// Delete-adoption-button functionality
function setupDeleteButtons() {
    document.querySelectorAll(".delete-adoption-button").forEach(button => {
        button.addEventListener("click", async (event) => {
            const card = event.target.closest(".card");
            const adoptionId = card.dataset.adoptionId;

            if (!adoptionId) {
                alert("No adoption ID found.");
                return;
            }

            if (!confirm("Are you sure you want to delete this adoption?")) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/adoptions/${adoptionId}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || "Failed to delete adoption.");
                }

                alert("Adoption deleted successfully.");
                card.remove();
            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    });
}

// Add New Animal
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("animalName").value;
            const species = document.getElementById("animalSpecies").value;
            const dob = document.getElementById("assumedDateOfBirth").value;
            const pictureURL = document.getElementById("animalPicture").value;
            const foundByUser = document.getElementById("foundByUser").value;
            const adopted = document.getElementById("adopted").checked;

            const animalData = {
                animalName: name,
                animalSpecies: species,
                assumedDateOfBirth: dob,
                pictureURL: pictureURL,
                foundByName: foundByUser,
                adopted: adopted
            };

            const message = document.getElementById("registerMessage");

            try {
                const response = await fetch("http://localhost:8080/api/animals", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(animalData)
                });

                if (!response.ok) {
                    let message = "Failed to register animal." + response.status + ": " + response.text;
                    throw new Error(message);
                }

                const result = await response.json();
                message.textContent = `Djur registrerat: ${result.animalName}`;
                message.style.color = "green";
                message.style.fontWeight = "bold";
                form.reset();

                setTimeout(() => {
                    message.textContent = "";
                }, 30000);  // show message for 30sec

            } catch (error) {
                message.textContent = error.message;
                message.style.color = "red";
                message.style.fontWeight = "bold";

                 setTimeout(() => {
                    message.textContent = "";
                }, 30000);  // show message for 30sec

                console.error(error);
            }
        });
    }
});



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
        const response = await fetch("http://localhost:8080/api/animals/filter", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filterBody),
        });

        if (!response.ok) throw new Error("Failed to filter animals");

        const filteredAnimals = await response.json();

        cardList.innerHTML = '<!-- Kortmall (dold) --><ul class="animal-cards" role="list"><li class="card hidden" id="card-template" role="listitem"><h3 class="card-name">Name</h3><div class="card-content"><div class="card-picture"><img src="" alt="" /></div><div class="card-middle"><p class="species-text">Species:</p><p class="date-of-birth-text">Date of Birth:</p><p class="registered-text">Registered:</p></div><div class="card-description">Description</div></div></li></ul>';

        animalClasses = [];

        filteredAnimals.forEach(animal => {
            const animalClass = new Animal(
                animal.animalId,
                animal.animalName,
                animal.pictureURL,
                animal.animalSpecies,
                animal.assumedDateOfBirth,
                animal.dateRegistered,
                "No description available."
                animal.adoptionId // newly added
            );
            animalClasses.push(animalClass);
            const card = animalClass.showAnimal();
            cardList.appendChild(card);
        });

        setupDeleteButtons(); // activate delete-buttons after filter too

    } catch (error) {
        console.error("Error filtering animals:", error);
    }
});
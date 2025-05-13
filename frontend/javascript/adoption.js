import { Adoption, AdoptionRequest } from "./adoptionClass.js";

const adoptionCards = document.getElementById("adoption-cards");

loadAnimalOptions();
loadUserOptions();
renderAdoptions();

async function loadAnimalOptions() {
    const res = await fetch("http://localhost:8080/api/animals/see-all");
    const animals = await res.json();
    const animalSelect = document.getElementById("animalID");

    animals.forEach(animal => {
            const option = document.createElement("option");
            option.value = animal.animalId;
            option.textContent = animal.animalName;
            animalSelect.appendChild(option);
    });
}

// Load user options into the select dropdown
async function loadUserOptions() {
    const res = await fetch("http://localhost:8080/api/humans/get-all", {
        method: "GET",
            headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
            }
    });
    const users = await res.json();
    const userSelect = document.getElementById("userID");

        for (let user of users) {
            const option = document.createElement("option");
            option.value = user.userId;
            option.textContent = user.username;
            userSelect.appendChild(option);
        }
}


// Render existing adoptions
async function renderAdoptions() {
    const res = await fetch("http://localhost:8080/adoption/all");
    const adoptions = await res.json();
    if (adoptions.length === 0 || adoptions === null || adoptions === undefined) {
        const message = document.getElementById("message");
        message.textContent = "No adoptions found.";
        return;
    }

    const adoptionSection = document.getElementById("adoption-section");
    for (let adoption of adoptions) {
        const comments = (adoption.commentDTOs || []).map(c => c.commentText || "");
        const newAdoption = new Adoption (adoption.humanDTO.username, adoption.animalDTO.animalName, adoption.adoptionDate, comments);
        console.log(newAdoption);
        
        adoptionSection.append(newAdoption.publish());
    }
    

    
}


// Handle form submission
const form = document.getElementById("adoption-form");
const responseText = document.getElementById("form-response");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userID = document.getElementById("userID").value;
    const animalID = document.getElementById("animalID").value;

    try {
        const res = await fetch(`http://localhost:8080/adoption/register?userID=${userID}&animalID=${animalID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            
        });

        if (res.ok) {
            const data = await res.json();
            responseText.textContent = "Adoption registered successfully!";
            responseText.style.color = "green";
            console.log("Success:", data);
        } else {
            const errorMsg = await res.text();
            responseText.textContent = "Error: " + errorMsg;
            responseText.style.color = "red";
        }
    } catch (error) {
        console.error("Fetch error:", error);
        responseText.textContent = "Request failed.";
        responseText.style.color = "red";
    }
});


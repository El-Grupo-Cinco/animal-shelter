import { Adoption, AdoptionRequest } from "./adoptionClass.js";

const adoptionCards = document.getElementById("adoption-cards");

// Dummy example data — remove when you load real data from backend
const adoptions = [
    new Adoption("DarthVader", "R2D2", "2025-05-08T08:00UTC", [
        "Bring bolts and charger", 
        "Brings old picture from Tatoine"
    ]),
    new Adoption("Longstocking", "Lilla Gubben", "2025-05-08T08:00UTC", [
        "Brings a monkey (why?)", 
        "Is very strong, can carry the horse back if all goes well"
    ])
];

// Render existing adoptions
for (const adoption of adoptions) {
    adoptionCards.append(adoption.publish());
}

// Handle form submission
const form = document.getElementById("adoption-form");
const responseText = document.getElementById("form-response");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userID = document.getElementById("userID").value;
    const animalID = document.getElementById("animalID").value;

    try {
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ userID, animalID }),
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

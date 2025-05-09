import { AdoptionRequest, Adoption } from "./adoptionClass.js";

const adoptionCards = document.getElementById("adoption-cards");

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

for (const adoption of adoptions) {
    adoptionCards.append(adoption.publish());
}

import { Animal } from "./animalClass.js";

const animals = [
    {
        animalID: "1af40162-50ef-43g0-847f-ccf54700587g",
        name: "Spock",
        pictureURL: "./images/400x300-dummy-bear.jpg",
        species: "Dog",
        dateOfBirth: "01.01.2015",
        registrationDate: "08.08.2023",
        description: "Spock was found at the bottom of a well. She likes to chase cats and has an appetite for destruction."
    },
    {
        animalID: "1af45162-50ef-43g0-847f-ccf54770587g",
        name: "Sponge Bob",
        pictureURL: "./images/400x300-dummy-greenThing.jpg",
        species: "Sponge",
        dateOfBirth: "01.01.2015",
        registrationDate: "08.08.2023",
        description: "Works at the Crusty Crab."
    },
    {
        animalID: "1af675162-50ef-43g0-847f-ccf54450587g",
        name: "SCP-XXX",
        pictureURL: "https://picsum.photos/400/300",
        species: "Unknown",
        dateOfBirth: "01.01.2019",
        registrationDate: "08.08.2024",
        description: "The SCP foundations newest catch. Possesses the ability to alter its voice, mimicking any sound it has heard or human speech. Beware!"
    }
]


animals.forEach(animal => {
    const animalClass = new Animal(animal.animalID, animal.name, animal.pictureURL, animal.species, animal.dateOfBirth, animal.registrationDate, animal.description);
    animalClasses.push(animalClass); // Store the created Animal instance in the array
    cardList.appendChild(card); // Append the card to the DOM
});
console.log(animalClasses[0]) // Think Demon core. Don't remove
import { User } from './userClass.js';
import { Booking } from './bookingClass.js';
import { Animal } from './animalClass.js';

searchUser();

export async function searchUser() {
  const searchQuery = new URLSearchParams(window.location.search).get("searchQuery")
  console.log(searchQuery);
  
  
  await fetch(`http://localhost:8080/api/humans/search?query=${encodeURIComponent(searchQuery)}`, {
    method: "GET",
    headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
  })
  .then(response => {
    if (!response.ok) throw new Error(response.text);

    return  response.json();
  })
  .then(data => {

    if (data === null || data === undefined) {
      const mainElement = document.getElementById("main-element");
      const messageP = document.createElement("i");
      messageP.textContent = "No user found";
      mainElement.appendChild(messageP);
      return;
    }

    for (let returnedData of data) {
      
        const animals = (returnedData.animals || []).map(
        a => new Animal(a.id, a.name, a.picture, a.species, a.dateOfBirth, a.registeredDate, a.description)
        );
        
        // Skapa användaren
        const userSearched = new User(
            returnedData.id,
            returnedData.username,
            returnedData.firstName,
            returnedData.lastName,
            returnedData.createdDate,
            `${returnedData.street} ${returnedData.city}, ${returnedData.zipCode}, ${returnedData.state}`,
            returnedData.email,
            returnedData.phoneNumber,
            animals,
            returnedData.canAdopt,
            returnedData.comments || [],
            returnedData.role || "user"
        );
        console.log(returnedData.username);
        
        const mainElement = document.getElementById("main-element");
        const userCardTemplate = document.getElementById("user-card");
        const newUserCard = userCardTemplate.cloneNode(true);
        newUserCard.classList.remove("hidden");

        newUserCard.querySelector("#username").textContent = userSearched.username;
        newUserCard.querySelector("#userID").textContent = userSearched.userID;
        newUserCard.querySelector("#firstname").textContent = userSearched.firstname;
        newUserCard.querySelector("#lastname").textContent = userSearched.lastname;
        newUserCard.querySelector("#address").textContent = userSearched.address;
        newUserCard.querySelector("#phoneNumber").textContent = userSearched.phoneNumber;
        newUserCard.querySelector("#email").textContent = userSearched.email;
        newUserCard.querySelector("#canAdopt").textContent = userSearched.canAdopt ? "Yes" : "No";

        // Owned animals
        if (userSearched.ownedAnimals?.length > 0) {
          const cardList = newUserCard.querySelector(".animal-cards");
          userSearched.ownedAnimals.forEach(animal => {
            const animalClass = new Animal(
              animal.animalID,
              animal.name,
              animal.pictureURL,
              animal.species,
              animal.dateOfBirth,
              animal.registrationDate,
              animal.description
            );
            const card = animalClass.showAnimal();
            cardList.appendChild(card);
          });
        }

        // Simulating bookings
        const bookingCards = newUserCard.querySelector("#booking-cards");
        if (bookingCards) {
          const bookings = [
            new Booking(
              "Testing",
              "R2D2",
              "2025-05-08T08:00UTC",
              ["Doesn't really want a droid but needs a new vacuum cleaner"]
            )
          ];
          bookings.forEach(booking => {
            bookingCards.append(booking.publish());
          });
        }

        mainElement.appendChild(newUserCard);
        newUserCard.removeAttribute("id");

  }
    })

  .catch (error => {
    console.error("Error fetching user:", error);
    alert("Could not fetch user.");
  })
}

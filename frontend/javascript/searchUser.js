import { User } from './userClass.js';
import { Booking } from './bookingClass.js';
import { Animal } from './animalClass.js';

searchUser();

export async function searchUser() {
  const searchQuery = new URLSearchParams(window.location.search).get("searchQuery")
  
  
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
      
        const animals = (returnedData.ownedAnimals || []).map(
          a => new Animal(
            a.animalId,
            a.animalName,
            a.pictureURL,
            a.animalSpecies,
            a.assumedDateOfBirth,
            a.dateRegistered,
            a.description || "",
        ));
        
        // Skapa användaren
        const userSearched = new User(
            returnedData.userId,
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
        //setting up section with title
        const animalSection = document.createElement("section");
        const animalH2 = document.createElement("h2");
        const animalList = document.createElement("ul")
        animalList.className = "animal-cards";
        animalH2.textContent = "Animal Owned";
        animalH2.style = "width: 100%; text-align: center";
        animalSection.append(animalH2, animalList);
        const placeholder = newUserCard.querySelector("#animal-section-placeholder");
        placeholder.replaceWith(animalSection);

        if (userSearched.ownedAnimals?.length > 0) {
          userSearched.ownedAnimals.forEach(animal => {
            const cardListItem = document.createElement("li");
            const cardName = document.createElement("h3");
            const cardContent = document.createElement("div");
            const cardPictureDiv = document.createElement("div");
            const cardImg = document.createElement("img");
            const cardMiddleDiv = document.createElement("div");
            const speciesText = document.createElement("p");
            const dateOfBirth = document.createElement("p");
            const registeredText = document.createElement("p");
            const cardDescription = document.createElement("div");

            cardListItem.className = "card";
            cardName.className = "card-name";
            cardContent.className = "card-content";
            cardPictureDiv.className = "card-picture";
            cardMiddleDiv.className = "card-middle";
            speciesText.className = "species-text";
            dateOfBirth.className = "date-of-birth-text";
            registeredText.className = "registered-text";
            cardDescription.className = "card-description";

            cardName.textContent = `${animal.animalName}`;
            cardImg.src = animal.pictureURL;
            cardImg.alt = animal.animalName;
            speciesText.textContent = `Species: ${animal.species}`;
            dateOfBirth.textContent = `Date of birth: ${animal.dateOfBirth}`;
            registeredText.textContent = `Registered: ${animal.registeredDate}`;
            cardDescription.textContent = `Description: ${animal.description}`;

            cardPictureDiv.appendChild(cardImg);
            cardMiddleDiv.append(speciesText, dateOfBirth, registeredText);
            cardContent.append(cardPictureDiv, cardMiddleDiv, cardDescription)
            cardListItem.append(cardName, cardContent);
            animalList.appendChild(cardListItem);
          });
        }
        
    
        //bookings
        getUserBookings(userSearched.userID, newUserCard);

        mainElement.appendChild(newUserCard);
        newUserCard.removeAttribute("id");

    }
  })
  .catch (error => {
    console.error("Error fetching user:", error);
    alert("Could not fetch user.");
  })
}

async function getUserBookings(userID, userCardElement) {
  try {
const res = await fetch(`http://localhost:8080/api/bookings/forUser/${encodeURIComponent(userID)}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
 
    if (!res.ok) throw new Error("Failed to fetch bookings");
 
    const bookings = await res.json();
    const bookingCards = userCardElement.querySelector("#booking-cards");
 
    if (!bookings || bookings.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No bookings have been made.";
      message.style.fontStyle = "italic";
      message.style.textAlign = "center";
      bookingCards.appendChild(message);
      return;
    }
 
    bookings.forEach(b => {
      const card = document.createElement("div");
      card.classList.add("booking-card");
 
      const combinedComments = b.comments && b.comments.length
        ? b.comments.join("<br>")
        : "No comments";
 
      card.innerHTML = `
        <div style="width: 18%">${b.appointmentTime}</div>
        <div style="width: 23%">${b.animalName}</div>
        <div style="width: 23%">${b.humanName}</div>
        <div style="width: 35%">${combinedComments}</div>
      `;
 
      bookingCards.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}


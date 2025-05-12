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
      
        const animals = (returnedData.animals || []).map(
        a => new Animal(a.id, a.name, a.picture, a.species, a.dateOfBirth, a.registeredDate, a.description)
        );
        
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

        //bookings
        getUserBookings(userSearched.userID);

        mainElement.appendChild(newUserCard);
        newUserCard.removeAttribute("id");

    }
  })
  .catch (error => {
    console.error("Error fetching user:", error);
    alert("Could not fetch user.");
  })
}

async function getUserBookings (userID) {
  try {
    const res = await fetch(`http://localhost:8080/api/bookings/forUser/${encodeURIComponent(userID)}`, {
            headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
            }
    });
      if (!res.ok) throw new Error("Failed to fetch bookings");

      const bookings = await res.json();
      const bookingCards = document.getElementById("booking-cards");

      

      // If no bookings, show a message and return
      if (!bookings || bookings.length === 0) {
              const message = document.createElement("p");
              message.textContent = "You have no bookings yet.";
              message.style.fontStyle = "italic";
              message.style.textAlign = "center";
              bookingCards.appendChild(message);
              return;
      }

      // Display each booking
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

async function loadUserBookings() {
    try {
        const res = await fetch("http://localhost:8080/api/bookings", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const bookings = await res.json();

        const container = document.getElementById("user-bookings");
        container.innerHTML = ""; // clear previous

        if (!bookings || bookings.length === 0) {
            container.innerHTML = "<p>No bookings found.</p>";
            return;
        }

        bookings.forEach(b => {
            const bookingDiv = document.createElement("div");
            bookingDiv.classList.add("booking-item");

            const comments = b.comments && b.comments.length
                ? b.comments.join("<br>")
                : "No comments";

            bookingDiv.innerHTML = `
        <p><strong>Date:</strong> ${b.appointmentTime}</p>
        <p><strong>Animal:</strong> ${b.animalName}</p>
        <p><strong>Comments:</strong><br>${comments}</p>
        <hr>
      `;
            container.appendChild(bookingDiv);
        });

    } catch (err) {
        console.error("Error loading user bookings:", err);
    }
}

async function loadUserAdoptions() {
    try {
        const res = await fetch("http://localhost:8080/api/adoption/all", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!res.ok) throw new Error("Failed to fetch adoptions");

        const adoptions = await res.json();
        const container = document.getElementById("user-adoptions");
        container.innerHTML = "";

        if (!adoptions || adoptions.length === 0) {
            container.innerHTML = "<p>No adoptions found.</p>";
            return;
        }

        adoptions.forEach(a => {
            const div = document.createElement("div");
            div.classList.add("adoption-entry");

            div.innerHTML = `
        <p><strong>Animal:</strong> ${a.animalName}</p>
        <p><strong>Date:</strong> ${a.adoptionDate || "Unknown"}</p>
        <hr>
      `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Error loading adoptions:", err);
    }
}

loadUserBookings();
loadUserAdoptions();

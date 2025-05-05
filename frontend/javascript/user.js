import { User } from "./userClass.js";
import { Animal } from "./animalClass.js";

if (localStorage.length === 0) {
  window.location.href = "login.html";
} else {
  getUser();
}

function getUser() {
  let message;
  fetch("http://localhost:8080/api/humans/show-loggedin", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
  .then(response => {
    if (!response.ok) {
      message = "Error: " + response.status + " - " + response.text;
      throw new Error(message);
    }

    return response.json();
  })
  .then(user => {
    let userToShow = new User(user.userId, user.username, user.firstName, user.lastName, user.dateOfBirth, `${user.street} ${user.city}, ${user.zipCode}, ${user.state}`, user.email, user.phoneNumber, user.ownedAnimals, user.canAdopt, user.comments, user.role);
    userToShow.showUser();
  })
  .catch(error => alert(error.message))
}


/**
 * Hämta användare baserat på ID eller email och visa information på sidan.
 */
document.getElementById("searchBtn").addEventListener("click", async () => {
  const input = document.getElementById("searchInput").value.trim();
  if (!input) return alert("Please enter a user ID or email");

  try {
    const response = await fetch(`http://localhost:8080/api/humans/search?query=${encodeURIComponent(input)}`);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    // Skapa en lista med djur baserat på datan
    const animals = (data.animals || []).map(
      a => new Animal(a.id, a.name, a.picture, a.species, a.dateOfBirth, a.registeredDate, a.description)
    );

    // Skapa användaren
    const user = new User(
      data.id,
      data.username,
      data.firstName,
      data.lastName,
      data.createdDate,
      data.address,
      data.email,
      data.phone,
      animals,
      data.canAdopt,
      data.comments || [],
      data.role || "user"
    );

    // Visa användardata i HTML
    document.getElementById("username").textContent = user.username;
    document.getElementById("userID").textContent = user.id;
    document.getElementById("firstname").textContent = user.firstName;
    document.getElementById("lastname").textContent = user.lastName;
    document.getElementById("address").textContent = user.address;
    document.getElementById("phoneNumber").textContent = user.phone;
    document.getElementById("email").textContent = user.email;
    document.getElementById("canAdopt").textContent = user.canAdopt ? "Yes" : "No";

    // Visa ägda djur
    const animalCards = document.getElementById("animals");
    animalCards.innerHTML = ''; // Rensa tidigare kort
    user.animals.forEach(animal => {
      const card = document.getElementById("card-template").cloneNode(true);
      card.classList.remove("hidden");

      card.querySelector(".card-name").textContent = animal.name;
      card.querySelector(".card-picture img").src = animal.picture;
      card.querySelector(".species-text").textContent = `Species: ${animal.species}`;
      card.querySelector(".date-of-birth-text").textContent = `Date of Birth: ${animal.dateOfBirth}`;
      card.querySelector(".registered-text").textContent = `Registered: ${animal.registeredDate}`;
      card.querySelector(".card-description").textContent = animal.description;

      animalCards.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    alert("Could not fetch user.");
  }
});

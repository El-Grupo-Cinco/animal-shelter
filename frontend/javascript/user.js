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
      message = "Error: " + response.status + " - " + response.text();
      console.log(message);
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
  
  await fetch(`http://localhost:8080/api/humans/search?query=${encodeURIComponent(input)}`, {
    method: "GET",
    Authorization: "Bearer: " + localStorage.getItem("token")
  })
  .then(response => {
    if (!response.ok) throw new Error("User not found");

    return  response.json();
  })
  .then(data => {
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
    console.log(data.username);
    
    user.showUser();
  })
  .catch (error => {
    console.error("Error fetching user:", error);
    alert("Could not fetch user.");
  })
});

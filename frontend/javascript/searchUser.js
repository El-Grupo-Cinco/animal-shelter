import { User } from './userClass.js';

searchUser();

export async function searchUser() {
  const searchQuery = new URLSearchParams(window.location.search).get("searchQuery")
  console.log(searchQuery);
  
  
  await fetch(`http://localhost:8080/api/humans/search?query=${encodeURIComponent(searchQuery)}`, {
    method: "GET",
    header: {"Authorization": "Bearer " + localStorage.getItem("token")}
  })
  .then(response => {
    if (!response.ok) throw new Error(response.text);

    return  response.json();
  })
  .then(data => {
    // Skapa en lista med djur baserat på datan
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
        const user = new User(
            returnedData.id,
            returnedData.username,
            returnedData.firstName,
            returnedData.lastName,
            returnedData.createdDate,
            returnedData.address,
            returnedData.email,
            returnedData.phone,
            animals,
            returnedData.canAdopt,
            returnedData.comments || [],
            returnedData.role || "user"
        );
        console.log(data.username);
        
        const mainElement = document.getElementById("main-element");
        const userCardTemplate = document.getElementById("user-card");
        const newUserCard = userCardTemplate.cloneNode(true);
        newUserCard.classList.remove("hidden");

        user.showUser();

        mainElement.appendChild(newUserCard);

        newUserCard.removeAttribute("id");

  }
    })

  .catch (error => {
    console.error("Error fetching user:", error);
    alert("Could not fetch user.");
  })
}

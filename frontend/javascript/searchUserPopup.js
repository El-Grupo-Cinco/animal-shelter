import { User } from './userClass.js';

const params = new URLSearchParams(window.location.search);
const username = params.get("username");

if (!username) {
  alert("No username provided.");
  throw new Error("Missing username");
}

const token = localStorage.getItem("token");

fetch(`http://localhost:8080/adoption/search-user?name=${encodeURIComponent(username)}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => {
    if (!res.ok) throw new Error("User not found");
    return res.json();
  })
  .then(async ([user]) => {
    if (!user) throw new Error("No user found");

    // Visa användarinfo
    document.getElementById("username").textContent = user.username;
    document.getElementById("userID").textContent = user.userId;
    document.getElementById("firstname").textContent = user.firstName;
    document.getElementById("lastname").textContent = user.lastName;
    document.getElementById("address").textContent = `${user.street}, ${user.city}, ${user.state}, ${user.zipCode}`;
    document.getElementById("phoneNumber").textContent = user.phoneNumber;
    document.getElementById("email").textContent = user.email;
    document.getElementById("canAdopt").textContent = user.canAdopt ? "Yes" : "No";

    // Kommentarer
    const commentContainer = document.querySelector(".user-comments");
    if (user.comments?.length) {
      const title = document.createElement("h2");
      title.textContent = "User Comments";
      commentContainer.appendChild(title);

      user.comments.forEach(comment => {
        const div = document.createElement("div");
        div.classList.add("comment");
        div.innerHTML = `
          <p><strong>Date:</strong> ${comment.date ?? "Unknown"}</p>
          <p>${comment.content ?? "No content"}</p>
        `;
        commentContainer.appendChild(div);
      });
    }

    // Djuren
    const animalList = document.querySelector(".animal-cards");
    const template = document.getElementById("card-template");

    if (user.ownedAnimals?.length) {
      user.ownedAnimals.forEach(animal => {
        const clone = template.cloneNode(true);
        clone.classList.remove("hidden");

        clone.querySelector(".card-name").textContent = animal.name;
        clone.querySelector(".species-text").textContent = `Species: ${animal.species}`;
        clone.querySelector(".date-of-birth-text").textContent = `Date of Birth: ${animal.dateOfBirth}`;
        clone.querySelector(".registered-text").textContent = `Registered: ${animal.registered ? "Yes" : "No"}`;
        clone.querySelector(".card-description").textContent = animal.description ?? "No description";

        const img = clone.querySelector("img");
        img.src = animal.imageUrl || "/images/placeholder.jpg";
        img.alt = animal.name;

        animalList.appendChild(clone);
      });
    }

    // Bokningar
    await fetch(`http://localhost:8080/bookings/user/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then(bookings => {
        const container = document.getElementById("booking-cards");

        if (!bookings.length) {
          container.innerHTML = "<p>No bookings found.</p>";
          return;
        }

        bookings.forEach(booking => {
          const div = document.createElement("div");
          div.classList.add("booking-card");
          div.innerHTML = `
            <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
            <p><strong>Date:</strong> ${booking.date ?? "Unknown"}</p>
            <p><strong>Status:</strong> ${booking.status ?? "N/A"}</p>
          `;
          container.appendChild(div);
        });
      });
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load user.");
  });

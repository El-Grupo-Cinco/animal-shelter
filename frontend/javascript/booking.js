// Load animal options into the select dropdown
async function loadAnimalOptions() {
        const res = await fetch("http://localhost:8080/api/animals/see-all");
        const animals = await res.json();
        const animalSelect = document.getElementById("animal-id");

        animals.forEach(animal => {
                const option = document.createElement("option");
                option.value = animal.animalId;
                option.textContent = animal.animalName;
                animalSelect.appendChild(option);
        });
}

// Load user options into the select dropdown
async function loadUserOptions() {
        const res = await fetch("http://localhost:8080/api/humans/show-loggedin", {
                headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                }
        });
        const user = await res.json();
        if (user.role === "ADMIN") {
                getAllBookings();
                showAllUser();
        } else {
                getOwnBookings();
                showOwnUsername(user.userId, user.username);
        }

}

//show only own userForm
function showOwnUsername(userId, username) {
        const userSelect = document.getElementById("user-id");

        const option = document.createElement("option");
        option.value = userId;
        option.textContent = username;
        userSelect.appendChild(option);
        userSelect.selectedIndex = "1" 
}

//show all users
async function showAllUser() {
        const res = await fetch("http://localhost:8080/api/humans/get-all", {
                method: "GET",
                    headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                    }
            });
            const users = await res.json();
            const userSelect = document.getElementById("user-id");
            console.log(users);
            
        
                for (let user of users) {
                        const option = document.createElement("option");
                        option.value = user.userId;
                        option.textContent = user.username;
                        userSelect.appendChild(option);
                }
}

// Booking form submission
document.getElementById("booking-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        let bookingID;
        const animalId = document.getElementById("animal-id").value;
        const userId = document.getElementById("user-id").value;
        const time = document.getElementById("booking-time").value;
        const comment = document.getElementById("booking-comment").value.trim();
        
        const bookingBody = {
                animalId: animalId,
                humanID: userId,
                appointmentTime: time,
                comment: comment 
        };
        // Makes booking and get a response (we need ID for comment)
        try {
                const response = await fetch("http://localhost:8080/api/bookings", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        body: JSON.stringify(bookingBody),
                });

                if (!response.ok) throw new Error("Booking failed");

                bookingID = response.bookingID;

                alert("✅ Booking created successfully!");
                document.getElementById("booking-form").reset();
        } catch (err) {
                console.error("Booking error:", err);
                alert("⚠️ Booking failed. Check console for details.");
        }
});

async function getAllBookings() {
        try {
                const res = await fetch("http://localhost:8080/api/bookings/all", {
                        headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                });
                if (!res.ok) throw new Error("Failed to fetch bookings");

                const bookings = await res.json();
                const bookingCards = document.getElementById("booking-cards");


                // Clear any previous content
                bookingCards.innerHTML = "";

                // If no bookings, show a message and return
                if (!bookings || bookings.length === 0) {
                        const message = document.createElement("p");
                        message.textContent = "There are no bookings.";
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

async function getOwnBookings() {
        try {
                const res = await fetch("http://localhost:8080/api/bookings", {
                        headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                });
                if (!res.ok) throw new Error("Failed to fetch bookings");

                const bookings = await res.json();
                const bookingCards = document.getElementById("booking-cards");


                // Clear any previous content
                bookingCards.innerHTML = "";

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

// Load options when the page loads
loadAnimalOptions();
loadUserOptions();


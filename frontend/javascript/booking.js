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
        const res = await fetch("http://localhost:8080/api/humans/see-all", {
                headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                }
        });
        const users = await res.json();
        const userSelect = document.getElementById("user-id");

        users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.id;
                option.textContent = user.username;
                userSelect.appendChild(option);
        });
}

// Booking form submission
document.getElementById("booking-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const animalId = document.getElementById("animal-id").value;
        const userId = document.getElementById("user-id").value;
        const time = document.getElementById("booking-time").value;
        const comment = document.getElementById("booking-comment").value.trim();

        const bookingBody = {
                animalId,
                humanId: userId,
                bookingTime: time,
                comment: comment || null,
        };

        try {
                const response = await fetch("http://localhost:8080/api/bookings/create", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        body: JSON.stringify(bookingBody),
                });

                if (!response.ok) throw new Error("Booking failed");

                alert("✅ Booking created successfully!");
                document.getElementById("booking-form").reset();
        } catch (err) {
                console.error("Booking error:", err);
                alert("⚠️ Booking failed. Check console for details.");
        }
});

// Load options when the page loads
loadAnimalOptions();
loadUserOptions();

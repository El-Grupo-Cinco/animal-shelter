import { User } from "./userClass.js";
import { Animal } from "./animalClass.js";

if (window.location.pathname.endsWith("/user.html")) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You are not logged in. Redirecting to login.");
        window.location.href = "login.html";
    } else {
        getUser();
    }
}

function getUser() {
    fetch("http://localhost:8080/api/humans/show-loggedin", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                alert("Not logged in or session expired. Redirecting to login.\n" + errorText);
                window.location.href = "login.html";
                throw new Error("Unauthorized access: " + response.status);
            }
            return response.json();
        })
        .then(user => {
            const userToShow = new User(
                user.userId,
                user.username,
                user.firstName,
                user.lastName,
                user.dateOfBirth,
                `${user.street} ${user.city}, ${user.zipCode}, ${user.state}`,
                user.email,
                user.phoneNumber,
                user.ownedAnimals,
                user.canAdopt,
                user.comments,
                user.role
            );
            userToShow.showUser();
        })
        .catch(error => {
            console.error("Error loading user:", error.message);
        });
}

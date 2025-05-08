import { User } from "./userClass.js";

if (window.location.pathname.endsWith("/user.html")) {
  if (localStorage.length === 0) {
    window.location.href = "login.html";
  } else {
    getUser();
  }
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

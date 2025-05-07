import { HumanDTOWithPassword, AddressDTO } from "./userClass.js";

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleLink = document.getElementById('toggleLink');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// Toggle between login and register forms
toggleLink.addEventListener('click', function() {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");
});

// Login Form Submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Create DTO for login
    const loginDTO = new LoginDTO(username, password);

    

    // Simulate login (you can add actual login logic here)
    fetch("http://localhost:8080/api/humans/login!", {
        method : "POST",
        headers : { "Content-type" : "application/json" },
        body : JSON.stringify(loginDTO)
    })
    .then(response => {
        if (!response.ok) {
            let message = "Login Error: " + response.status + " - " + response.text();
            loginMessage.textContent = message;
            throw new Error(message);
        }
        return response.text();
        
    })
    .then(token => {       
        loginMessage.textContent = "Login successful!";
        localStorage.setItem("token", token);
        window.location.href = "/user.html";
    })
    .catch(error => loginMessage.textContent = error.message);
    
});

// Register Form Submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect user data from the form
    const username = document.getElementById('username').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;  // Address
    const city = document.getElementById('city').value;     // City
    const postalCode = document.getElementById('postalCode').value; // Postal Code
    const state = document.getElementById('country').value;    // Country


    const addressDTO = new AddressDTO(address, city, postalCode, state);

    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Create an instance of HumanDTOWithPassword
    const registerDTO = new HumanDTOWithPassword(username, firstName, lastName, dob, addressDTO, email, phone, password);

    // Validate email
    if (!validateEmail(registerDTO.email)) {
        registerMessage.textContent = "Please enter a valid email.";
        return;
    }

    // Validate passwords match
    if (!validatePasswords(password, confirmPassword)) {
        registerMessage.textContent = "Passwords do not match.";
        return;
    }


    fetch("http://localhost:8080/api/humans/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            "username": registerDTO.username,
            "firstName": registerDTO.firstName,
            "lastName": registerDTO.lastName,
            "dateOfBirth": registerDTO.dob,
            "email": registerDTO.email,
            "phoneNumber": registerDTO.phone,
            "street": addressDTO.street,
            "city": addressDTO.city,
            "state": addressDTO.state,
            "zipCode": addressDTO.zipCode,
            "password": registerDTO.password,
          })
    })
    .then(response => {
        if (!response.ok) {
            let message = "Error:" +  response.status + " - " + response.text;
            
            throw new Error(message);
        }

        return response.json();

    }).then(response => {
        alert("User: " + response.username + " created, you can now login!");
        window.location.href = "/login.html";

    })
    .catch(error => {
        alert(error.message);
    })


/*     // Simulate registration (you can add actual registration logic here)
    registerMessage.textContent = "Registration successful!";
    setTimeout(() => {
        registerForm.style.display = "none";
        loginForm.classList.toggle("hidden");
        toggleLink.textContent = "Don't have an account? Register here";
    }, 2000); // Redirect or show confirmation after 2 seconds */
});

// DTO for Login

class LoginDTO {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

}

function validateEmail(email) {
        const emailRegex = /^[\w!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
}

function validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}
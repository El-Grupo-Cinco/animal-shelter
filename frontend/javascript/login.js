import { HumanDTOWithPassword } from "./userClass.js";

// DOM elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleLink = document.getElementById('toggleLink');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// Toggle between login and register forms
toggleLink.addEventListener('click', function () {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");
});

// DTO for Login
class LoginDTO {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[\w!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// Password validation
function validatePasswords(password, confirmPassword) {
    return password === confirmPassword;
}

// Login form submit
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginDTO = new LoginDTO(username, password);

    fetch("http://localhost:8080/api/humans/login!", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDTO)
    })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error("Login Error: " + response.status + " - " + errorText);
            }
            return response.text();
        })
        .then(token => {
            loginMessage.textContent = "Login successful!";
            localStorage.setItem("token", token);
            window.location.href = "/user.html";
        })
        .catch(error => {
            loginMessage.textContent = error.message;
        });
});

// Register form submit
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const state = document.getElementById('country').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const registerDTO = new HumanDTOWithPassword(username, firstName, lastName, dob, address, postalCode, city, state, email, phone, password);

    if (!validateEmail(registerDTO.email)) {
        registerMessage.textContent = "Please enter a valid email.";
        return;
    }

    if (!validatePasswords(password, confirmPassword)) {
        registerMessage.textContent = "Passwords do not match.";
        return;
    }

    fetch("http://localhost:8080/api/humans/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: registerDTO.username,
            firstName: registerDTO.firstName,
            lastName: registerDTO.lastName,
            dateOfBirth: registerDTO.dob,
            email: registerDTO.email,
            phoneNumber: registerDTO.phone,
            street: registerDTO.address,
            city: registerDTO.city,
            state: registerDTO.state,
            zipCode: registerDTO.postalCode,
            password: registerDTO.password
        })
    })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error("Register Error: " + response.status + " - " + errorText);
            }
            return response.json();
        })
        .then(response => {
            alert("User: " + response.username + " created, you can now login!");
            window.location.href = "/login.html";
        })
        .catch(error => {
            alert(error.message);
        });
});

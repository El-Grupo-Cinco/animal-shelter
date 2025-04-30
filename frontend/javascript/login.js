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

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Create DTO for login
    const loginDTO = new LoginDTO(email, password);

    // Validate email and password
    if (!loginDTO.validateEmail()) {
        loginMessage.textContent = "Please enter a valid email.";
        return;
    }

    // Simulate login (you can add actual login logic here)
    loginMessage.textContent = "Login successful!";
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
        headers: {
            'Content-type': 'application/json'
        },
        body: {
            "username": registerDTO.username,
            "firstName": registerDTO.firstName,
            "lastName": registerDTO.lastName,
            "dateOfBirth": registerDTO.dob,
            "address": {
              "street": addressDTO.street,
              "city": addressDTO.city,
              "state": addressDTO.state,
              "zipCode": addressDTO.zipCode
            },
            "email": registerDTO.email,
            "phoneNumber": registerDTO.phone,
            "ownedAnimals": [],
            "comments": [],
            "canAdopt": false,
            "password": registerDTO.password,
          }
    })
    .then(async response => {
        if (await (!response.ok)) {
            let message = "Error:" +  response.status + " - " + response.text;
            
            throw new Error(message);
        }

        return response.json;
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
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    validateEmail() {
        const emailRegex = /^[\w!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(this.email);
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
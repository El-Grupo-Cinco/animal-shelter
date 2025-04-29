// login.js

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleLink = document.getElementById('toggleLink');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

// Toggle between login and register forms
toggleLink.addEventListener('click', function() {
    if (registerForm.style.display === "none") {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        toggleLink.textContent = "Already have an account? Login here";
    } else {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        toggleLink.textContent = "Don't have an account? Register here";
    }
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
    const userId = crypto.randomUUID(); // Generate UUID
    const username = document.getElementById('username').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const address = new AddressDTO(
        document.getElementById('address').value,  // Address
        document.getElementById('city').value,     // City
        document.getElementById('postalCode').value, // Postal Code
        document.getElementById('country').value    // Country
    );
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Create an instance of HumanDTOWithPassword
    const registerDTO = new HumanDTOWithPassword(userId, username, firstName, lastName, dob, address, email, phone, password);

    // Validate email
    if (!registerDTO.validateEmail()) {
        registerMessage.textContent = "Please enter a valid email.";
        return;
    }

    // Validate passwords match
    if (!registerDTO.validatePasswords(confirmPassword)) {
        registerMessage.textContent = "Passwords do not match.";
        return;
    }

    // Simulate registration (you can add actual registration logic here)
    registerMessage.textContent = "Registration successful!";
    setTimeout(() => {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        toggleLink.textContent = "Don't have an account? Register here";
    }, 2000); // Redirect or show confirmation after 2 seconds
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


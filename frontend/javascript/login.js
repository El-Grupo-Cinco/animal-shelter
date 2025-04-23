// Header
const header = document.createElement("header");
header.textContent = "Animal Shelter";
document.body.appendChild(header);

// Nav
const nav = document.createElement("nav");
nav.className = "navbar";
nav.innerHTML = `
  <a href="index.html">Home</a>
  <a href="user.html">Profile</a>
  <a href="contact.html">Contact</a>
  <a href="about.html">About</a>
`;
document.body.appendChild(nav);

// Main Content
const main = document.createElement("main");
const form = document.createElement("form");
form.className = "login-form";

form.innerHTML = `
  <h2>Login</h2>
  <input type="text" id="username" placeholder="Username" required />
  <input type="password" id="password" placeholder="Password" required />
  <button type="submit">Log in</button>
  <p id="message"></p>
`;

main.appendChild(form);
document.body.appendChild(main);

// Footer
const footer = document.createElement("footer");
footer.innerHTML = "&copy; 2025 Animal Shelter. All rights reserved.";
document.body.appendChild(footer);

// Login Logic
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Test user (ersätt med backend/api/localStorage vid behov)
  if (username === "testuser" && password === "password123") {
    message.textContent = "Login successful!";
    message.className = "success";
    // window.location.href = "user.html"; // Valfritt redirect
  } else {
    message.textContent = "Invalid username or password.";
    message.className = "error";
  }
});

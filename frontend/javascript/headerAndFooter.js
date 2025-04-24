// Header
const header = document.createElement("header");
header.textContent = "Animal Shelter";
document.body.prepend(header);

// Nav
const nav = document.createElement("nav");
nav.className = "navbar";
nav.innerHTML = `
  <a href="index.html">Home</a>
  <a href="user.html">Profile</a>
  <a href="contact.html">Contact</a>
  <a href="about.html">About</a>
`;
header.appendChild(nav);

// Footer
const footer = document.createElement("footer");
footer.innerHTML = "&copy; 2025 Animal Shelter. All rights reserved.";
document.body.appendChild(footer);
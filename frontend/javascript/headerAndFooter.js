// Header
const header = document.createElement("header");
const logoAndTitle = document.createElement("div");
const logo = document.createElement("img");
logoAndTitle.textContent = "Animal Shelter";
logo.src = "./icons/animal-shelter-logo.png";
document.body.prepend(header);
header.append(logoAndTitle);
logoAndTitle.prepend(logo);

// Nav
const nav = document.createElement("nav");
nav.className = "navbar";
nav.innerHTML = `
  <a href="index.html">Home</a>
  <a href="animal.html">Animals</a>
  <a href="user.html">Profile</a>
  <a href="contact.html">Contact</a>
  <a href="about.html">About</a>
`;
header.appendChild(nav);

// Footer
const footer = document.createElement("footer");
const logo2 = document.createElement("img");
logo2.src = "./icons/animal-shelter-logo.png";
logo2.style.height = "2rem";
footer.innerHTML = "&copy; 2025 Animal Shelter. All rights reserved.";
document.body.appendChild(footer);
footer.prepend(logo2)
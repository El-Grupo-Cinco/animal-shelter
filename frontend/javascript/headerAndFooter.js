// Header
const header = document.createElement("header");
const logoAndTitle = document.createElement("div");
const title = document.createElement("a")
const logo = document.createElement("img");
title.textContent = "Animal Shelter";
logo.src = "./icons/animal-shelter-logo.png";
title.setAttribute("href", "index2.html");
document.body.prepend(header);
header.append(logoAndTitle);
logoAndTitle.append(logo, title);

// Nav
const nav = document.createElement("nav");
nav.className = "navbar";
nav.innerHTML = `
  <a href="animal.html">Animals</a>
  <a href="user.html">Profile</a>
  <a href="contact.html">Contact</a>
  <a href="about.html">About</a>
`;
header.appendChild(nav);

//login button
const loginBtn =document.createElement("button");
loginBtn.textContent = "Login";
loginBtn.addEventListener('click', () => {
  window.location.href = "login.html";
});
header.appendChild(loginBtn);

// Footer
const footer = document.createElement("footer");
const logo2 = document.createElement("img");
logo2.src = "./icons/animal-shelter-logo.png";
logo2.style.height = "2rem";
footer.innerHTML = "&copy; 2025 Animal Shelter. All rights reserved.";
document.body.appendChild(footer);
footer.prepend(logo2)
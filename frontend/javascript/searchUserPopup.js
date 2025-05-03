import { User } from './userClass.js';

const users = [
  new User(
    "1af40162-50ef-43e0-847f-ccf54700587a",
    "Testing",
    "Cesar",
    "Milan",
    "2025-08-08",
    "1000 Hollywood Blvd, 90120 Beverly Hills",
    "dogwhisperer@discovery.com",
    "+1 62 65 19884 664",
    [],
    true,
    [],
    "admin"
  )
];

const params = new URLSearchParams(window.location.search);
const username = params.get("username");

if (username) {
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (user) {
    user.showUser(); // assumes `showUser()` updates the DOM
  } else {
    alert("User not found.");
  }
} else {
  alert("No username provided.");
}

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

document.getElementById("searchUserBtn").addEventListener("click", () => {
  const query = document.getElementById("searchQuery").value.trim();
  if (!query) {
    alert("Please enter a username.");
    return;
  }

  const foundUser = users.find(user =>
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    `${user.firstname} ${user.lastname}`.toLowerCase().includes(query.toLowerCase())
  );

  if (foundUser) {
    const url = `search-user.html?username=${encodeURIComponent(foundUser.username)}`;
    window.open(url, "_blank", "width=1000,height=700");
  } else {
    alert("User not found.");
  }
});

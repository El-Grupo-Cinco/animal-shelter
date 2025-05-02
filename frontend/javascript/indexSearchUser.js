import { User } from './userClass.js';

document.getElementById("searchUserBtn").addEventListener("click", () => {
  const query = document.getElementById("searchQuery").value.trim();
  searchUser(query);
});

function searchUser(searchQuery) {
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

  const foundUser = users.find(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (foundUser) {
    alert(`User found: ${foundUser.firstname} ${foundUser.lastname}`);
    // foundUser.showUser(); // Du kan visa mer info här om du vill
  } else {
    alert("User not found.");
  }
}

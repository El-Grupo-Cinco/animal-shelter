import {User} from "./userClass.js";


/**
 * fetches the user and shows it on the page
 */
function getUser() {
let testUser = new User("25135213516516dcxazs", "Testing", "Cesar", "Milan", "2025-08-08", "1000 Hollywood Blvd, 90120 Beverly Hills", "dogwhisperer@discovery.com", "+ 62 65 19884 664", null, true, "user")

testUser.showUser();

}
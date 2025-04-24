import {User} from "./userClass.js";



/**
 * fetches the user and shows it on the page
 */
function getUser() {
let testUser = new User("1af40162-50ef-43e0-847f-ccf54700587a", "Testing", "Cesar", "Milan", "2025-08-08", 
        "1000 Hollywood Blvd, 90120 Beverly Hills", "dogwhisperer@discovery.com", 
        "+1 62 65 19884 664", [], true, "admin");
testUser.showUser();

}

getUser();
import {User} from "./userClass.js";
import {Animal} from "./animalClass.js"



/**
 * fetches the user and shows it on the page
 */
function getUser() {
let testUser = new User("1af40162-50ef-43e0-847f-ccf54700587a", "Testing", "Cesar", "Milan", "2025-08-08", 
        "1000 Hollywood Blvd, 90120 Beverly Hills", "dogwhisperer@discovery.com", 
        "+1 62 65 19884 664", [new Animal("1af45162-50ef-43g0-847f-ccf54770587g", "Sponge Bob", "./images/400x300-dummy-greenThing.jpg", "Sponge", "01.01.2015", "08.08.2023", "Works at the Crusty Crab."),
                new Animal("1af45162-50ef-43g0-847f-ccf54770587g", "Franklin", "https://image-uniservice.linternaute.com/image/450/10/1312498740/909588.jpg", "Human", "09.12.1981", "08.08.2023", "Speaks funny and doesn't make sense.")
        ],
        true, [], "admin");
testUser.showUser();

}

getUser();
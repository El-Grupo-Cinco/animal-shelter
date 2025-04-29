import { BookingRequest, Booking } from "./bookingClass.js";

const bookingCards = document.getElementById("booking-cards");

const bookings = [new Booking("DarthVader", "R2D2", "2025-05-08T08:00UTC", ["Bring bolts and charger", "Brings old picture from Tatoine"]),
        new Booking("Longstocking", "Lilla Gubben", "2025-05-08T08:00UTC", ["Brings a monkey (why?)", "Is very strong, can carry the horse back if all goes well"])];

for (const booking of bookings) {
        bookingCards.append(booking.publish());
}

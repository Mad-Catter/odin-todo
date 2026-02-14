import { displayCalendar,} from "./calendar-display.js"
import { setMonth, getMonth} from "date-fns";

// This should likely be moved to a different module.
const now = new Date();
displayCalendar(now)

const leftButton = document.querySelector(".left")
const rightButton = document.querySelector(".right")
const calendarViewer = document.querySelector(".calendar-viewer");
let offset = 0;
let changedDate;

leftButton.addEventListener("click", e => {
    displayChangedCalendar("decrease");
});
rightButton.addEventListener("click", e => {
    displayChangedCalendar("increase");
});

calendarViewer.addEventListener("wheel", e => {
    if (e.deltaY < 0) {
        displayChangedCalendar("decrease");
    } else if (e.deltaY > 0) {
        displayChangedCalendar("increase");
    }
});
// Currently, calendar will always load on the current date, and since the only way to change the calendar is with the backwards and forwards arrows,
// I am simply changing the calendar display based off of an offset of the current date. 
// This will need to be changed if I add a dropdown menu to select months.
function displayChangedCalendar(change) {
    if (change === "increase") {
        offset++
    } else if (change === "decrease") {
        offset--
    }
    changedDate = setMonth(now, getMonth(now) + offset);
    displayCalendar(changedDate);
}
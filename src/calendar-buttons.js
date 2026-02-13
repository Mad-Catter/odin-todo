import { displayCalendar } from "./calendar-display.js"
import {generateMonthArray} from "./calendar-gen.js";
import { setMonth, getMonth} from "date-fns";
const now = new Date();
displayCalendar(now)

const leftButton = document.querySelector(".left")

const rightButton = document.querySelector(".right")
let offset = 0;
let changedDate
leftButton.addEventListener("click", e => {
    offset--;
    changedDate = setMonth(now, getMonth(now) + offset);
    console.log(changedDate);
    displayCalendar(changedDate);
    
})
rightButton.addEventListener("click", e => {
    offset++;
    changedDate = setMonth(now, getMonth(now) + offset);
    displayCalendar(changedDate);
})
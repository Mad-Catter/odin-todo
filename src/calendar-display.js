import {generateMonthArray} from "./calendar-gen.js";
import elementCreator from "./element-creator.js";

// Function checks current date.
// Checks what weekday the first day of the month is and how many days are in the month.
// The function then will make an array? with the required amount of blank(or numbered?) items until the first day of the calendar is the proper day.
// It will then make the required amount of days for the month, giving each day a p element with its number, and a class equal to the date it represents.
export function displayCalendar(date) {
    const array = generateMonthArray(date);
    const monthDisplay = document.querySelector(".month");
    const splitDate = array[20].fullDate.split("-");
    const textMonth = getTextMonth(splitDate[0])
    monthDisplay.textContent = textMonth;
    clearCalendar();
    const calendarViewer = document.querySelector(".calendar-viewer");
    for (let i = 0; i < array.length; i++) {
        const day = elementCreator("div", calendarViewer, ["day", array[i].fullDate]);
        if (array[i] !== "") {
            elementCreator("p", day, "", {textContent: array[i].dayDate})
        }
    }
}

function clearCalendar() {
    const listOfDays = document.querySelectorAll(".day");
    for (const node of listOfDays) {
        node.remove();
    }
}
function getTextMonth(num) {
    switch (num) {
        case "1": 
            return "January"
        case "2":
            return "February"
        case "3": 
            return "March"
        case "4": 
            return "April"
        case "5": 
            return "May"
        case "6": 
            return "June"
        case "7": 
            return "July"
        case "8": 
            return "August"
        case "9": 
            return "September"
        case "10":
            return "October"
        case "11":
            return "November"
        case "12": 
            return "December"
    }
}



// Then the calendar will iterate over a list of todos and check if there are any due this month.  Then it will check it will go through and generate a card for each todo.
// Clicking on a left or right arrow will generate a new month + or - one.
// Adding a new todo on this screen might need to check if it is new 
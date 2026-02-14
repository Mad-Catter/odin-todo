import {generateMonthArray} from "./calendar-gen.js";
import elementCreator from "./element-creator.js";
import { isSameDay } from "date-fns";
import { listOfTodos } from "./list.js";
import createModal from "./modal-display.js"
// The function takes a date object and gives it to generateMonthArray to get an array of all the days in the month of the date object.
export function displayCalendar(date) {
    const array = generateMonthArray(date);
    const monthDisplay = document.querySelector(".month");
    // The splitDate const takes a random entry in the array and gets the month and year from the entry.  I could maybe change this to get it from the date object.
    // array[20] is a random number that is chosen because it is in the middle of the pack.  Too late of a number and that might not be a date, too early and it might be a blank item.
    const splitDate = array[20].fullDate.split("-");
    const textMonth = getTextMonth(splitDate[0]) + " " + splitDate[2];
    monthDisplay.textContent = textMonth;
    clearCalendar(".day");
    const calendarViewer = document.querySelector(".calendar-viewer");
    for (let i = 0; i < array.length; i++) {
        const day = elementCreator("div", calendarViewer, ["day", array[i].fullDate]);
        if (array[i] !== "") {
            const dayNumber = elementCreator("p", day, "", {textContent: array[i].dayDate})
            // This checks if a given date is today.  If so, it is given a class to give it a blue marker on its number.
            if (isSameDay(array[i].fullDate, new Date())) {
                dayNumber.classList.add("today");
            }
        }
        // This checks each loop if there are any todos on a certain day and if so, an element representing the todo is made.
        // This is likely a very preformance unfriendly approach.
        for (let j = 0; j < listOfTodos.length; j++) {
            const todo = listOfTodos[j];
            if (todo.dueDate === array[i].fullDate) {
                const todoDay = elementCreator("div", day, ["todo-day", todo.priority]);
                elementCreator("p", todoDay, "todo-day-title", {textContent: todo.title});
                if (todo.time) elementCreator("p", todoDay, "", {textContent: todo.time})
                createModal(todo, todoDay);
            }
        }
    }
}   

export function displayModalCalendar(date) {
    const array = generateMonthArray(date);
    const modalMonthDisplay = document.querySelector(".modal-month");
    // The splitDate const takes a random entry in the array and gets the month and year from the entry.  I could maybe change this to get it from the date object.
    // array[20] is a random number that is chosen because it is in the middle of the pack.  Too late of a number and that might not be a date, too early and it might be a blank item.
    const splitDate = array[20].fullDate.split("-");
    const textMonth = getTextMonth(splitDate[0]) + " " + splitDate[2];
    modalMonthDisplay.textContent = textMonth;
    clearCalendar(".modal-day");
    const modalCalendar = document.querySelector(".modal-calendar");
    const dateInput = document.querySelector("#todo-date")
    for (let i = 0; i < array.length; i++) {
        const day = elementCreator("button", modalCalendar, ["modal-day", array[i].fullDate], {type: "button"});
        day.addEventListener("click", e => {
            if (e.currentTarget.classList[1] !== "undefined") dateInput.value = e.currentTarget.classList[1];
        })
        if (array[i] !== "") {
            const dayNumber = elementCreator("p", day, "", {textContent: array[i].dayDate})
            // This checks if a given date is today.  If so, it is given a class to give it a blue marker on its number.
            if (isSameDay(array[i].fullDate, new Date())) {
                dayNumber.classList.add("today");
            }
        }
    }
}   

function clearCalendar(classRemove) {
    const listOfDays = document.querySelectorAll(classRemove);
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
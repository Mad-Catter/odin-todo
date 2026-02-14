import {displayModalCalendar } from "./calendar-display.js"
import { setMonth, getMonth} from "date-fns";
import { listOfFolders } from "./list.js";
import elementCreator from "./element-creator.js";
import Todo from "./todo-creator.js";

// This should likely be moved to a different module.
const now = new Date();

displayModalCalendar(now)

const modalLeftButton = document.querySelector(".modal-left")
const modalRightButton = document.querySelector(".modal-right")
const modalCalendar = document.querySelector(".modal-calendar");
let modalOffset = 0;
let modalChangedDate;

modalLeftButton.addEventListener("click", e => {
    displayChangedModalCalendar("decrease");
});
modalRightButton.addEventListener("click", e => {
    displayChangedModalCalendar("increase");
});

modalCalendar.addEventListener("wheel", e => {
    if (e.deltaY < 0) {
        displayChangedModalCalendar("decrease");
    } else if (e.deltaY > 0) {
        displayChangedModalCalendar("increase");
    }
});
// Currently, calendar will always load on the current date, and since the only way to change the calendar is with the backwards and forwards arrows,
// I am simply changing the calendar display based off of an modalOffset of the current date. 
// This will need to be changed if I add a dropdown menu to select months.
function displayChangedModalCalendar(change) {
    if (change === "increase") {
        modalOffset++
    } else if (change === "decrease") {
        modalOffset--
    }
    modalChangedDate = setMonth(now, getMonth(now) + modalOffset);
    displayModalCalendar(modalChangedDate);
}

const folderBox = document.querySelector(".folder-box")
const listOfFolderNames = Object.keys(listOfFolders);
for (let i = 0; i < listOfFolderNames.length; i++) {
    const folderName = listOfFolderNames[i];
    const folderItem = elementCreator("div",folderBox, [folderName, "folder-item"]);
    const marker = elementCreator("div", folderItem, "marker");
    elementCreator ("p", folderItem, "", {textContent: folderName});
    
    folderItem.addEventListener("click", e => {
        marker.classList.toggle("yes");
        folderItem.classList.toggle("confirm");
    })
}

// This might need to be moved, I want all the buttons to be together
const todoModal = document.querySelector(".todo-modal")
const todoName = document.querySelector("#todo-name");
const todoDesc = document.querySelector("#todo-desc");
const todoDate = document.querySelector("#todo-date");
const todoTime = document.querySelector("#todo-time");
const todoPriority = document.querySelector("#todo-priority");
const todoConfirm = document.querySelector(".todo-confirm");

todoConfirm.addEventListener("click", e => {
    e.preventDefault()
    if (todoName.value) {
        const folderNodeList = document.querySelectorAll(".folder-item");
        const todoFolders = [];
        for (const folderNode of folderNodeList) {
            if (folderNode.classList.contains("confirm")) todoFolders.push(folderNode.classList[0])
        }
        const todo = new Todo(todoName.value, todoDesc.value, todoPriority.value, todoDate.value, todoTime.value, "", "", todoFolders);
        todoModal.close()
        console.log(todo)
    }
})
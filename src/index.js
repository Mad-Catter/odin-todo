import "./style.css"
import Todo from "./todo-creator.js";
import "./interactive-buttons.js"
import "./folder-display.js";
import  {listOfFolders} from "./list.js"
import {differenceInDays} from "date-fns"

const now = new Date();
console.log(now);

const trial = new Todo("Make Todo List",
     "This involves coding a todo list",
     "urgent",
     "2026-02-12T18:03",
     {1: "I dont know what I'm doing", 2: "unless????"},
     {webpack: true,
      class: true,
      everythingElse: false,
     },
    ["non-urgents"]);
console.log(differenceInDays(trial.dueDate, now));



const test = document.querySelector("h1")
test.addEventListener("click", e => {
    console.log(listOfFolders);
});
const dummyModal = document.querySelector(".dummy-modal");
const cardModal = document.querySelector(".card-modal");
dummyModal.addEventListener("click", e => {
    console.log("yes")
    cardModal.showModal();
});

cardModal.addEventListener("click", e => {
    e.stopPropagation();
    const cardModalDimensions = cardModal.getBoundingClientRect();
    if (
        e.clientX < cardModalDimensions.left ||
        e.clientX > cardModalDimensions.right ||
        e.clientY < cardModalDimensions.top ||
        e.clientY > cardModalDimensions.bottom
    ) {
        cardModal.close();
    }
})

const dummyCheckboxText = document.querySelector(".checkbox-text-a");
const dummyCheckboxInput = document.querySelector(".edit-input-a");
const editButton = document.querySelector(".edit-checkbox-a");
editButton.addEventListener("click", () => {
    if (dummyCheckboxInput.classList.contains("hidden")) {
        dummyCheckboxInput.value = dummyCheckboxText.textContent;
        dummyCheckboxInput.classList.toggle("hidden");
        dummyCheckboxText.classList.toggle("hidden");
        dummyCheckboxInput.focus();
    }
})
dummyCheckboxInput.addEventListener("keydown", e => {
    dummyCheckboxText.textContent = dummyCheckboxInput.value;
    if (e.key === "Enter") {
        dummyCheckboxInput.classList.add("hidden");
        dummyCheckboxText.classList.remove("hidden");
    }
})
dummyCheckboxInput.addEventListener("blur", () => {
    dummyCheckboxInput.classList.add("hidden");
    dummyCheckboxText.classList.remove("hidden");
})

const noteEditButton = document.querySelector(".note-edit-button");
const noteText = document.querySelector(".text-notes");
const noteEdit = document.querySelector(".edit-notes");

noteEditButton.addEventListener("click", () => {
    if (noteEdit.classList.contains("hidden")) {
        noteEdit.value = noteText.textContent;
        noteEdit.classList.toggle("hidden");
        noteText.classList.toggle("hidden");
        noteEdit.focus();
    }
})
noteEdit.addEventListener("keydown", e => {
    noteText.textContent = noteEdit.value;
    if (e.key === "Enter") {
        noteEdit.classList.add("hidden");
        noteText.classList.remove("hidden");
    }
})
noteEdit.addEventListener("blur", () => {
    noteEdit.classList.add("hidden");
    noteText.classList.remove("hidden");
})


const deleteButton = document.querySelector(".delete-checkbox-a")
const checkbox = document.querySelector(".checkbox-a")
deleteButton.addEventListener("click", e => {
    checkbox.remove();
})

const checkboxBody = document.querySelector(".checkbox-body-a");
const marker = document.querySelector(".marker-a");
checkboxBody.addEventListener("click", e => {
    marker.classList.toggle("yes");
})



export {listOfFolders};
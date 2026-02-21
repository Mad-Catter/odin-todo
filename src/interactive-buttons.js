import {listOfFolders} from "./list.js"
import { generator} from "./generator.js";

const body = document.querySelector("body");

const newFolder = document.querySelector(".new-folder");
const folderDialog = document.querySelector(".folder-dialog");
const folderName = document.querySelector("#folder-name");
const folderConfirm = document.querySelector(".folder-confirm");
const folderCancel = document.querySelector(".folder-cancel");
const folderErrorDialog = document.querySelector(".folder-error");

const newTodo = document.querySelector(".new-todo");
const todoModal = document.querySelector(".todo-modal");
const todoName = document.querySelector("#todo-name");
const todoConfirm = document.querySelector(".todo-confirm");
const todoCancel = document.querySelector(".todo-cancel");
const todoErrorDialog = document.querySelector(".todo-error")

const cardViewButton = document.querySelector(".card-view");
const cardViewer = document.querySelector(".card-viewer");
const calendarViewButton = document.querySelector(".calendar-view");
const calendarViewer = document.querySelector(".calendar-viewer")


body.addEventListener("click", e => {
    folderDialog.close();
    folderErrorDialog.close()
    todoModal.close();
    todoErrorDialog.close();
})

newFolder.addEventListener("click", e => {
    e.stopPropagation();
    folderDialog.show();
    todoModal.close();
})
folderDialog.addEventListener("click", e => {
    e.stopPropagation();
})


folderCancel.addEventListener("click", e => {
    folderName.value = "";
    folderDialog.close();
})
folderConfirm.addEventListener("click", e => {
    e.preventDefault();
    // This should maybe be moved to the error module.
    if ((folderName.value.toLowerCase() in listOfFolders)) {
        e.stopPropagation();
        folderErrorDialog.textContent = "A folder with that name already exists!"
        folderErrorDialog.show();
    } else if (folderName.value === "") {
        e.stopPropagation();
        folderErrorDialog.textContent = "You cant have a folder with no name!";
        folderErrorDialog.show();
    } else{
        generator.addToFolderList(folderName.value);
        folderName.value = "";
        folderDialog.close();
        folderErrorDialog.close();
    }
    
})

newTodo.addEventListener("click", e => {
    e.stopPropagation();
    generator.generateModalCalendar();
    todoModal.showModal();
    folderDialog.close();
})
todoModal.addEventListener("click", e => {
    e.stopPropagation();
    todoErrorDialog.close();
})


todoCancel.addEventListener("click", e => {
    todoName.value = "";
    todoModal.close();
})
todoConfirm.addEventListener("click", e => {
    e.stopPropagation();
})
// todoConfirm.addEventListener("click", e => {
// //     e.preventDefault();
// //     // This should maybe be moved to the error module.
// //     // if ((todoName.value.toLowerCase() in listOftodos)) {
// //     //     e.stopPropagation();
// //     //     todoErrorDialog.textContent = "A todo with that name already exists!"
// //     //     todoErrorDialog.show();
// //     // } else 
// //     // if (todoName.value === "") {
// //     //     e.stopPropagation();
// //     //     todoErrorDialog.textContent = "You cant have a todo with no name!";
// //     //     todoErrorDialog.show();
// //     // // } else{
// //     // //     addTotodoList(todoName.value);
// //     // //     todoName.value = "";
// //     //     todoModal.close();
// //     //     todoErrorDialog.close();
// //     // }
    
// })
todoModal.addEventListener("click", e => {
    e.stopPropagation();
    const todoModalDimensions = todoModal.getBoundingClientRect();
    if (
        e.clientX < todoModalDimensions.left ||
        e.clientX > todoModalDimensions.right ||
        e.clientY < todoModalDimensions.top ||
        e.clientY > todoModalDimensions.bottom
    ) {
        todoModal.close();
    }
})
cardViewButton.addEventListener("click", e => {
    cardViewer.classList.remove("hidden");
    calendarViewer.classList.add("hidden");
    generator.generateCardDisplay();
})
calendarViewButton.addEventListener("click", e => {
    calendarViewer.classList.remove("hidden")
    cardViewer.classList.add("hidden");
    generator.generateCalendar();
})

export default {}
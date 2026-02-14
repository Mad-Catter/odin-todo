import {listOfFolders} from "./list.js"
import { addToFolderList } from "./folder-display.js";
const errorDialog = document.querySelector(".folder-error")
const body = document.querySelector("body");
const newFolder = document.querySelector(".new-folder");
const folderDialog = document.querySelector(".folder-dialog");
const folderName = document.querySelector("#folder-name");
const folderConfirm = document.querySelector(".folder-confirm");
const folderCancel = document.querySelector(".folder-cancel");
const cardViewButton = document.querySelector(".card-view");
const cardViewer = document.querySelector(".card-viewer");
const calendarViewButton = document.querySelector(".calendar-view");
const calendarViewer = document.querySelector(".calendar-viewer")

newFolder.addEventListener("click", e => {
    e.stopPropagation();
    folderDialog.show();
})
folderDialog.addEventListener("click", e => {
    e.stopPropagation();
})
body.addEventListener("click", e => {
    folderDialog.close();
    errorDialog.close()
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
        errorDialog.textContent = "A folder with that name already exists!"
        errorDialog.show();
    } else if (folderName.value === "") {
        e.stopPropagation();
        errorDialog.textContent = "You cant have a folder with no name!";
        errorDialog.show();
    } else{
        addToFolderList(folderName.value);
        folderName.value = "";
        folderDialog.close();
        errorDialog.close();
    }
    
})
cardViewButton.addEventListener("click", e => {
    cardViewer.classList.remove("hidden");
    calendarViewer.classList.add("hidden");
})
calendarViewButton.addEventListener("click", e => {
    calendarViewer.classList.remove("hidden")
    cardViewer.classList.add("hidden");
})

export default {}
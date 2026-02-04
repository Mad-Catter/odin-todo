import {listOfFolders} from "./list.js"
import { addToFolderList } from "./folder-display.js";
const errorDialog = document.querySelector(".folder-error")
const body = document.querySelector("body");
const newFolder = document.querySelector(".new-folder");
const folderDialog = document.querySelector(".folder-dialog");
const folderName = document.querySelector("#folder-name");
const folderConfirm = document.querySelector(".folder-confirm");
const folderCancel = document.querySelector(".folder-cancel");
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
        // listOfFolders[folderName.value] = [];
        folderName.value = "";
        folderDialog.close();
        errorDialog.close();
    }
    
})
export default {}
import { listOfFolders} from "./list.js";
import elementCreator from "./element-creator.js";
import plusImg from "../src/assets/plus.svg";
import { enableFolder } from "./interactive-folders.js";


function generateFolderList() {
    const sideList = document.querySelector(".side-list");
    sideList.replaceChildren();
    const listOfFolderNames = Object.keys(listOfFolders);
    for (let i = 0; i < listOfFolderNames.length; i++) {
        
        const name = listOfFolderNames[i];
        const li = elementCreator("li", sideList, [name.replaceAll(" ", "-").toLocaleLowerCase(), "listed-folder"]);
        const markerNText = elementCreator("div", li, "marker-text")
        const marker = elementCreator("div", markerNText, "marker")
        elementCreator("p", markerNText,"", {textContent: name});

        const buttons = elementCreator("div", li, "folder-buttons");
        const addButton = elementCreator("button", buttons, "", {type: "button"});
        elementCreator("img", addButton, "", {src: plusImg, alt: "add"});
        const deleteDialogButton = elementCreator("button", buttons, "", {type: "button", textContent: "X"});
        const deleteDialog = elementCreator("dialog", li, "delete-dialog folder-delete-dialog");
        elementCreator("p", deleteDialog, "", {textContent: "Delete Folder?"});
        const confirmCancelContainer = elementCreator("div", deleteDialog, "confirm-delete-container")
        const confirmButton = elementCreator("button", confirmCancelContainer, "", {type: "button", textContent: "Confirm"});
        const cancelButton = elementCreator("button", confirmCancelContainer, "", {type: "button", textContent: "Cancel"});

        const todoDialog = elementCreator("dialog", li, "list-of-todos-dialog");
        
        enableFolder.addButton(addButton, todoDialog);
        enableFolder.dialogContent(todoDialog, li);
        enableFolder.deleteDialog(deleteDialogButton, deleteDialog, confirmButton, cancelButton, li)
        enableFolder.activeFolder(li, marker)
    }
}

export {generateFolderList}
export default {}
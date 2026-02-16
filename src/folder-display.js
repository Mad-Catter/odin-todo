import { listOfFolders} from "./list.js";
import elementCreator from "./element-creator.js";
import plusImg from "../src/assets/plus.svg";
import { enableFolder } from "./interactive-folders.js";

// Runs at start of program.  might need to change where this lives/how it is called
const sideList = document.querySelector(".side-list");
function addToFolderList(folderName) {
    listOfFolders[folderName] = [];
    const li = elementCreator("li", sideList);
    elementCreator("p", li,"", {textContent: folderName});
}

const listOfFolderNames = Object.keys(listOfFolders);
for (let i = 0; i < listOfFolderNames.length; i++) {
    const name = listOfFolderNames[i];
    const li = elementCreator("li", sideList, [name.replaceAll(" ", "-").toLocaleLowerCase(), "listed-folder"]);
    elementCreator("p", li,"", {textContent: name});

    const buttons = elementCreator("div", li, "folder-buttons");
    const addButton = elementCreator("button", buttons, "", {type: "button"});
    elementCreator("img", addButton, "", {src: plusImg, alt: "add"});
    const deleteButton = elementCreator("button", buttons, "", {type: "button", textContent: "X"})

    const todoDialog = elementCreator("dialog", li, "list-of-todos-dialog");
    
    enableFolder.addButton(addButton, todoDialog);
    enableFolder.dialogContent(todoDialog, li);
    enableFolder.deleteButton(deleteButton, li)
}


export {addToFolderList}
export default {}
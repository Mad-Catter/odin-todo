import { listOfFolders } from "./list.js";
import elementCreator from "./element-creator.js";

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
    const li = elementCreator("li", sideList);
    elementCreator("p", li,"", {textContent: name});

}

export {addToFolderList}
export default {}
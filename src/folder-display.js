import { listOfFolders } from "./list.js";
import elementCreator from "./element-creator.js";

const sideList = document.querySelector(".side-list");
const listOfFolderNames = Object.keys(listOfFolders);
for (let i = 0; i < listOfFolderNames.length; i++) {
    const name = listOfFolderNames[i];
    const li = elementCreator("li", sideList);
    elementCreator("p", li,"", {textContent: name});

}

export default {}
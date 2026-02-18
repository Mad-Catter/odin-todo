import { listOfFolders, listOfTodos} from "./list.js";
import { generateFolderList } from "./folder-display.js";
import { displayCalendar } from "./calendar-display.js";
import { setMonth, getMonth} from "date-fns";
import elementCreator from "./element-creator.js";
import createCard from "./card-display.js";
export const generator = {
    offset: 0,

    generateFolderBoxContent() {
        const folderBox = document.querySelector(".folder-box")
        folderBox.replaceChildren();
        elementCreator("h1", folderBox, "", {textContent: "Folders:"})
        const listOfFolderNames = Object.keys(listOfFolders);
        for (let i = 0; i < listOfFolderNames.length; i++) {
            const folderName = listOfFolderNames[i];
            const folderItem = elementCreator("div",folderBox, [folderName.replaceAll(" ", "-"), "folder-item"]);
            const marker = elementCreator("div", folderItem, "marker");
            elementCreator ("p", folderItem, "", {textContent: folderName});
            
            folderItem.addEventListener("click", e => {
                marker.classList.toggle("yes");
                folderItem.classList.toggle("confirm");
            })
        }
    },
    generateFolderList: generateFolderList,
    generateCardDisplay(list) {
        const cardViewer = document.querySelector(".card-viewer");
        cardViewer.replaceChildren();
        const listOfTodoNames = Object.keys(listOfTodos);
        if (!list || (list.includes("All Todos"))) {
            for (let i = 0; i < listOfTodoNames.length; i++) {
                const todo = listOfTodos[listOfTodoNames[i]];
                createCard(todo);
            }
        } else {
            for (let i = 0; i < listOfTodoNames.length; i++) {
                const todo = listOfTodos[listOfTodoNames[i]];
                if (todo.folders.some(folder => list.includes(folder))) {
                    createCard(todo)
                }
            }
        }
    },
    generateCalendar(change) {
        const now = new Date();
        if (change === "increase") {
            this.offset++
        }
        if (change === "decrease") {
            this.offset--
        }
        const changedDate = setMonth(now, getMonth(now) + this.offset);
        displayCalendar(changedDate);
    },
    generateAll() {
        this.generateCalendar();
        this.generateCardDisplay();
        this.generateFolderBoxContent();
        this.generateFolderList();
    },


}

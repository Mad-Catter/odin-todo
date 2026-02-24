import { listOfFolders, listOfTodos, listOfActiveFolders} from "./list.js";
import { generateFolderList } from "./folder-display.js";
import { displayCalendar, displayModalCalendar } from "./calendar-display.js";
import { setMonth, getMonth, differenceInDays} from "date-fns";
import elementCreator from "./element-creator.js";
import createCard from "./card-display.js";
export const generator = {
    offset: 0,
    modalOffset: 0,
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
    generateCardDisplay() {
        const cardViewer = document.querySelector(".card-viewer");
        cardViewer.replaceChildren();
        const listOfTodoNames = Object.keys(listOfTodos);
        listOfTodoNames.sort((a,b) => {
            // I dont know as much about sort as I wish.  So this is probably a bad way of going about this.  I want the todos to be sorted in the order of:  no date/time > only time > full dates > completed.
            // Currently past date todos are shown first.  Maybe I should change that.
            const firstTodo = listOfTodos[a];
            const secondTodo = listOfTodos[b];
            const diff = differenceInDays(firstTodo.dueDate, secondTodo.dueDate)
            if ((firstTodo.isComplete() === true) && (secondTodo.isComplete() === false)) {
                return 1
            } else if ((secondTodo.isComplete() === true) && (firstTodo.isComplete() === false)) {
                return -1
            } else if (!firstTodo.time && !firstTodo.dueDate && !secondTodo.time && !secondTodo.dueDate) {
                return 0;
            } else if ((!firstTodo.time && !firstTodo.dueDate) && (secondTodo.time || secondTodo.dueDate)) {
                return -1;
            }  else if ((!secondTodo.time && !secondTodo.dueDate) && (firstTodo.time || firstTodo.dueDate)) {
                return 1;
            } else if ((firstTodo.time && !firstTodo.dueDate) && (secondTodo.dueDate)) {
                return -1;
            } else if ((secondTodo.time && !secondTodo.dueDate) && (firstTodo.dueDate)) {
                return 1;
            } else if ((firstTodo.time && !firstTodo.dueDate) && (secondTodo.time && !secondTodo.dueDate)) {
                return timeCompare();
            } else if (diff > 0) {
                return 1;
            } else if (diff < 0) {
                return -1;
            } else if (diff === 0) {
                if (firstTodo.time && secondTodo.time) {
                    return timeCompare();
                }
                return 0;
            }
            return 0;
            function timeCompare() {
                let firstTime = Number(firstTodo.time.split(":")[0]);
                if (firstTodo.time.includes("pm")) firstTime += 12;
                let secondTime = Number(secondTodo.time.split(":")[0]);
                if (secondTodo.time.includes("pm")) secondTime += 12;
                if (firstTime < secondTime) {
                    return -1
                } else if (firstTime > secondTime) {
                    return 1
                } else if (firstTime === secondTime) {
                    const firstMinutes = Number(firstTodo.time.split(":")[1]);
                    const secondMinutes = Number(secondTodo.time.split(":")[1]);
                    if (firstMinutes < secondMinutes) {
                        return -1
                    } else if (firstMinutes > secondMinutes) {
                        return 1
                    } else if (firstMinutes === secondMinutes) {
                        return 0
                    }
                }
            }
        })
        const listOfActiveFolderNames = Object.keys(listOfActiveFolders);
        for (let i = 0; i < listOfTodoNames.length; i++) {
            const todo = listOfTodos[listOfTodoNames[i]];
            if (todo.folders.some(folder => listOfActiveFolderNames.includes(folder))) {
                createCard(todo);
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
        this.modalOffset = this.offset;
        const changedDate = setMonth(now, getMonth(now) + this.offset);
        displayCalendar(changedDate);
    },
    generateModalCalendar(change) {
        const now = new Date();
        if (change === "increase") {
            this.modalOffset++
        } else if (change === "decrease") {
            this.modalOffset--
        }
        const modalChangedDate = setMonth(now, getMonth(now) + this.modalOffset);
        displayModalCalendar(modalChangedDate);
    },
    addToFolderList(folder) {
        listOfFolders[folder] = folder;
        this.generateFolderList();
        this.generateFolderBoxContent();
    },
    generateAll() {
        this.generateModalCalendar();
        this.generateCalendar();
        this.generateCardDisplay();
        this.generateFolderBoxContent();
        this.generateFolderList();
    },


}

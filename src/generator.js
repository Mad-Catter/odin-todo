import { listOfFolders, listOfTodos, listOfActiveFolders} from "./list.js";
import { displayCalendar, displayModalCalendar } from "./calendar-display.js";
import { setMonth, getMonth, differenceInDays} from "date-fns";
import elementCreator from "./element-creator.js";
import createCard from "./card-display.js";
import plusImg from "../src/assets/plus.svg";
import { enableFolder } from "./interactive-folders.js";


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
    generateFolderList() {
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
        // Currently, any time a change to a folder worth saving is made, generateFolderList is called.  So I am attaching the saving of folders to this function.
        // I'm pretty certain this breaks SOLID though, so I might need to move this at some point.
        this.saveFolders();
    },
    generateCardDisplay() {
        const cardViewer = document.querySelector(".card-viewer");
        cardViewer.replaceChildren();
        const listOfTodoNames = Object.keys(listOfTodos);
        listOfTodoNames.sort((a,b) => {
            // I know this is a very bad way of going about this and could be a lot simpler if I just used regular date objects on the todos.
            // However, I dont know as much about sort as I wish,
            // so I decided to use this as an oppurtunity to experiement a bit with the sort function to get a better understanding of it.
            // I do apologize to anyone who has to read this spaghetti.
            //The todos to be sorted in the order of:  no date/time > only time > full dates > completed.
            // My personal logic is that if there is no date/only a time, then the todo is likely something to be completed in the short term, and thus should be first.
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
        // Currently, any time a change to a todo worth saving is made, generateCardDisplay is called.  So I am attaching the saving of todos to this function.
        // I'm pretty certain this breaks SOLID though, so I might need to move this at some point.
        this.saveTodos();
        
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
    saveTodos() {
        try {
            localStorage.setItem("listOfTodos", JSON.stringify(listOfTodos));
        } catch (e) {
            console.error(e);
        }
    },
    saveFolders() {
        try {
            localStorage.setItem("listOfFolders", JSON.stringify(listOfFolders));
        } catch (e) {
            console.error(e);
        }
    },
    generateAll() {
        this.generateModalCalendar();
        this.generateCalendar();
        this.generateCardDisplay();
        this.generateFolderBoxContent();
        this.generateFolderList();
    },


}

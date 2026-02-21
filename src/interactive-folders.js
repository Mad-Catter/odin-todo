import { listOfFolders, listOfTodos, listOfActiveFolders } from "./list.js";
import { generator } from "./generator.js";
import elementCreator from "./element-creator.js";
export const enableFolder = {
    activeFolder (folder, marker) {
        const allMarker = document.querySelector(".all-marker");
        const folderName = folder.classList[0];
        
        folder.addEventListener("click", e => {
            if (listOfActiveFolders["all-todos"] !== undefined) {
                allMarker.classList.remove("yes");
                delete listOfActiveFolders["all-todos"];
            }
            if (listOfActiveFolders[folderName] === undefined) {
                listOfActiveFolders[folderName] = folderName;
                marker.classList.add("yes");
            } else {
                delete listOfActiveFolders[folderName]
                marker.classList.remove("yes");
            }
            if (Object.keys(listOfActiveFolders) == "") {
                allMarker.classList.add("yes");
                listOfActiveFolders["all-todos"] = "all-todos";
            }
            generator.generateCalendar();
            generator.generateCardDisplay();
        })
        
    },
    addButton (button, dialog) {
        button.addEventListener("click", e => {
            e.stopPropagation();
            dialog.show();
        })
        document.querySelector("body").addEventListener("click", e=> {
            dialog.close();
        })
        dialog.addEventListener("click", e => {
            e.stopPropagation();
        })
    },
    deleteButton (button, parent) {
        button.addEventListener("click", e => {
            const folderName = parent.classList[0];
            const listOfTodoNames = Object.keys(listOfTodos);
            for (let i = 0; i < listOfTodoNames.length; i++) {
                const todoFolders = listOfTodos[listOfTodoNames[i]].folders;
                // Might need to check that this is working as I want it to.  Are the folders actually being removed from the objects?
                if (todoFolders.includes(folderName)){
                    todoFolders.splice(todoFolders.indexOf(folderName),1);
                    
                }
                
            }
            // This deletes the folder from the list of folders.  However, this could be cleaned up.
            // Right now the folderName is found using the class name of the DOM element.  However that class name is different to the internal name in the list of folders.
            // So I have to match it with this .toLowerCase and .replaceAll().  I could think about replacing the internal name to match the class name perhaps.
            const listOfFolderNames = Object.keys(listOfFolders);
            for (let j=0; j < listOfFolderNames.length; j++) {
                const currentFolder = listOfFolderNames[j]
                if (currentFolder.toLowerCase() === folderName.toLowerCase().replaceAll("-", " ")) {
                    delete listOfFolders[currentFolder];
                    delete listOfActiveFolders[currentFolder];
                    if (Object.keys(listOfActiveFolders) == "") {
                        allMarker.classList.add("yes");
                        listOfActiveFolders["all-todos"] = "all-todos";
                    }
                }
            }
            parent.remove();
        })
    },
    dialogContent(dialog, parent) {
        const listOfTodoNames = Object.keys(listOfTodos);
        for (let i = 0; i < listOfTodoNames.length; i++) {
            const folderName = parent.classList[0];
            const currentTodo = listOfTodos[listOfTodoNames[i]];
            const todoFolders = currentTodo.folders;
            const line = elementCreator("div", dialog, "todo-dialog-line");
            const marker = elementCreator("div", line, "marker");
            if (todoFolders.includes(folderName)) {
                marker.classList.add("yes");
            }
            const todoSelect = elementCreator("button", line, "todo-select", {type: "button", textContent: currentTodo.title});
            line.addEventListener("click", e => {
                if (!todoFolders.includes(folderName)) {
                    marker.classList.add("yes");
                    todoFolders.push(folderName);
                } else {
                    marker.classList.remove("yes");
                    todoFolders.splice(todoFolders.indexOf(folderName),1)
                }
                generator.generateCalendar();
                generator.generateCardDisplay();
            })
        }
    }
}
function enableAllTodos() {
    const allMarker = document.querySelector(".all-marker");
    const allTodos = document.querySelector(".all-todos");
    allTodos.addEventListener("click", e => {
        const listOfActiveFolderNames = Object.keys(listOfActiveFolders)
        if (!(listOfActiveFolderNames.includes("all-todos"))) {
            const markerList = document.querySelectorAll(".marker-text > .marker");
            for (const marker of markerList.values()) {
                marker.classList.remove("yes");
            }
            for (let i = 0; i < listOfActiveFolderNames.length; i++) {
                const currentFolder = listOfActiveFolderNames[i];
                delete listOfActiveFolders[currentFolder];
            }
            allMarker.classList.add("yes");
            listOfActiveFolders["all-todos"] = "all-todos";
        }
        generator.generateCalendar();
        generator.generateCardDisplay();
    })
}
function enableCompleteTodos() {
    const completeTodos = document.querySelector(".complete-todos");
    const completeMarker = document.querySelector(".complete-marker");
    const allMarker = document.querySelector(".all-marker");
    completeTodos.addEventListener("click", e => {
        if (listOfActiveFolders["all-todos"] !== undefined) {
            allMarker.classList.remove("yes");
            delete listOfActiveFolders["all-todos"];
        }
        if (listOfActiveFolders["complete-todos"] === undefined) {
            listOfActiveFolders["complete-todos"] = "complete-todos";
            completeMarker.classList.add("yes");
        } else {
            delete listOfActiveFolders["complete-todos"]
            completeMarker.classList.remove("yes");
        }
        if (Object.keys(listOfActiveFolders) == "") {
            allMarker.classList.add("yes");
            listOfActiveFolders["all-todos"] = "all-todos";
        }
        generator.generateCalendar();
        generator.generateCardDisplay();
    })
}
export function enableDefaultFolders() {
    enableAllTodos();
    enableCompleteTodos();
}
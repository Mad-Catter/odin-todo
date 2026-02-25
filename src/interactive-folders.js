import { listOfFolders, listOfTodos, listOfActiveFolders } from "./list.js";
import { generator } from "./generator.js";
import elementCreator from "./element-creator.js";
export const enableFolder = {
    activeFolder (folder, marker) {
        const allMarker = document.querySelector(".all-marker");
        const folderName = folder.classList[0];

        
        folder.addEventListener("click", e => {
            // The all todo folder should not be able to be selected with other folders (ignoring the complete folder.).  This will turn all folders off if it is selected.
            if (listOfActiveFolders["all-todos"] !== undefined) {
                allMarker.classList.remove("yes");
                delete listOfActiveFolders["all-todos"];
            }
            // This will toggle any folder being selected.
            if (listOfActiveFolders[folderName] === undefined) {
                listOfActiveFolders[folderName] = folderName;
                marker.classList.add("yes");
            } else {
                delete listOfActiveFolders[folderName]
                marker.classList.remove("yes");
            }
            // If no folders or only the complete folder are visible, the all folder will be shown.
            if ((Object.keys(listOfActiveFolders) == "" || Object.keys(listOfActiveFolders) == "complete-todos")) {
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
    deleteDialog(showButton, dialog, confirmButton, cancelButton, parent) {
        showButton.addEventListener("click", e => {
            e.stopPropagation();
            dialog.show();
        })
        dialog.addEventListener("click", e => {
            e.stopPropagation();
        })
        document.querySelector("body").addEventListener("click", e => {
            dialog.close();
        })
        cancelButton.addEventListener("click", e => {
            dialog.close();
        })
        confirmButton.addEventListener("click", e => {
            const folderName = parent.classList[0];
            const listOfTodoNames = Object.keys(listOfTodos);
            for (let i = 0; i < listOfTodoNames.length; i++) {
                const todoFolders = listOfTodos[listOfTodoNames[i]].folders;
                if (todoFolders.includes(folderName)){
                    todoFolders.splice(todoFolders.indexOf(folderName),1);
                    
                }
                
            }
            // This deletes the folder from the list of folders.  However, this could be cleaned up.
            // Right now the folderName is found using the class name of the DOM element.  However that class name is different to the internal name in the list of folders.
            // So I have to match it with this .toLowerCase and .replaceAll().  I could think about replacing the internal name to match the class name perhaps.
            const listOfFolderNames = Object.keys(listOfFolders);
            for (let i=0; i < listOfFolderNames.length; i++) {
                const currentFolder = listOfFolderNames[i]
                if (currentFolder.toLowerCase() === folderName.toLowerCase().replaceAll("-", " ")) {
                    delete listOfFolders[currentFolder];
                    delete listOfActiveFolders[currentFolder];
                    if (Object.keys(listOfActiveFolders) == "") {
                        allMarker.classList.add("yes");
                        listOfActiveFolders["all-todos"] = "all-todos";
                    }
                }
            }
            generator.generateFolderList();
            generator.generateFolderBoxContent();
        })
    },
    dialogContent(dialog, parent) {
        const listOfTodoNames = Object.keys(listOfTodos);
        // Todos are sorted alphabetically with complete todos being put at the end.
        listOfTodoNames.sort((a,b) => {
                    const firstTodo = listOfTodos[a];
                    const secondTodo = listOfTodos[b];
                    if ((firstTodo.isComplete() === true) && (secondTodo.isComplete() === false)) {
                        return 1
                    } else if ((secondTodo.isComplete() === true) && (firstTodo.isComplete() === false)) {
                        return -1
                    } else {
                        return firstTodo.title.localeCompare(secondTodo.title)
                    }
        })
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
    const completeMarker = document.querySelector(".complete-marker")
    allTodos.addEventListener("click", e => {
        const listOfActiveFolderNames = Object.keys(listOfActiveFolders)
        if (!(listOfActiveFolderNames.includes("all-todos"))) {
            // This is a very lazy way to make sure that the status of whether or not the program shows complete folders is saved throughout this function.
            let completeFolder = false;
            if (listOfActiveFolderNames.includes("complete-todos")) completeFolder = true;

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
            if (completeFolder) {
                completeMarker.classList.add("yes");
                listOfActiveFolders["complete-todos"] = "complete-todos";
            }
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

        if (listOfActiveFolders["complete-todos"] === undefined) {
            listOfActiveFolders["complete-todos"] = "complete-todos";
            completeMarker.classList.add("yes");
        } else {
            delete listOfActiveFolders["complete-todos"]
            completeMarker.classList.remove("yes");
        }
        if ((Object.keys(listOfActiveFolders) == "" || Object.keys(listOfActiveFolders) == "complete-todos")) {
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
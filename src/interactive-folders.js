import { listOfFolders, listOfTodos } from "./list.js";
import elementCreator from "./element-creator.js";
export const enableFolder = {
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
            })
        }
    }
}
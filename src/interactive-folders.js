import { listOfTodos } from "./list.js";
import elementCreator from "./element-creator.js";
export const enableFolder = {
    addButton (button, dialog) {
        button.addEventListener("click", e => {
            dialog.show();
        })
    },
    deleteButton (button, parent) {
        button.addEventListener("click", e => {
            const folderName = parent.classList[0];
            const listOfTodoNames = Object.keys(listOfTodos);
            for (let i = 0; i < listOfTodoNames.length; i++) {
                const todoFolders = listOfTodos[listOfTodoNames[i]].folders;
                // Might need to check that this is working as I want it to.  Are the folders actually being removed from the objects?
                if (todoFolders.includes(folderName)){ todoFolders.splice(todoFolders.indexOf(folderName),1)}
            }
            parent.remove();
        })
    },
    dialogContent(dialog, parent) {
        const listOfTodoNames = Object.keys(listOfTodos);
        for (let i = 0; i < listOfTodoNames.length; i++) {
            const folderName = parent.classList[0];
            const name = listOfTodoNames[i];
            const todoFolders = listOfTodos[name].folders;
            const marker = elementCreator("div", dialog, "marker");
            if (todoFolders.includes(folderName)) {
                marker.classList.add("yes");
            }
            const todoSelect = elementCreator("button", dialog, "todo-select", {type: "button", textContent: name});
            todoSelect.addEventListener("click", e => {
                if (!todoFolders.includes(folderName)) {
                    marker.classList.add("yes");
                    todoFolders.push(folderName);
                } else {
                    marker.classList.remove("yes");
                    todoFolders.splice(todoFolders.indexOf(folderName),1)
                }
                console.log(listOfTodos[name])
            })
        }
    }
}
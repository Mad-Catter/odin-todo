import { generator } from "./generator.js";
import { setMonth, getMonth} from "date-fns";
import { listOfFolders, listOfTodos } from "./list.js";
import elementCreator from "./element-creator.js";
import Todo from "./todo-creator.js";


const modalLeftButton = document.querySelector(".modal-left")
const modalRightButton = document.querySelector(".modal-right")
const modalCalendar = document.querySelector(".modal-calendar");

modalLeftButton.addEventListener("click", e => {
    generator.generateModalCalendar("decrease");
});
modalRightButton.addEventListener("click", e => {
    generator.generateModalCalendar("increase");
});

modalCalendar.addEventListener("wheel", e => {
    if (e.deltaY < 0) {
        generator.generateModalCalendar("decrease");
    } else if (e.deltaY > 0) {
        generator.generateModalCalendar("increase");
    }
});

// This might need to be moved, I want all the buttons to be together
const todoModal = document.querySelector(".todo-modal")
const todoName = document.querySelector("#todo-name");
const todoDesc = document.querySelector("#todo-desc");
const todoDate = document.querySelector("#todo-date");
const todoTime = document.querySelector("#todo-time");
const todoPriority = document.querySelector("#todo-priority");
const todoConfirm = document.querySelector(".todo-confirm");
const todoErrorDialog = document.querySelector(".todo-error")
// Need to add an error for repeat names possibly.
todoConfirm.addEventListener("click", e => {
    e.preventDefault()
    if (!todoName.value) {
        todoErrorDialog.show();
    } else {
        const folderNodeList = document.querySelectorAll(".folder-item");
        const todoFolders = [];
        for (const folderNode of folderNodeList) {
            if (folderNode.classList.contains("confirm")) todoFolders.push(folderNode.classList[0])
        }
        const todo = new Todo(todoName.value, todoDesc.value, todoPriority.value, todoDate.value, todoTime.value, "", "", todoFolders);
        // This logic might need to be moved elsewhere
        let title = todo.title
        let repeat = 1;
        while (listOfTodos[title] !== undefined) {
            if (!(title.slice(-3) === `(${repeat-1})`)) {
                title = title + `(${repeat})`;
            } else {
                title = title.slice(0, -3) + `(${repeat})`;
            }
            repeat++;
            todo.title = title;
        }
        if (todo.time && (todo.time.slice(0, 2) <= 12)) {
            todo.time = todo.time+"am"
        } else if (todo.time) {
            todo.time = (todo.time.slice(0, 2) -12) + todo.time.slice(2) +"pm"
        }
        console.log(todo.time)
        listOfTodos[title] = todo;
        generator.generateAll();
        todoModal.close()
        todoName.value = todoDesc.value = todoDate.value = todoTime.value = "";
        todoPriority.value = undefined;
    }
})
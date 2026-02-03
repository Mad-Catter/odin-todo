import "./style.css"
import Todo from "./todo-creator.js";
import "./interactive-buttons.js"
import "./folder-display.js";
import  {listOfFolders} from "./list.js"

const trial = new Todo("Make Todo List",
     "This involves coding a todo list",
     "urgent",
     "",
     {1: "I dont know what I'm doing", 2: "unless????"},
     {webpack: true,
      class: true,
      everythingElse: false,
     },
    ["non-urgents"]);





const test = document.querySelector("h1")
test.addEventListener("click", e => {
    console.log(listOfFolders);
})
export {listOfFolders};
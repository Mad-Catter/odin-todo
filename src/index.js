import "./style.css"
import Todo from "./todo-creator.js";
import "./interactive-buttons.js"
import "./folder-display.js";
import  {listOfFolders} from "./list.js"
import {differenceInDays} from "date-fns"
import "./dummy-card-display.js"
import "./card-display.js"

const now = new Date();
console.log(now);

const trial = new Todo("Make Todo List",
     "This involves coding a todo list",
     "urgent",
     "2026-02-12T18:03",
     {1: "I dont know what I'm doing", 2: "unless????"},
     {webpack: true,
      class: true,
      everythingElse: false,
     },
    ["non-urgents"]);
console.log(differenceInDays(trial.dueDate, now));



const test = document.querySelector("h1")
test.addEventListener("click", e => {
    console.log(listOfFolders);
});

export {listOfFolders};
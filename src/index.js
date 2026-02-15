import "./style.css"
import Todo from "./todo-creator.js";
import "./interactive-buttons.js";
import "./folder-display.js";
import  {listOfFolders, listOfTodos} from "./list.js";
import "./dummy-card-display.js";
import displayCard from "./card-display.js";
import "./calendar-buttons.js";
import "./new-todo-modal.js"

const trial = new Todo("Make Todo List",
     "This involves coding a todo list",
     "urgent",
     "2-6-2026",
     "3:20pm",
     "Notes are the true notes.  This is a very deep statment.  Trust me.  Im not just typing things randomly.  Youre typing things randomly.",
     {webpack: true,
      class: true,
      everythingElse: false,
     },
    ["non-urgents"]
);
const secondTrial = new Todo("Making Fake Todo Lists",
    "This involes typing nonsense",
    "unimportant",
    "2-15-2026",
    "5:00am",
    "",
    {

    },
    [],
)
const thirdTrial = new Todo("Finishing The program",
    "This involves more work than I though",
    "undefined",
    "2-27-2026",
    "",
    "",
    {

    },
    [],
)
// Think this need to be changed.  It is not very OOP
// listOfTodos.push(trial);
// listOfTodos.push(secondTrial);
// listOfTodos.push(thirdTrial);
displayCard(trial);
displayCard(secondTrial);
displayCard(thirdTrial);


const test = document.querySelector("h1")
test.addEventListener("click", e => {
    console.log(listOfFolders);
});


export {listOfFolders};
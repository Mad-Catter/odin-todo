import "./style.css"
import Todo from "./todo-creator.js";
import "./interactive-buttons.js";
import "./folder-display.js";
import  {listOfFolders} from "./list.js";
import "./dummy-card-display.js";
import displayCard from "./card-display.js";
import "./calendar-buttons.js";

const trial = new Todo("Make Todo List",
     "This involves coding a todo list",
     "urgent",
     "2026-02-12T18:03",
     "Notes are the true notes.  This is a very deep statment.  Trust me.  Im not just typing things randomly.  Youre typing things randomly.",
     {webpack: true,
      class: true,
      everythingElse: false,
     },
    ["non-urgents"]);
displayCard(trial);


const test = document.querySelector("h1")
test.addEventListener("click", e => {
    console.log(listOfFolders);
});

const cardViewButton = document.querySelector(".card-view");
const cardViewer = document.querySelector(".card-viewer");
const calendarViewButton = document.querySelector(".calendar-view");
const calendarViewer = document.querySelector(".calendar-viewer")

cardViewButton.addEventListener("click", e => {
    cardViewer.classList.remove("hidden");
    calendarViewer.classList.add("hidden");
})
calendarViewButton.addEventListener("click", e => {
    
    calendarViewer.classList.remove("hidden")
    cardViewer.classList.add("hidden");
})

export {listOfFolders};
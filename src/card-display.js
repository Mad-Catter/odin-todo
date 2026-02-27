import elementCreator from "./element-creator.js";
import { compareDates } from "./date-compare.js";
import createModal from "./modal-display.js";
export default function createCard(todo) {
    const cardViewer = document.querySelector(".card-viewer");
    const card = elementCreator("div", cardViewer, ["card", todo.priority]);
    elementCreator("h3", card, "", {textContent: todo.title});
    elementCreator("p", card, "", {textContent: todo.desc});
    
    compareDates(todo.dueDate)
    if (todo.dueDate) {
        const dueBox = elementCreator("div", card, "due-box",);
        elementCreator("p", dueBox, "", {textContent: compareDates(todo.dueDate, todo.time)});
        if (todo.isComplete()) {
            dueBox.classList.add("hidden");
        }
        createModal(todo, card, dueBox);
    } else if (todo.time) {
        const dueBox = elementCreator("div", card, "due-box",);
        elementCreator("p", dueBox, "", {textContent: `Due: ${todo.time}`});
        if (todo.isComplete()) {
            dueBox.classList.add("hidden");
        }
        createModal(todo, card, dueBox);
    } else {
        createModal(todo, card);
    }
    
    
    
}
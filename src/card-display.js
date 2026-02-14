import elementCreator from "./element-creator.js";
import createModal from "./modal-display.js";
export default function createCard(todo) {
    const body = document.querySelector("body")
    const cardViewer = document.querySelector(".card-viewer");
    const card = elementCreator("div", cardViewer, ["card", todo.priority]);
    elementCreator("h3", card, "", {textContent: todo.title});
    elementCreator("p", card, "", {textContent: todo.desc});
    const dueBox = elementCreator("div", card, "due-box",);

    // This needs to be changed to have a logic deciding how far away the date is from the current date.
    elementCreator("p", dueBox, "", {textContent: todo.dueDate});
    createModal(todo, card);
    
    
}
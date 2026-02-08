import Todo from "./todo-creator.js";
import elementCreator from "./element-creator.js";
import pencilImg from "../src/assets/pencil-outline.svg"

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


export default function createCard(todo) {
    const body = document.querySelector("body")
    const cardViewer = document.querySelector(".card-viewer");
    const card = elementCreator("div", cardViewer, ["card", todo.priority]);
    elementCreator("h3", card, "", {textContent: todo.title});
    elementCreator("p", card, "", {textContent: todo.desc});
    const dueBox = elementCreator("div", card, "due-box",);

    // This needs to be changed to have a logic deciding how far away the date is from the current date.
    elementCreator("p", dueBox, "", {textContent: todo.dueDate});
    const cardModal = elementCreator("dialog", card, "card-modal");
    elementCreator("h3", cardModal, "", {textContent: todo.title});
    elementCreator("p", cardModal, "", {textContent: todo.desc});
    const dateContainer = elementCreator("div", cardModal, "date-container",);
    // Again this needs to be changed to state the time in a more clean way.
    elementCreator("p", dateContainer, "", {textContent: `Due on: ${todo.dueDate}`});

    //Maybe make the spans first letter capped
    const spanParent = elementCreator("p", dateContainer, "", {textContent: "Priority: "});
    elementCreator("span", spanParent, `${todo.priority}-text`, {textContent: todo.priority});

    const noteCheckboxContainer = elementCreator("div", cardModal, "note-checkbox-container");
    const checkboxesContainer = elementCreator("div", noteCheckboxContainer, "checkboxes-container");
    const newCheckboxDialog = elementCreator("dialog", checkboxesContainer, "new-checkbox-dialog new-dialog");
    const checkboxForm = elementCreator("form", newCheckboxDialog);
    const formID = self.crypto.randomUUID();
    elementCreator("label", checkboxForm, "", {for: formID})
    const checkboxName = elementCreator("input", checkboxForm, "", {type: "text", name: "checkbox-name", id: formID});
    const checkboxDialogButtons = elementCreator("div", checkboxForm, "checkbox-dialog-buttons dialog-buttons");
    const checkboxConfirm = elementCreator("button", checkboxDialogButtons, "checkbox-confirm", {type: "button", textContent: "Confirm"});
    const checkboxCancel = elementCreator("button", checkboxDialogButtons, "checkbox-cancel", {type: "button", textContent: "Cancel"});

    const checkboxError = elementCreator("dialog", checkboxForm, "checkbox-error");
    elementCreator("span", checkboxError, "", "You can't have a checkbox with no name!");

    const newCheckboxButton = elementCreator("button", checkboxesContainer, "new-checkbox-button container-button", {type: "button", textContent: "New Checkbox"});

    
    function createCheckbox(key) {
        const checkbox = elementCreator("div", checkboxesContainer, "checkbox");
        const checkboxBody = elementCreator("div", checkbox, "checkbox-body");
        const marker = elementCreator("div", checkboxBody, "marker");
        const checkboxText = elementCreator("p", checkboxBody, "checkbox-text", {textContent: key});
        const checkboxEditInput = elementCreator("input", checkboxBody, "edit-input hidden", {type: "text"});

        const checkboxButtons = elementCreator("div", checkbox, "checkbox-buttons");
        const editCheckboxButton = elementCreator("button", checkboxButtons, "edit-checkbox", {type: "button"});
        elementCreator("img", editCheckboxButton, "", {src: pencilImg, alt: "edit"});
        const deleteCheckboxButton = elementCreator("button", checkboxButtons, "delete-checkbox", {type: "button", textContent: "X"});
        editCheckboxButton.addEventListener("click", () => {
            if (checkboxEditInput.classList.contains("hidden")) {
                checkboxEditInput.value = checkboxText.textContent;
                checkboxEditInput.classList.toggle("hidden");
                checkboxText.classList.toggle("hidden");
                checkboxEditInput.focus();
            }
        })
        checkboxEditInput.addEventListener("keydown", e => {
            checkboxText.textContent = checkboxEditInput.value;
            todo[key] = checkboxText.textContent;
            if (e.key === "Enter") {
                checkboxEditInput.classList.add("hidden");
                checkboxText.classList.remove("hidden");
            }
        })
        checkboxEditInput.addEventListener("blur", () => {
            checkboxEditInput.classList.add("hidden");
            checkboxText.classList.remove("hidden");
        })
        if (todo.checklist[key] === true) {
            marker.classList.add("yes");
        }
        checkboxBody.addEventListener("click", e => {
            marker.classList.toggle("yes");
        })
        deleteCheckboxButton.addEventListener("click", e => {
            checkbox.remove();
        })        

        
    }
    const ArrayOfTodoCheckboxes = Object.keys(todo.checklist);
    console.log(ArrayOfTodoCheckboxes)
    for (let i = 0; i < ArrayOfTodoCheckboxes.length; i++) {
        createCheckbox(ArrayOfTodoCheckboxes[i]);
    }

    // Notes section
    const notesContainer = elementCreator("div", noteCheckboxContainer, "notes-container");
    const noteEditButton = elementCreator("button", notesContainer, "note-edit-button container-button", {textContent: "Edit Notes"});
    const textNotes = elementCreator("p", notesContainer, "text-notes", {textContent: todo.notes});
    const noteEditArea = elementCreator("textarea", notesContainer, "hidden edit-notes");

    noteEditButton.addEventListener("click", () => {
        if (noteEditArea.classList.contains("hidden")) {
            noteEditArea.value = textNotes.textContent;
            noteEditArea.classList.toggle("hidden");
            textNotes.classList.toggle("hidden");
            noteEditArea.focus();
        }
    })
    noteEditArea.addEventListener("keydown", e => {
        textNotes.textContent = noteEditArea.value;
        // Need to maybe move this into its own module to keep things seperated.
        todo.notes = textNotes.textContent;
        if (e.key === "Enter") {
            noteEditArea.classList.add("hidden");
            textNotes.classList.remove("hidden");
        }
    })
    noteEditArea.addEventListener("blur", () => {
        noteEditArea.classList.add("hidden");
        textNotes.classList.remove("hidden");
    })

    // Logic to make the modal show up
    card.addEventListener("click", e => {
        cardModal.showModal();
    })
    cardModal.addEventListener("click", e => {
        e.stopPropagation();
        const cardModalDimensions = cardModal.getBoundingClientRect();
        if (
            e.clientX < cardModalDimensions.left ||
            e.clientX > cardModalDimensions.right ||
            e.clientY < cardModalDimensions.top ||
            e.clientY > cardModalDimensions.bottom
        ) {
            cardModal.close();
        }
    })

    // Checkbox Dialog settins here
    newCheckboxButton.addEventListener("click", e => {
        e.stopPropagation();
        newCheckboxDialog.show();
    })
    newCheckboxDialog.addEventListener("click", e => {
        e.stopPropagation();
    })
    body.addEventListener("click", e => {
        newCheckboxDialog.close();
        checkboxError.close()
    })
    
    checkboxCancel.addEventListener("click", e => {
        checkboxName.value = "";
        newCheckboxDialog.close();
    })
    checkboxConfirm.addEventListener("click", e => {
        e.preventDefault();
        if ((checkboxName.value in todo.checklist)) {
            e.stopPropagation();
            checkboxError.textContent = "A checkbox with that name already exists!"
            checkboxError.show();
        } else if (checkboxName.value === "") {
            e.stopPropagation();
            checkboxError.textContent = "You cant have a checkbox with no name!";
            checkboxError.show();
        } else{
            // Need to make a function that adds the checkbox to the object instead of editing it here.
            // addToCheckboxList(checkboxName.value);
            todo.checklist[checkboxName.value] = false;
            createCheckbox(checkboxName.value);
            checkboxName.value = "";
            newCheckboxDialog.close();
            checkboxError.close();
        }
        
    })
    
}
createCard(trial);
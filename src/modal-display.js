import elementCreator from "./element-creator.js";
import pencilImg from "../src/assets/pencil-outline.svg"
import {enableEditCheckbox, showEditField, enableToggleCheckbox, enableDeleteCheckbox, enableEditNotes, enableModal, showCheckboxDialog, closeErrorDialog, enableCancelButton, enableConfirmButton} from "./interactive-modal.js";
export default function createModal(todo, parent) {
    const modal = elementCreator("dialog", parent, "modal");
    elementCreator("h3", modal, "", {textContent: todo.title});
    elementCreator("p", modal, "", {textContent: todo.desc});
    const dateContainer = elementCreator("div", modal, "date-container",);
    if (todo.time && todo.dueDate) {
        elementCreator("p", dateContainer, "", {textContent: `Due on: ${todo.dueDate.replaceAll("-","/")} at ${todo.time}`});
    } else if (todo.time) {
        elementCreator("p", dateContainer, "", {textContent: `Due at: ${todo.time}`});
    } else if (todo.dueDate) {
        elementCreator("p", dateContainer, "", {textContent: `Due on: ${todo.dueDate.replaceAll("-","/")}`});
    } else {
        elementCreator("p", dateContainer);
    }
    

    const spanParent = elementCreator("p", dateContainer, "", {textContent: "Priority: "});
    const capPriority = todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1);
    elementCreator("span", spanParent, `${todo.priority}-text`, {textContent: capPriority});

    const noteCheckboxContainer = elementCreator("div", modal, "modal-box-container");
    const checkboxesContainer = elementCreator("div", noteCheckboxContainer, "checkboxes-container modal-box");
    const newCheckboxDialog = elementCreator("dialog", checkboxesContainer, "new-checkbox-dialog new-dialog");
    const checkboxForm = elementCreator("form", newCheckboxDialog);
    const formID = self.crypto.randomUUID();
    elementCreator("label", checkboxForm, "", {for: formID})
    const checkboxName = elementCreator("input", checkboxForm, "", {type: "text", name: "checkbox-name", id: formID});
    const checkboxDialogButtons = elementCreator("div", checkboxForm, "checkbox-dialog-buttons dialog-buttons");
    const checkboxConfirm = elementCreator("button", checkboxDialogButtons, "checkbox-confirm", {type: "button", textContent: "Confirm"});
    const checkboxCancel = elementCreator("button", checkboxDialogButtons, "checkbox-cancel", {type: "button", textContent: "Cancel"});

    const checkboxError = elementCreator("dialog", checkboxForm, "checkbox-error");
    elementCreator("span", checkboxError, "", "Unknown Error!");

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
        if (todo.checklist[key] === true) marker.classList.add("yes");

        showEditField(editCheckboxButton, checkboxEditInput, checkboxText);
        enableEditCheckbox(checkboxEditInput, checkboxText, todo, key);
        enableToggleCheckbox(checkboxBody, marker, todo, checkboxText);
        enableDeleteCheckbox(deleteCheckboxButton, checkbox, todo, checkboxText);
    }
    const ArrayOfTodoCheckboxes = Object.keys(todo.checklist);
    for (let i = 0; i < ArrayOfTodoCheckboxes.length; i++) {
        createCheckbox(ArrayOfTodoCheckboxes[i]);
    }
    const notesContainer = elementCreator("div", noteCheckboxContainer, "notes-container modal-box");
    const noteEditButton = elementCreator("button", notesContainer, "note-edit-button container-button", {textContent: "Edit Notes"});
    const textNotes = elementCreator("p", notesContainer, "text-notes", {textContent: todo.notes});
    const noteEditArea = elementCreator("textarea", notesContainer, "hidden edit-notes");

    
    showEditField(noteEditButton, noteEditArea, textNotes);
    enableEditNotes(noteEditArea, textNotes, todo);
    enableModal(parent, modal);

    showCheckboxDialog(newCheckboxButton, newCheckboxDialog, modal);
    closeErrorDialog(modal, newCheckboxDialog, checkboxError);
    enableCancelButton(checkboxCancel, checkboxName, newCheckboxDialog);
    enableConfirmButton(checkboxConfirm, checkboxName, todo, checkboxError, newCheckboxDialog, createCheckbox);
}
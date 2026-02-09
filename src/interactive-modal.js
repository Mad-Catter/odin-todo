import { showErrorDialog } from "../error-processor.js";

function showEditField(button, editField, textField) {
    button.addEventListener("click", e => {
        if (editField.classList.contains("hidden")) {
            editField.value = textField.textContent;
            editField.classList.toggle("hidden");
            textField.classList.toggle("hidden");
            editField.focus();
        }
    })
    editField.addEventListener("blur", e => {
        editField.classList.add("hidden");
        textField.classList.remove("hidden")
    })
    editField.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            editField.classList.add("hidden");
            textField.classList.remove("hidden");
        }
    })
}
function enableEditCheckbox(editField, textField, todo, checkbox) {
    editField.addEventListener("input", e => {
        textField.textContent = editField.value;
        todo.rewriteChecklist(checkbox, textField.textContent)
        
    })
    
}
function enableEditNotes(editField, textField, todo) {
    editField.addEventListener("input", e => {
        textField.textContent = editField.value;
        todo.rewriteNotes(textField.textContent)
        
    })
    
}
function enableToggleCheckbox(body, marker, todo, textField) {
    body.addEventListener("click", e => {
        marker.classList.toggle("yes");
        todo.toggleChecklist(textField.textContent);

    })
}
function enableDeleteCheckbox(button, checkbox, todo, textField) {
    button.addEventListener("click", e => {
        todo.removeFromChecklist(textField.textContent);
        checkbox.remove();
    })
}
function enableModal(card, cardModal) {
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
}

function showCheckboxDialog(button, dialog, modal) {
    button.addEventListener("click", e => {
        e.stopPropagation();
        dialog.show();
    })
    dialog.addEventListener("click", e => {
        e.stopPropagation();
    })
    modal.addEventListener("click", e => {
        dialog.close();
    })
}
function closeErrorDialog(modal, dialog, error) {
    modal.addEventListener("click", e => {
        error.close();
    })
    dialog.addEventListener("click", e => {
        error.close();
    })

}
function enableCancelButton(button, textField, dialog) {
    button.addEventListener("click", e=> {
        textField.value = "";
        dialog.close();
    })
}
function enableConfirmButton(button, textfield, todo, errorDialog, checkboxDialog, createCheckbox) {
    button.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        const potentialError = todo.addToChecklist(textfield.value);
        if (potentialError) {
            showErrorDialog(errorDialog, potentialError)
        } else {
            createCheckbox(textfield.value);
            textfield.value = "";
            checkboxDialog.close();
        }
    })
}


export {showEditField, enableEditCheckbox, enableToggleCheckbox, enableDeleteCheckbox, enableEditNotes, enableModal, showCheckboxDialog, closeErrorDialog, enableCancelButton, enableConfirmButton}
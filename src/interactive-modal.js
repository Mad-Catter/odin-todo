import { showErrorDialog } from "./error-processor.js";
import { generator } from "./generator.js";
import { listOfTodos } from "./list.js";
const interactiveModal = {
     showEditField(button, editField, textField) {
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
    },
     enableEditCheckbox(editField, textField, todo, checkbox) {
        editField.addEventListener("input", e => {
            textField.textContent = editField.value;
            todo.rewriteChecklist(checkbox, textField.textContent)
            
        })
        
    },
     enableEditNotes(editField, textField, todo) {
        editField.addEventListener("input", e => {
            textField.textContent = editField.value;
            todo.rewriteNotes(textField.textContent)
            
        })
        
    },
     enableToggleCheckbox(body, marker, todo, textField) {
        body.addEventListener("click", e => {
            marker.classList.toggle("yes");
            todo.toggleChecklist(textField.textContent);

        })
    },
     enableDeleteCheckbox(button, checkbox, todo, textField) {
        button.addEventListener("click", e => {
            todo.removeFromChecklist(textField.textContent);
            checkbox.remove();
        })
    },
     enableModal(card, cardModal) {
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
    },

     showCheckboxDialog(button, dialog, modal) {
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
    },
     closeErrorDialog(modal, dialog, error) {
        modal.addEventListener("click", e => {
            error.close();
        })
        dialog.addEventListener("click", e => {
            error.close();
        })

    },
     enableCancelButton(button, textField, dialog) {
        button.addEventListener("click", e=> {
            textField.value = "";
            dialog.close();
        })
    },
     enableConfirmButton(button, textfield, todo, errorDialog, checkboxDialog, createCheckbox) {
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
        textfield.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                button.click();
            }
        })
    },
    preventCalendarScrolling(modal) {
        modal.addEventListener("wheel", e => {
            e.stopPropagation();
        })
    },
    enableCompleteButton(marker, box, todo, priority, dueBox) {
        box.addEventListener("click", e => {
            marker.classList.toggle("yes");
            todo.toggleCompletion();
            priority.textContent = todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1);
            priority.removeAttribute("class");
            priority.classList.add(`${todo.priority}-text`);
            if (dueBox) {
                dueBox.classList.toggle("hidden");
            }
            // complete-todos appears to be added twice for some reason but still gets removed with this single line.
            if (todo.folders.includes("all-todos")) {
                todo.folders.push("complete-todos");
                todo.folders.splice(todo.folders.indexOf("all-todos"),1);
            } else {
                todo.folders.push("all-todos");
                todo.folders.splice(todo.folders.indexOf("complete-todos"),1);
            }
            generator.generateFolderList();
        })
    },
    enableDeleteDialog(button, dialog, modal) {
        button.addEventListener("click", e => {
            e.stopPropagation();
            dialog.show();
        })
        modal.addEventListener("click", e => {
            dialog.close();
        })
        dialog.addEventListener("click", e=> {
            e.stopPropagation();
        })
    },
    enableDeleteDialogButtons(confirm, cancel, dialog, todo) {
        cancel.addEventListener("click", e => {
            dialog.close();
        })
        confirm.addEventListener("click", e => {
            for (const key in listOfTodos) {
                if (listOfTodos[key] === todo) {
                    delete listOfTodos[key];
                    break;
                }
            }
            generator.generateAll();
        })
    }
}

export {interactiveModal}
const dummyModal = document.querySelector(".dummy-modal");
const cardModal = document.querySelector(".card-modal");
dummyModal.addEventListener("click", e => {
    console.log("yes")
    cardModal.showModal();
});

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

const dummyCheckboxText = document.querySelector(".checkbox-text-a");
const dummyCheckboxInput = document.querySelector(".edit-input-a");
const editButton = document.querySelector(".edit-checkbox-a");
editButton.addEventListener("click", () => {
    if (dummyCheckboxInput.classList.contains("hidden")) {
        dummyCheckboxInput.value = dummyCheckboxText.textContent;
        dummyCheckboxInput.classList.toggle("hidden");
        dummyCheckboxText.classList.toggle("hidden");
        dummyCheckboxInput.focus();
    }
})
dummyCheckboxInput.addEventListener("keydown", e => {
    dummyCheckboxText.textContent = dummyCheckboxInput.value;
    if (e.key === "Enter") {
        dummyCheckboxInput.classList.add("hidden");
        dummyCheckboxText.classList.remove("hidden");
    }
})
dummyCheckboxInput.addEventListener("blur", () => {
    dummyCheckboxInput.classList.add("hidden");
    dummyCheckboxText.classList.remove("hidden");
})

const noteEditButton = document.querySelector(".note-edit-button");
const noteText = document.querySelector(".text-notes");
const noteEdit = document.querySelector(".edit-notes");

noteEditButton.addEventListener("click", () => {
    if (noteEdit.classList.contains("hidden")) {
        noteEdit.value = noteText.textContent;
        noteEdit.classList.toggle("hidden");
        noteText.classList.toggle("hidden");
        noteEdit.focus();
    }
})
noteEdit.addEventListener("keydown", e => {
    noteText.textContent = noteEdit.value;
    if (e.key === "Enter") {
        noteEdit.classList.add("hidden");
        noteText.classList.remove("hidden");
    }
})
noteEdit.addEventListener("blur", () => {
    noteEdit.classList.add("hidden");
    noteText.classList.remove("hidden");
})


const deleteButton = document.querySelector(".delete-checkbox-a")
const checkbox = document.querySelector(".checkbox-a")
deleteButton.addEventListener("click", e => {
    checkbox.remove();
})

const checkboxBody = document.querySelector(".checkbox-body-a");
const marker = document.querySelector(".marker-a");
checkboxBody.addEventListener("click", e => {
    marker.classList.toggle("yes");
})

const newCheckboxButton = document.querySelector(".new-checkbox-button");
const newCheckboxDialog = document.querySelector(".new-checkbox-dialog");


// 
const errorDialog = document.querySelector(".checkbox-error")
const body = document.querySelector("body");
const checkboxName = document.querySelector("#checkbox-name");
const checkboxConfirm = document.querySelector(".checkbox-confirm");
const checkboxCancel = document.querySelector(".checkbox-cancel");
newCheckboxButton.addEventListener("click", e => {
    e.stopPropagation();
    newCheckboxDialog.show();
})
newCheckboxDialog.addEventListener("click", e => {
    e.stopPropagation();
})
body.addEventListener("click", e => {
    newCheckboxDialog.close();
    errorDialog.close()
})

checkboxCancel.addEventListener("click", e => {
    checkboxName.value = "";
    newCheckboxDialog.close();
})
checkboxConfirm.addEventListener("click", e => {
    e.preventDefault();
    if ((checkboxName.value.toLowerCase() in listOfCheckboxs)) {
        e.stopPropagation();
        errorDialog.textContent = "A checkbox with that name already exists!"
        errorDialog.show();
    } else if (checkboxName.value === "") {
        e.stopPropagation();
        errorDialog.textContent = "You cant have a checkbox with no name!";
        errorDialog.show();
    } else{
        addToCheckboxList(checkboxName.value);
        checkboxName.value = "";
        newCheckboxDialog.close();
        errorDialog.close();
    }
    
})

export default {}
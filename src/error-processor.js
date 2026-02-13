function showErrorDialog (dialog, error) {
    if (error === "error: repeat") {
        dialog.textContent = "A checkbox with that name already exists!";
    } else if (error === "error: blank") {
        dialog.textContent = "You can't have a checkbox with no name!";
    } else {
        dialog.textContent = "Unknown error!";
    }
    dialog.show();
}

export {showErrorDialog}
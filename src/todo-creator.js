// Export Class that creates a todo object.
// This needs a title, a description, a priority level, duedate, notes, and checklist (object with values set to true or false).
// Questions to decide
// Character limit on title?  How long should a title be.
// How should I go about the due date?  Do I use the date object even though it will be removed with json.
// 
export default class Todo {
    complete = false;
    constructor(title, desc, priority, dueDate, notes, checklist, folders) {
        this.title = title;
        if (desc) {
            this.desc = desc;
        }
        if (priority) {
            this.priority = priority;
        }
        if (dueDate) {
            this.dueDate = dueDate;
        }
        if (notes) {
            this.notes = notes;
        }
        if (checklist) {
            this.checklist = checklist;
        }
        if (folders) {
            this.folders = folders
        }
    }
    addToChecklist(check) {
        if (check in this.checklist) {
            return "error: repeat"
        } else if (check === "") {
            return "error: blank"
        } else {
            this.checklist[check] = false;
            return ""
        }
    }
    toggleChecklist(check) {
        if (this.checklist[check] === false) {
            this.checklist[check] = true;
        } else {
            this.checklist[check] = false; 
        }
    }
    rewriteChecklist(check, content) {
        this.checklist[check] = content;
    }
    removeFromChecklist(check) {
        delete this.checklist[check];
    }
    rewriteNotes(content) {
        this.notes = content;
    }
}
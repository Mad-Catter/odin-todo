// Export Class that creates a todo object.
// This needs a title, a description, a priority level, duedate, notes, and checklist (object with values set to true or false).
export default class Todo {
    complete = false;
    oldPriority = "";
    constructor(title, desc, priority, dueDate, time, notes, checklist, folders, ) {
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
        if (time) {
            this.time = time;
        }
        if (notes) {
            this.notes = notes;
        }
        if (checklist) {
            this.checklist = checklist;
        }
        if (folders) {
            this.folders = folders;
            folders.push("all-todos");
        }
        
    }
    addToChecklist(check) {
        if ((this.checklist !== "") && (check in this.checklist)) {
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
    toggleCompletion() {
        if (!this.complete) {
            this.complete = true;
            this.folders.push("complete-todos");
            this.oldPriority = this.priority;
            this.priority = "complete";
        } else {
            this.complete = false;
            this.folders.splice(this.folders.indexOf("complete-todos"),1);
            this.priority = this.oldPriority;
            this.oldPriority = "";
        }
    }
    isComplete() {
        if (this.complete) {
            return true
        } else {
            return false
        }
    }
}
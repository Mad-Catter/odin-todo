import Todo from "./todo-creator.js";
export function retrieveFolders(list) {
    let folders = {
        "My First Folder": "My First Folder",
        "My Second Folder": "My Second Folder",
    }
    try {
        if (localStorage.getItem("listOfFolders") !== null) folders = JSON.parse(localStorage.getItem("listOfFolders"));
    } catch (e) {
        console.error(e);
    }
    Object.assign(list,folders)
}
export function retriveTodos(list) {
    let todos = {
        trial: new Todo("Make Todo List",
                "This involves coding a todo list",
                "urgent",
                "2-6-2026",
                "3:20pm",
                "Notes are the true notes.  This is a very deep statment.  Trust me.  Im not just typing things randomly.  Youre typing things randomly.",
                {webpack: true,
                 class: true,
                 everythingElse: false,
                },
               ["my-first-folder"]
            ),
            secondTrial: new Todo("Making Fake Todo Lists",
                "This involes typing nonsense",
                "unimportant",
                "2-6-2026",
                "5:00am",
                "",
                {
            
                },
                ["my-second-folder"],
            ),
            thirdTrial: new Todo("Finishing The program",
                "This involves more work than I though",
                "undefined",
                "2-27-2026",
                "",
                "",
                {
            
                },
                [],
            )
    }
    const todoMethods = {
        addToChecklist(check) {
            if ((this.checklist !== "") && (check in this.checklist)) {
                return "error: repeat"
            } else if (check === "") {
                return "error: blank"
            } else {
                this.checklist[check] = false;
                return ""
            }
        },
        toggleChecklist(check) {
            if (this.checklist[check] === false) {
                this.checklist[check] = true;
            } else {
                this.checklist[check] = false; 
            }
        },
        rewriteChecklist(check, content) {
            this.checklist[check] = content;
        },
        removeFromChecklist(check) {
            delete this.checklist[check];
        },
        rewriteNotes(content) {
            this.notes = content;
        },
        toggleCompletion() {
            if (!this.complete) {
                this.complete = true;
                this.folders.push("complete-todos");
                this.oldPriority = this.priority;
                this.priority = "complete";
            } else {
                this.complete = false;
                this.folders.splice(this.folders.indexOf("complete-todos"),1)
                this.priority = this.oldPriority;
                this.oldPriority = "";
            }
        },
        isComplete() {
            if (this.complete) {
                return true
            } else {
                return false
            }
        },
    }
    try {
        if (localStorage.getItem("listOfTodos") !== null) todos = JSON.parse(localStorage.getItem("listOfTodos"));
        const todoKeys = Object.keys(todos);
        for (let i = 0; i < todoKeys.length; i++) {
            Object.assign(todos[todoKeys[i]], todoMethods);
        }
    } catch (e) {
        console.error(e);
    }
    Object.assign(list,todos)
}
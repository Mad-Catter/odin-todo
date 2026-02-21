import Todo from "./todo-creator.js";

const listOfFolders = {
    "My First Folder": [],
    "My Second Folder": [],
};
const listOfTodos = {

};
const listOfActiveFolders = {
    "all-todos" : "all-todos",
}
const trial = new Todo("Make Todo List",
     "This involves coding a todo list",
     "urgent",
     "2-6-2026",
     "3:20pm",
     "Notes are the true notes.  This is a very deep statment.  Trust me.  Im not just typing things randomly.  Youre typing things randomly.",
     {webpack: true,
      class: true,
      everythingElse: false,
     },
    ["non-urgents"]
);
const secondTrial = new Todo("Making Fake Todo Lists",
    "This involes typing nonsense",
    "unimportant",
    "2-6-2026",
    "5:00am",
    "",
    {

    },
    [],
)
const thirdTrial = new Todo("Finishing The program",
    "This involves more work than I though",
    "undefined",
    "2-27-2026",
    "",
    "",
    {

    },
    [],
)
// Think this need to be changed.  It is not very OOP
listOfTodos.trial = trial;
listOfTodos.secondTrial = secondTrial;
listOfTodos.thirdTrial = thirdTrial;
export {listOfFolders, listOfTodos, listOfActiveFolders}
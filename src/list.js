import { retrieveFolders, retriveTodos } from "./retrieve-storage.js";
const listOfFolders = {
};
const listOfTodos = {

};
const listOfActiveFolders = {
    "all-todos" : "all-todos",
}
retrieveFolders(listOfFolders);
retriveTodos(listOfTodos);
export {listOfFolders, listOfTodos, listOfActiveFolders}
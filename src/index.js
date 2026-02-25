import "./style.css"
import "./interactive-buttons.js";
import "./calendar-buttons.js";
import "./new-todo-modal.js"
import { generator } from "./generator.js";
import { enableDefaultFolders } from "./interactive-folders.js";

enableDefaultFolders();
generator.generateAll();
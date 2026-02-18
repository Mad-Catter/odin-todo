import { generator } from "./generator.js";
const leftButton = document.querySelector(".left")
const rightButton = document.querySelector(".right")
const calendarViewer = document.querySelector(".calendar-viewer");

leftButton.addEventListener("click", e => {
    generator.generateCalendar("decrease");
});
rightButton.addEventListener("click", e => {
    generator.generateCalendar("increase");
});

calendarViewer.addEventListener("wheel", e => {
    if (e.deltaY < 0) {
        generator.generateCalendar("decrease");
    } else if (e.deltaY > 0) {
        generator.generateCalendar("increase");
    }
});

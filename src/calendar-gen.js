import {getDay, startOfMonth, getDaysInMonth, setDate} from "date-fns"

// Function checks current date.
// Checks what weekday the first day of the month is and how many days are in the month.
// The function then will make an array? with the required amount of blank(or numbered?) items until the first day of the calendar is the proper day.
// It will then make the required amount of days for the month, giving each day a p element with its number, and a class equal to the date it represents.
const now = new Date();
function generateMonthArray(date) {
    let firstDay = getDay(startOfMonth(date));
    let totalDays = getDaysInMonth(date);
    let monthArray = [];
    for (let i = 0; i < firstDay; i++) {
        monthArray.push("")
    };
    for (let i = 0; i < totalDays; i++) {
        monthArray.push({
            dayDate: i + 1,
            fullDate: setDate(date, i+1).toLocaleDateString().replaceAll("/","-"),
        })
    }
    return monthArray
}
export {generateMonthArray}
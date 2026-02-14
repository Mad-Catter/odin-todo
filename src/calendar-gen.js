import {getDay, startOfMonth, getDaysInMonth, setDate} from "date-fns"
// The function takes a date object and then checks what weekday the first day of the month is and how many days are in the month.
// The function then will make an array with the required amount of blank items until the first day of the calendar is the proper day.
// It will then make the required amount of days for the month, each day represented by a string that can be turned into a css class.
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
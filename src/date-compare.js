import { differenceInCalendarDays, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears,  } from "date-fns";

export function compareDates(date, time) {
    const now = new Date();
    const years = differenceInYears(date, now);
    if (years > 0) {
        if (years === 1) {
            return "Due: Next Year"
        } else {
            return `Due: in ${years} years`
        }
    } else if (years < 0) {
        if (years === -1) {
            return "Due: Last Year"
        } else {
            return `Due: ${years * -1} years ago`
        }
    }
    const months = differenceInMonths(date, now);
    if (months > 0) {
        if (months === 1) {
            return "Due: Next Month"
        } else {
            return `Due: in ${months} months`
        }
    } else if (months < 0) {
        if (months === -1) {
            return "Due: Last month"
        } else {
            return `Due: ${months * -1} months ago`
        }
    }
  
    
    const weeks = differenceInWeeks(date, now);
    if (weeks > 0) {
        if (weeks === 1) {
            return "Due: Next Week"
        } else {
            return `Due: in ${weeks} weeks`
        }
    } else if (weeks < 0) {
        if (weeks === -1) {
            return "Due: Last week"
        } else {
            return `Due: ${weeks * -1} weeks ago`
        }
    }
    const days = differenceInCalendarDays(date, now);
    if (days > 0) {
        if (days === 1) {
            return "Due: Tomorrow"
        }  else {
            return `Due: in ${days} days`
        }
    } else if ((days === 0) && (!time)) { 
        return "Due: Today"
    } else if (days < 0) {
        if (days === -1) {
            return "Due: Yesterday"
        } else {
            return `Due: ${days * -1} days ago`
        }
    }
    if (time) {
        
        let timeHours = Number(time.split(":")[0])
        if (time.includes("pm")) timeHours += 12;
        console.log(now.getHours)
        const hours = timeHours - now.getHours()
        if (hours > 0) {
            if (hours === 1) {
                return "Due: Next Hour"
            } else {
                return `Due: in ${hours} hours`
            }
        } else if (hours === 0) {
            return "Due: This Hour"
        } else if (hours < 0) {
            if (hours === -1) {
                return "Due: Last hour"
            } else {
                return `Due: ${hours * -1} hours ago`
            }
        } 
    }
    return "Due: Unknown"
}
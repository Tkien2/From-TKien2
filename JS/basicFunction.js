import * as animation from './animation.js'

export const WARNING = 0
export const SUCCESS = 1
export const INFO = 2
export async function showNotification(type, message, durationInSec){
    const notification = document.getElementById("notification")
    const notificationIcon = document.getElementById("notificationIcon")
    const notificationMessage = document.getElementById("notificationMessage")
    notificationMessage.innerHTML = message
    if(type == WARNING){
        notificationIcon.style.color = `var(--red)`
        notificationIcon.innerHTML = "warning"
    } else if(type == SUCCESS){
        notificationIcon.style.color = `var(--green)`
        notificationIcon.innerHTML = "check"
    } else if(type == INFO){
        notificationIcon.style.color = `var(--blue)`
        notificationIcon.innerText = "lightbulb_2"
    }
    notification.style.display = "flex"
    await animation.playFadeIn(notification, "flex", 0.3, 0)
    await wait(durationInSec)
    await animation.playFadeOut(notification, 0.3, 0)
    return
}
export function isElementReached(element){
    const pageY = window.scrollY + Math.round(window.innerHeight*0.6)
    const elementY = element.offsetTop
    
    return pageY>=elementY
}
export async function wait(seconds){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        }, seconds*1000)
    })
}
export function scrollToBottom(){
    window.scroll({
        top: document.querySelector("body").offsetHeight,
        left: 0,
        behavior: 'smooth'
    })
}
export function scrollToElement(element){
    window.scroll({
        top: element.offsetTop - 50,
        left: 0,
        behavior: 'smooth'
    })
}
export function getDateFromUnixTimeStamp(unixTimeStampInSec){
    return new Date(unixTimeStampInSec*1000)
}
export function getYearFromUnixTimeStamp(unixTimeStampInSec){
    return getDateFromUnixTimeStamp(unixTimeStampInSec).getFullYear()
}
export function getMonthFromUnixTimeStamp(unixTimeStampInSec){
    return getDateFromUnixTimeStamp(unixTimeStampInSec).getMonth() + 1
}
export function getDayFromUnixTimeStamp(unixTimeStampInSec){
    return getDateFromUnixTimeStamp(unixTimeStampInSec).getDate()
}
function isLeapYear(year){
    if(year%4 == 0 && year%100 !==0 || year%400 == 0){
        return true
    } else{
        return false
    }
}
function numberOfLeapYearsBetween2Years(year1, year2){
    let n1 = Math.floor(year2/4) - Math.floor(year2/100) + Math.floor(year2/400)
    let n2 = Math.floor((year1 - 1)/4) - Math.floor((year1 - 1)/100) + Math.floor((year1 - 1)/400)
    return n1 - n2
}
/**
 * 
 * @param {*} date1 trước
 * @param {*} date2 sau
 * @returns {Array} có dạng [Years, Months, Days]
 */
export function getTimeFrom2Dates(unixTime1, unixTime2){
    const year1 = getYearFromUnixTimeStamp(unixTime1)
    const year2 = getYearFromUnixTimeStamp(unixTime2)
    const leapYears = numberOfLeapYearsBetween2Years(year1, year2)
    const secondsPassed = unixTime2 - unixTime1
    let yearsPassed = (secondsPassed - (24*3600*366*leapYears))/(3600*24*365) + leapYears
    let monthsPassed = (yearsPassed - Math.floor(yearsPassed))*12
    let daysPassed = (monthsPassed - Math.floor(monthsPassed))*30
    return [Math.floor(yearsPassed), Math.floor(monthsPassed), Math.floor(daysPassed)]
}
document.addEventListener("scroll", ()=>{
    if(window.scrollX > 0){
        window.scrollTo(0, window.scrollY)
    }
})
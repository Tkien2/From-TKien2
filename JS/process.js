import * as passwordFunc from './password.js'
import * as userData from './userData.js'
import * as basicFunction from './basicFunction.js'
import * as animation from './animation.js'
const notification = document.getElementById("notification")
export const checkPasswordButton = document.getElementById("checkPassword")
function getUserIndex(userPassword){
    for(let i = 0; i<userData.userList.length; i++){
        if(userPassword == userData.userList[i].pass){
            return i
        }
    }
    console.log("wtf bro?")
    return null
}
function showTimeline(){
    const clouds = document.getElementById("timelineCloud")
    const timelineHeading = document.getElementById("timelineHeadingWrapper")
    clouds.classList.remove("hide")
    timelineHeading.classList.remove("hide")
}
async function setData(user){
    const yearOfBirth = basicFunction.getYearFromUnixTimeStamp(user.birthdayUnixInSec)
    const monthOfBirth = basicFunction.getMonthFromUnixTimeStamp(user.birthdayUnixInSec)
    const dayOfBirth = basicFunction.getDayFromUnixTimeStamp(user.birthdayUnixInSec)
    document.getElementById("birthDate").innerText = `${dayOfBirth}/${monthOfBirth}/${yearOfBirth}`

    const yearFirstMet = basicFunction.getYearFromUnixTimeStamp(user.timeFirstMet)
    const monthFirstMet = basicFunction.getMonthFromUnixTimeStamp(user.timeFirstMet)
    const dayFirstMet = basicFunction.getDayFromUnixTimeStamp(user.timeFirstMet)
    document.getElementById("meetDate").innerText = `${dayFirstMet}/${monthFirstMet}/${yearFirstMet}`

    const yearTillMeet = basicFunction.getTimeFrom2Dates(user.birthdayUnixInSec, user.timeFirstMet)[0]
    const monthTillMeet = basicFunction.getTimeFrom2Dates(user.birthdayUnixInSec, user.timeFirstMet)[1]
    let yearTillMeetString = `${yearTillMeet}`
    if (monthTillMeet >= 8){
        yearTillMeetString = "gần " + `${yearTillMeet + 1}`
    } else if(monthTillMeet >= 5 ){
        yearTillMeetString = "hơn " + `${yearTillMeet}`
    }
    document.getElementById("yearTillMeet").innerText = yearTillMeetString

    const yearSpec = basicFunction.getYearFromUnixTimeStamp(user.specTime)
    const monthSpec = basicFunction.getMonthFromUnixTimeStamp(user.specTime)
    const daySpec = basicFunction.getDayFromUnixTimeStamp(user.specTime)
    document.getElementById("differentEventDate").innerText = `${daySpec}/${monthSpec}/${yearSpec}`

    document.getElementById("differentEventDecs").innerText = `${user.specDecs}`

    const currentYear = basicFunction.getYearFromUnixTimeStamp(Date.now()/1000)
    const currentMonth = basicFunction.getMonthFromUnixTimeStamp(Date.now()/1000)
    const currentDay = basicFunction.getDayFromUnixTimeStamp(Date.now()/1000)
    document.getElementById("currentDate").innerText = `${currentDay}/${currentMonth}/${currentYear}`

    const friendTime = basicFunction.getTimeFrom2Dates(user.timeFirstMet, Date.now()/1000)
    let friendTimeString = ""
    console.log(friendTime)
    if(friendTime[0] != 0){
        friendTimeString += `${friendTime[0]} năm`
    }
    if(friendTime[1] != 0){
        friendTimeString += ` ${friendTime[1]} tháng`
    }
    if(friendTime[2] != 0){
        friendTimeString += ` và ${friendTime[2]} ngày`
    }
    document.getElementById("friendTime").innerText = friendTimeString

    document.getElementById("userName").innerText = user.name
}
/**
 * 
 * @returns userIndex 🗿
 */
export async function checkPassword(){
    const password = document.getElementById("password").value
    const hashedPassword = passwordFunc.encryptPassword2(password)
    const userIndex = getUserIndex(hashedPassword)
    const passwordArea = document.getElementById("passwordArea")
    if(userIndex != null){
        await animation.playFadeOut(passwordArea,1 , 0.5, false)
        passwordArea.style.opacity = 0
        passwordArea.style.scale = 0
        await setData(userData.userList[userIndex])
        basicFunction.showNotification(basicFunction.SUCCESS, `${userData.userList[userIndex].name} hả?`, 2)
        await basicFunction.wait(2.5)
        await basicFunction.showNotification(basicFunction.INFO, "Cuộn xuống đi :)", 2)
        showTimeline()
        return userIndex
    } else{
        basicFunction.showNotification(basicFunction.WARNING, "Sai mật khẩu!", 2)
        return null
    }
}

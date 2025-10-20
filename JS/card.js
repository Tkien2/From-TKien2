import { wait } from "./basicFunction.js"
import { playFadeIn, playFadeOut, playShrink, displayNoneForElements } from "./animation.js"
//"const card 🍷🗿"
const card = document.getElementById("card")
const message = document.getElementById("message")
const dot = document.getElementById("newCircle")
const avatar = document.getElementById("avatar")
const title = document.getElementById("title")
function resizeCard(){
    card.style.height = `${message.offsetHeight + title.offsetHeight}px`
}
//Bành trướng "card" 🍷🗿
export async function cardExpansion(){
    card.style.opacity = 1
    card.style.width = "300px"
    card.style.maxWidth = `calc(100% - 60px)`
    card.style.height = "auto"
    await wait(0.5)
    dot.style.width = "20px"
    dot.style.height = "20px"
}
export async function showCardMessage(messageText){
    card.style.minHeight = card.offsetHeight
    card.style.minWidth = card.offsetWidth
    playShrink(dot, 0.3, 0, false)
    await playShrink(avatar, 0.3, 0, false)
    await wait(0.5)
    displayNoneForElements([avatar, dot])
    message.innerHTML = messageText
    card.style.justifyContent = "flex-start"
    card.style.padding = "40px 30px"
    card.style.width = `calc(100% - 60px) !important`
    resizeCard()
    playFadeIn(message, "block", 0.5, 0)
    await playFadeIn(title, "block", 0.5, 0)
    title.style.opacity = 1
}
export async function showNewCardMessage(messageText){
    await playFadeOut(message, 0.3, 0, false)
    message.style.opacity = 0
    await wait(0.5)
    message.innerHTML = messageText
    resizeCard()
    await playFadeIn(message, "block", 0.5, 0)
    message.style.opacity = 1
}
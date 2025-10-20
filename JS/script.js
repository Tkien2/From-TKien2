import * as basicFunction from './basicFunction.js'
import * as animation from './animation.js'
import * as userData from './userData.js'
import * as card from './card.js'
import * as process from './process.js'
// Chưa module hoá hết file củ lìn này nữa 😭🙏
const timelineWrapper = document.getElementById("main--timeline")
const timeline = document.getElementById("timeline")
const postTimelineWrapper = document.getElementById("postTimelineHeadingWrapper")
const cardCloud = document.getElementById("cardCloud")
const cardWrapper = document.getElementById("cardWrapper")
let userIndex = null
let userMessages = null
// CheckPassword
process.checkPasswordButton.addEventListener("click", async ()=>{
    let index = await process.checkPassword()
    if(index !== null){
        userIndex = index
        userMessages = userData.userList[userIndex].messages
    }
})
function removeHideClass(listOfElements = []){
    for (let i = 0; i<listOfElements.length; i++){
        listOfElements[i].classList.remove("hide")
    }
}
// List Element xuất hiện khi cuộn
// Thứ tự từ trên xuống
let elementFadeInWhenReach = [
    {
        element: document.getElementById("timelineHeading"),
        wrapper: document.getElementById("timelineHeadingWrapper"),
        isAppeared: false,
    },
    {
        element: document.getElementById("timeline"),
        timeEvents: document.querySelectorAll(".timeline__events"),
        isAppeared: false,
    },
    {
        element: document.getElementById("postTimelineHeading"),
        wrapper: document.getElementById("postTimelineHeadingWrapper"),
        isAppeared: false,
    },
    {
        element: cardWrapper,
        isAppeared: false,
    }
]
let elementFadeInIndex = 0
async function animationTextForTimelineHeading(){
    const timelineHeading = elementFadeInWhenReach[0].element
    const timelineHeadingWrapper = elementFadeInWhenReach[0].wrapper

    await basicFunction.wait(1)

    await animation.playFadeOut(timelineHeading, 1, 0)
    timelineHeading.innerText = "Cùng nhìn lại những sự kiện đã xảy ra nào"
    await animation.playFadeIn(timelineHeading, "block", 1, 0)

    await basicFunction.wait(3)

    await animation.playFadeOut(timelineHeading, 1, 0)
    timelineHeadingWrapper.style.display = "none"
    removeHideClass([timelineWrapper])
    basicFunction.scrollToElement(timeline)
}
let userMessageIndex = 0
async function cardFunction(){
    await card.cardExpansion()
    console.log("Expanded!");
    
    await basicFunction.wait(2)
    removeHideClass([document.getElementById("navArrow")])
    await card.showCardMessage(userMessages[userMessageIndex])
}
async function animationTextForPostTimelineHeading(){
    const postTimelineHeading = elementFadeInWhenReach[2].element
    const postTimelineHeadingWrapper = elementFadeInWhenReach[2].wrapper
    await basicFunction.wait(2)

    await animation.playFadeOut(postTimelineHeading, 1, 0)
    postTimelineHeading.innerText = "Mấy ai biết trước tương lai nhể?"
    await animation.playFadeIn(postTimelineHeading, "block", 0.5, 0)

    await basicFunction.wait(4)

    await animation.playFadeOut(postTimelineHeading, 0.5, 0)
    postTimelineHeading.innerText = "Tui cũng vậy thôi"
    await animation.playFadeIn(postTimelineHeading, "block", 0.5, 0)

    await basicFunction.wait(2.5)

    await animation.playFadeOut(postTimelineHeading, 0.5, 0)
    postTimelineHeading.innerText = "Có lẽ chỉ có thời gian mới có thể trả lời..."
    await animation.playFadeIn(postTimelineHeading, "block", 0.5, 0)

    await basicFunction.wait(3)

    await animation.playFadeOut(postTimelineHeading, 0.5, 0)
    postTimelineHeading.innerText = "..."
    await animation.playFadeIn(postTimelineHeading, "block", 0.5, 0)

    await basicFunction.wait(2.5)

    await animation.playFadeOut(postTimelineHeading, 0.5, 0)
    postTimelineHeading.innerText = "Vào chủ đề chính nào"
    await animation.playFadeIn(postTimelineHeading, "block", 0.5, 0)

    await basicFunction.wait(3)

    await animation.playFadeOut(postTimelineHeading, 1, 0, false)
    postTimelineHeadingWrapper.style.opacity=0
    await basicFunction.wait(1.5)
    basicFunction.showNotification(basicFunction.INFO, "Cuộn tiếp nè", 2)
    removeHideClass([cardCloud,cardWrapper])
}
async function animationTimeline(){
    const timeline = elementFadeInWhenReach[1].element
    const timeEvents = elementFadeInWhenReach[1].timeEvents

    await basicFunction.wait(1)

    animation.resizeParentElement(timeline, timeEvents, false, true)
    await animation.playFadeIn(timeline, "flex", 1, 0)
    for(let i = 0; i < timeEvents.length; i++){
        await basicFunction.wait(2.5)
        await animation.playFadeIn(timeEvents[i], "flex", 0.5, 0)
    }
    timeline.style.position = "relative"
    await basicFunction.wait(1.5)
    await basicFunction.showNotification(basicFunction.INFO, "Cuộn xuống đi nè", 2)
    removeHideClass([postTimelineWrapper])
} 
// Nah, function cho eventlistener th
async function fadeInCurrentElement(currentElement){
    if(currentElement != elementFadeInWhenReach[3].element){
        animation.playFadeIn(currentElement, "block", 1, 0.3)
        setTimeout(()=>{
            currentElement.style.opacity = 1
        }, 1000)
    } else{
        await basicFunction.wait(1)
        cardFunction()
    }
    
    elementFadeInWhenReach[elementFadeInIndex].isAppeared = true
}
document.addEventListener("scroll", ()=>{
    if(elementFadeInIndex < elementFadeInWhenReach.length){
        // không dùng for để tránh check element không cần thiết
        if(elementFadeInWhenReach[elementFadeInIndex].isAppeared === false){
            const currentElement = elementFadeInWhenReach[elementFadeInIndex].element
            if(basicFunction.isElementReached(currentElement)){
                (async()=>{
                    await fadeInCurrentElement(currentElement)
                    // phân loại element
                    if(currentElement == elementFadeInWhenReach[0].element){
                        await basicFunction.wait(3)
                        await animationTextForTimelineHeading()
                    } else if(currentElement == elementFadeInWhenReach[1].element){
                        await animationTimeline()
                    } else if(currentElement == elementFadeInWhenReach[2].element){
                        await basicFunction.wait(2)
                        await animationTextForPostTimelineHeading()
                    }
                    // element kế tiếp
                    elementFadeInIndex++
                })()
            }
        }    
    }
})
// Message
const prevMessage = document.getElementById("previousMessage")
const nextMessage = document.getElementById("nextMessage")
function showNextMessage(){
    if(userMessageIndex < userMessages.length){
        userMessageIndex++
        card.showNewCardMessage(userMessages[userMessageIndex])
    }
}
function showPrevMessage(){
    if(userMessageIndex >= 0){
        userMessageIndex--
        card.showNewCardMessage(userMessages[userMessageIndex])
    }
}
function hideNavArrow(){
    if(userMessageIndex==0){
        prevMessage.style.scale = 0
        nextMessage.style.scale = 1
    } else{
        prevMessage.style.scale = 1
    }
    if(userMessageIndex == userMessages.length - 1){
        nextMessage.style.scale = 0
        prevMessage.style.scale = 1
    } else{
        nextMessage.style.scale = 1
    }
}
prevMessage.addEventListener("click", ()=>{
    showPrevMessage()
    hideNavArrow()
})
nextMessage.addEventListener("click", ()=>{
    showNextMessage()
    hideNavArrow()
})
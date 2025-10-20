import { wait } from './basicFunction.js'
export function displayNoneForElements(listOfELement){
    for(let i = 0; i<listOfELement.length; i++){
        listOfELement[i].style.display = "none"
    }
    return
}
export async function playAnimation(element, animationClassName, durationInSec, displayTypeAfterAnimation, delayInSec){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            element.style.animationDuration = `${durationInSec}s`
            element.classList.add(`${animationClassName}`)
            setTimeout(()=>{
                element.classList.remove(`${animationClassName}`)
                element.style.display = `${displayTypeAfterAnimation}`
                resolve()
            }, durationInSec*1000)
        },delayInSec*1000)
    })
}
export async function playFadeIn(element, blockOrFlex, durationInSec, delayInSec){
    element.style.opacity = 0
    element.style.display = blockOrFlex
    playAnimation(element, "FadeIn", durationInSec, blockOrFlex, delayInSec)
    setTimeout(()=>{
        element.style.opacity = 1
        return
    }, durationInSec*1000)
}
export async function playFadeOut(element, durationInSec, delayInSec, displayNoneAfterAnimation = true){
    if(displayNoneAfterAnimation){
        await playAnimation(element, "FadeOut", durationInSec, "none", delayInSec)
    } else{
        await playAnimation(element, "FadeOut", durationInSec, element.style.display, delayInSec)
    }
    return
}
export async function playShrink(element, durationInSec, delayInSec, displayNoneAfterAnimation = true){
    if(displayNoneAfterAnimation){
        await playAnimation(element, "Shrink", durationInSec, "none", delayInSec)
    } else{
        await playAnimation(element, "Shrink", durationInSec, element.style.display, delayInSec)
    }
    element.style.scale = 0
    return
}
/**
 * Resize kích thước giúp kích thước được thay đổi mượt mà
 * @param {*} parentElement 
 * @param {*} childElement nếu có nhiều phần tử con thì childElement sẽ nhận list [childElement_1, childElement_2,..., childElement_n]
 * @param {*} isWidthResized mặc định là false
 * @param {*} isMultipleChildElement mặc định là false
 */
export async function resizeParentElement(parentElement, childElement, isWidthResized = false, isMultipleChildElement = false){
    if(!isMultipleChildElement){
        parentElement.style.height = `${childElement.offsetHeight}px`
        if(isWidthResized){
            parentElement.style.width = `${childElement.offsetWidth}px`
        }
    } else{
        let totalChildElementHeight = 0
        let maxWidth = 0
        for(let i = 0; i<childElement.length; i++){
            totalChildElementHeight += childElement.offsetHeight
            if(isWidthResized){
                if(childElement.offsetWidth > maxWidth){maxWidth = childElement.offsetWidth}
            }
        }
        parentElement.style.height = `${totalChildElementHeight}px`
        if(isWidthResized){
            parentElement.style.width = `${maxWidth}px`
        }
    }
}
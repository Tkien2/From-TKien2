const backgroundElement = document.getElementById("background")
function createDefaultClouds(coordinatesListInPercentage){
    for(let i = 0; i<coordinatesListInPercentage.length; i++){
        const cloud = document.createElement("div")
        cloud.classList.add("cloud")
        const cloudX = coordinatesListInPercentage[i][0]
        const cloudY = coordinatesListInPercentage[i][1]
        backgroundElement.appendChild(cloud)
        cloud.style.left = `${cloudX}vw`
        cloud.style.top = `${cloudY}vh`

        for(let j = 1; j <= 3; j++){
            const cloudBall = document.createElement("div")
            cloudBall.classList.add(`cloud__ball${j}`, `cloud__ball`)
            cloud.appendChild(cloudBall)
        }
    }
}
function createStars(starDensity){
    const pageArea = window.innerHeight*window.innerWidth
    const numberOfStars = Math.round(pageArea/15000*starDensity)
    const sizeList = [3,2,3,3,2,4,5]
    const maxFinishTimeInMiliSec = 15000
    for(let i = 0; i<numberOfStars; i++){
        setTimeout(()=>{
            const star = document.createElement("div")
            star.classList.add("star")
            backgroundElement.appendChild(star)
            const starSize = sizeList[Math.round(Math.random()*(sizeList.length - 1))]
            
            star.style.width = `${starSize}px`
            star.style.height = `${starSize}px`

            star.style.top = `${Math.round(Math.random()*window.innerHeight)}px`
            star.style.left = `${Math.round(Math.random()*window.innerWidth)}px`
        },Math.random()*maxFinishTimeInMiliSec)
    }
}
createDefaultClouds([[-2,25],[70, 67],[10, 80],[90, 30], [38, 45]])
createStars(2)
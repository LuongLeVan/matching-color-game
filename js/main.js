import { GAME_STATUS, GAME_TIME, PAIRS_COUNT } from './constants.js'
import { getRandomColorPairs } from './utils.js'
import { getColorElementList, getColorListElement, getSectionElement, getInActiveColorList, getPlayAgainButton, getTimerElement } from './selectors.js'

// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click
function handleClick(liElement) {
    const getAllLiElement = getColorElementList()
    const shouldBlockElement = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus)
    if(!liElement || shouldBlockElement ) return 

    liElement.classList.add('active')

    selections.push(liElement)

    if(selections.length < 2 ) return ;

    const first = selections[0].dataset.color
    const second = selections[1].dataset.color
    const isMatch = first === second

    
    //handle event double click
    if(getAllLiElement[first] === getAllLiElement[second]) {
      
       
    }
    if(isMatch){
        //check win
        selections[0].dataset.match = 'match'
        selections[1].dataset.match = 'match'
        const getAllLiElement = getColorElementList()
        getAllLiElement.forEach(element => {
            if (element.getAttribute('data-match')) {
                element.addEventListener('click', (e)=>{
                   e.stopPropagation()
                   e.stopImmediatePropagation()
                   e.preventDefault()
                })
            }
        })
        const isWin = getInActiveColorList()
        const showElement = getTimerElement()
        if(isWin.length === 0){
            //show message win
            const buttonPlay = getPlayAgainButton()
            buttonPlay.classList.add('show')
        }

        //change background allow the color match
        const getSection = getSectionElement()
        getSection.style.backgroundColor = selections[0].dataset.color
        
        selections = []
       return
    }

    gameStatus = GAME_STATUS.BLOCKING
    setTimeout(() => {
        selections[0].classList.remove('active')
        selections[1].classList.remove('active')

        //reset selections 
        selections = []
        gameStatus = GAME_STATUS.PLAYING
    }, 1000);

   
}


//hanlde click event button replay 
function handleClickEventButton(){
    const buttonReplay = getPlayAgainButton()
    buttonReplay.addEventListener('click', (e)=>{
        window.location.href = ''
    })

}

// handle timing remaining 
function handleTiming(){
    const getTimeElement = getTimerElement()
    var seconds = GAME_TIME //30 seconds
    setInterval(() => {
        seconds--
    
        if(seconds < 10 ) seconds = `0${seconds}`
        if(seconds > 0 && document.querySelectorAll('#colorList > li:not(.active)').length !== 0){
             var output = `Time Remaining : ${seconds}s `
            getTimeElement.textContent = output
        }

       if(seconds == 0) {
            const buttonPlay = getPlayAgainButton()
            buttonPlay.classList.add('show')
            gameStatus = GAME_STATUS.BLOCKING
           
        }
        if(seconds > 0 && document.querySelectorAll('#colorList > li:not(.active)').length === 0  ){
            var output = 'You Win!'
            getTimeElement.textContent = output
            gameStatus = GAME_STATUS.BLOCKING
            
        }
        if(seconds <= 0 && document.querySelectorAll('#colorList > li:not(.active)').length !== 0)
        {
            var output = 'Game Over!'
            getTimeElement.textContent = output
            gameStatus = GAME_STATUS.BLOCKING

        }

       
    
    },1000)
   
}
 

function getRandomColor() {
    const getColor =  getRandomColorPairs(PAIRS_COUNT)

    const liElementList = getColorElementList()
    liElementList.forEach((liElement, index)=>{
        liElement.dataset.color = getColor[index]
        const divElement = liElement.querySelector('.overlay')
        divElement.style.backgroundColor = getColor[index]
    })
}

function attachEventClick() {
    const ulListElement = getColorListElement()
    ulListElement.addEventListener('click', (event) =>{
        handleClick(event.target)
    })
}
//main
(()=>{
    getRandomColor()
    attachEventClick()
    //count down
    handleTiming()
    //replay button
    handleClickEventButton()
 })()
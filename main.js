//VARIABLES
//total pixels of game board
const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT**2

//score keeping
let totalFoodEaten = 0
let totalDistanceTraveled = 0
//game board 
const gameContainer = document.getElementById('gameContainer')
//game pixels, returns a live collection that's a list of all the elements with the specified class name
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel')
//where is the food
let currentFoodPosition = 0


//FUNCTIONS

//populates game board with pixels
const createGameBoardPixels = () => {
    for (let i = 1; i <= TOTAL_PIXEL_COUNT; i++) {
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`
    }
}

//creates food on board
const createFood = () => {
    //go to location of food, remove class name of "food" from the pixel so it just becomes a pixel again
    gameBoardPixels[currentFoodPosition].classList.remove('food')
    currentFoodPosition = Math.floor(Math.random()*TOTAL_PIXEL_COUNT)
    gameBoardPixels[currentFoodPosition].classList.add('food')
}

//snake behavior

const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

let snakeCurrentDirection = RIGHT_DIR
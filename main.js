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

//snake directions
const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

//snake starting point
let currentHeadPosition = TOTAL_PIXEL_COUNT/2
//snake starting length
let snakeLength = 200

let snakeCurrentDirection = RIGHT_DIR

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
const changeDirection = newDirectionCode => {
    //if snake is already going the direction of the user input, don't do anything
    if(newDirectionCode == snakeCurrentDirection) return; 

    if (newDirectionCode == LEFT_DIR && snakeCurrentDirection != RIGHT_DIR) {
        snakeCurrentDirection = newDirectionCode
    } else if (newDirectionCode == UP_DIR && snakeCurrentDirection != DOWN_DIR) {
        snakeCurrentDirection = newDirectionCode
    } else if (newDirectionCode == RIGHT_DIR && snakeCurrentDirection != LEFT_DIR) {
        snakeCurrentDirection == newDirectionCode
    } else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection != LEFT_DIR) {
        snakeCurrentDirection = newDirectionCode
    }
}

//move the snake 
const moveSnake = () => {
    switch (snakeCurrentDirection) {
        case LEFT_DIR:
            --currentHeadPosition
            const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0
            if (isHeadAtLeft) {
            currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            }
        break;
        case RIGHT_DIR:
            ++currentHeadPosition
            const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
            if (isHeadAtRight) {
            currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            }
            break;
        case UP_DIR :
            currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            const isHeadAtTop = currentHeadPosition < 0
            if (isHeadAtTop) {
            currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT
            }
            break;
        case DOWN_DIR: 
            currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT -1
            if (isHeadAtBottom) {
            currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT
            }
        break;
        default:
        break;
    }
    let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition]
    //if nsake intersects with its own body, game over
    if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
        clearInterval(moveSnakeInterval)
        alert(`Food eaten: ${totalFoodEaten}. Distance traveled: ${totalDistanceTraveled}.`)
        window.location.reload()
    }
    //add snake body styling if empty pixel
    nextSnakeHeadPixel.classList.add("snakeBodyPixel")
}


//CALLS
createGameBoardPixels()
createFood()

let moveSnakeInterval = setInterval(moveSnake, 100)
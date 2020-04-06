let canvas = document.getElementById("snake")
let score = document.getElementById("score")
let ranking = document.getElementById("ranking")
let context = canvas.getContext("2d")
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 +1) * box
}

const criarBG = () => {
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

const criarCobrinha = () => {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

const drawFood = () => {
    context.fillStyle = "red"
    context.fillRect(food.x , food.y, box, box)
}

const update = (event) => {
    if(event.keyCode == 37 && direction != "right") direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

const iniciarJogo = () => {

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            let name = prompt("Please enter your name")
            let totalScore = parseInt(snake.length - 1)
            setCookie(name, totalScore)
        }
    }

    criarBG()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY -= box
    if(direction == "down") snakeY += box

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    }else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 +1) * box,
        score.innerHTML = "Score: " + snake.length
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

}

let jogo = setInterval(iniciarJogo, 100)

document.addEventListener("keydown", update)

// create cookie for ranking

const setCookie = (name, totalScore) => {
    document.cookie = "name" + "=" + name + ";" + "score" + "=" + totalScore + ";" + "SameSite=Lax; Secure ; path=/;"
    ranking.innerHTML = document.cookie + "score"
} 

// toggle theme
const toggleTheme = () => {
    let button = document.querySelectorAll("#theme div")
    let body = document.getElementById("body")
    if(button[0].className == "light"){
        button[0].className = "dark"
        body.style.backgroundColor = "white"
        body.style.color = "black"
    } else {
        button[0].className = "light" 
        body.style.backgroundColor = "black"
        body.style.color = "white"
    }
}
  
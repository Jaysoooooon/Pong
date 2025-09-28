const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("startreset");
const loseCondition = document.getElementById("score");
const resultDisplay = document.getElementById("lose");

let secondes = 0;
let timerID = null;

let xBarre = canvas.width / 2 - 25;
const yBarre = 470;
const speedBarre = 7;
const widthBarre = 50;
const heightBarre = 15

let x = canvas.width / 2;
let y = yBarre - heightBarre;
let speedBallX = 2;
let speedBallY = 2;
const widthBall = 15;
let rafID;

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, widthBall, 0, Math.PI * 2);
    ctx.fill();
}

function drawBarre() {
    ctx.fillStyle = "aqua";
    ctx.fillRect(xBarre, yBarre, widthBarre, heightBarre);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            if(xBarre > 0) xBarre -= speedBarre;
            break;
        case 'ArrowRight':
            if(xBarre < canvas.width - widthBarre) xBarre += speedBarre;
        default:
            break;
    }
    drawBarre();
});

function random() {
    const random = Math.floor(Math.random() * 2);
    speedBallY = -speedBallY;

    if (random === 0) {
        speedBallX = speedBallX;
    } else {
        speedBallX = -speedBallX;
    }
}

function update() {
    x += speedBallX;
    y += speedBallY;
    if(x >= canvas.width - widthBall) {
        speedBallX = -speedBallX;
    }
    if(x <= 0 + widthBall) {
        speedBallX = -speedBallX;
    }
    if(y <= 0 + widthBall) {
        speedBallY = -speedBallY;
    }
    if (y >= canvas.height - widthBall) {
        cancelAnimationFrame(rafID);
        resultDisplay.textContent = "Perdu !";
        stopTimer();
    }

}

function startTimer() {
    if (timerID !== null) return;
    timerID = setInterval(() => {
        secondes++;
        loseCondition.textContent = secondes;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerID);
    timerID = null;
}

function start() {
    startTimer();
    update();
    drawBall();
    drawBarre();
    rafID = requestAnimationFrame(start);
}

start();
random();

resetButton.addEventListener('click', () => {
    secondes = 0;
    loseCondition.textContent = '0';
    x = canvas.width / 2;
    y = yBarre - heightBarre;
    speedBallX = 2;
    speedBallY = 2;
    random();
    updateScore();
    start();
    resultDisplay.textContent = '';
});
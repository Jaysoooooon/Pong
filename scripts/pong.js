const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("startreset");
const loseCondition = document.getElementById("score");
const resultDisplay = document.getElementById("lose");
const bestScoreEver = document.getElementById("bestscore");
const buttonLeft = document.getElementById("left");
const buttonRight = document.getElementById("right");

let secondes = 0;
let timerID = null;
let bestSecondes = 0;

let xBarre = canvas.width / 2 - 25;
const yBarre = canvas.height - 30;
const speedBarre = 2;
const widthBarre = 50;
const heightBarre = 15;
let right = false;
let left = false;

let x = canvas.width / 2;
let y = yBarre - 20;
let speedBallX = 2;
let speedBallY = 2;
const widthBall = 15;
let rafID;

bestSecondes = localStorage.getItem('bestScore') || 0;
bestScoreEver.textContent = bestSecondes;

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
    if(e.key == 'ArrowLeft') left = true;
    if(e.key == 'ArrowRight') right = true;
});

document.addEventListener('keyup', (e) => {
    if(e.key == 'ArrowLeft') left = false;
    if(e.key == 'ArrowRight') right = false;
});

buttonLeft.addEventListener('touchstart', () => {
    left = true;
});
buttonLeft.addEventListener('touchend', () => {
    left = false;
});

buttonRight.addEventListener('touchstart', () => {
    right = true;
});
buttonRight.addEventListener('touchend', () => {
    right = false;
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
    if (left && xBarre > 0) {
    xBarre -= speedBarre;
    }
    if (right && xBarre < canvas.width - widthBarre) {
        xBarre += speedBarre;
    }
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
    if (y + widthBall >= yBarre && x >= xBarre && x <= xBarre + widthBarre && speedBallY > 0) {
        speedBallY = -speedBallY;
    }

    if (y >= canvas.height - widthBall) {
        speedBallX = 0;
        speedBallY = 0;
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
    if(secondes > bestSecondes) {
        bestSecondes = secondes;
        bestScoreEver.textContent = bestSecondes;
        localStorage.setItem('bestScore', bestSecondes);
    }
}

function start() {
    startTimer();
    update();
    drawBall();
    drawBarre();
    rafID = requestAnimationFrame(start);
}

drawBall();
drawBarre();

resetButton.addEventListener('click', () => {
    secondes = 0;
    loseCondition.textContent = '0';
    x = canvas.width / 2;
    y = yBarre - 20;
    speedBallX = 2;
    speedBallY = 2;
    random();
    start();
    resultDisplay.textContent = '';
});
const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("startreset");
const loseCondition = document.getElementById("score");
const resultDisplay = document.getElementById("lose");
const score = {lose:0};

let xBarre = canvas.width / 2 - 25;
const yBarre = 470;
const speedBarre = 7;
const widthBarre = 50;
const heightBarre = 15

let x = canvas.width / 2;
let y = canvas.height / 2;
const speedBall = 2;
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

function update() {
    const random = Math.floor(Math.random() * 2);
    /*if(random = 0) {
        x += speedBall;
        y += speedBall;
    } else {
        x -= speedBall;
        y += speedBall; 
    }*/
        x += speedBall;
        y += speedBall; 
    if(x > canvas.width - widthBall) {
        x -= speedBall;
    }
    if(y > canvas.height - widthBall) {
        y -= speedBall;
    }
}

function start() {
    update();
    drawBall();
    drawBarre();
    rafID = requestAnimationFrame(start);
}

start();

function updateScore() {
  //  loseCondition = score.lose + "s";
}

resetButton.addEventListener('click', () => {
    score.lose = 0;
    updateScore();
    start();
    resultDisplay.textContent = '';
});
const canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('startreset');
const loseCondition = document.getElementById('score');
const resultDisplay = document.getElementById('lose');
const score = {lose:0};

let x = canvas.width / 2;
let y = canvas.heigt / 2;
const speed = 2;
let rafID;

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function start() {
    drawBall();
    rafID = requestAnimationFrame(start);
}

start();

function updateScore() {
  //  loseCondition = score.lose + "s";
}

resetButton.addEventListener('click', () => {
    score.lose = 0;
    updateScore();
    resultDisplay.textContent = '';
});
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

cvs.width = 288;
cvs.height = window.innerHeight;;


var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "./img/bird.png";
bg.src = "./img/bg.png";
fg.src = "./img/fg.png";
pipeUp.src = "./img/pipeUp.png";
pipeBottom.src = "./img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "./audio/fly.mp3";
score_audio.src = "./audio/score.mp3";

var gap = 150;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", feelEvent);
document.addEventListener("touchstart", feelEvent);

function moveUp() {
    yPos -= 40;
    fly.play();
}

function feelEvent() {
    if (stopGame){
        moveUp();
    }
    else
    {
        document.location.reload();
    }
}



// Создание блоков
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;
var stopGame = true;

function drawWin() {
    ctx.font = "26px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Игра закончена", canvas.width / 2 - 110, 540);
    ctx.fillText("Счет: " + score, canvas.width / 2 - 60, 580);

}

function draw() {
    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(bird, xPos, yPos);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            //location.reload(); // Перезагрузка страницы
            stopGame = false;

            
        }

        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }
        ctx.drawImage(fg, 0, 500);



    yPos += grav;
    if (stopGame){
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, 510);

        requestAnimationFrame(draw);
    }
    else{
        drawWin();
    }

}

pipeBottom.onload = draw;
let birdImage = new Image();
let backImage = new Image();
let pipeBottomImage = new Image();
let pipeUpImage = new Image();
let roadImage = new Image();

backImage.src = "./img/back.png";
birdImage.src = "./img/bird.png";
pipeBottomImage.src = "img/pipeBottom.png";
pipeUpImage.src = "img/pipeUp.png";
roadImage.src = "img/road.png";

let flySound = new Audio("audio/fly.mp3");
let scoreSound = new Audio("audio/score.mp3");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 256;
canvas.height = 512;

let gap = 110

let pipe = []

pipe[0] = {
    x:canvas.width,
    y:0
}

/* --- Game Variables --- */

let birdPositionX = 10;
let birdPositionY = 150;

let velocityY = 0;
let gravity = 0.2;

/* --- Function --- */

function drawGame() {
    ctx.drawImage(backImage, 0, 0,);
    ctx.drawImage(birdImage, birdPositionX, birdPositionY);
    ctx.drawImage(roadImage, 0, canvas.height - roadImage.height)

    if( birdPositionY + birdImage.height >= canvas.height - roadImage.height ) {
        location.reload();
    }

    velocityY += gravity;
    birdPositionY += velocityY;

    for (let i = 0; i < pipe.length; i++ ) {
        
        ctx.drawImage(pipeUpImage, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottomImage, pipe[i].x, pipe[i].y + pipeUpImage.height + gap)

        pipe[i].x -= 2;
    

         if( pipe[i].x == 80) {
            pipe.push({
                x:canvas.width,
                y:Math.floor( (Math.random() * pipeUpImage.height) - pipeUpImage.height)
        })}

        if(birdPositionX + birdImage.width >= pipe[i].x && 
            birdPositionX <= pipe[i].x + pipeUpImage.width &&
            (birdPositionY <= pipe[i].y + pipeUpImage.height ||
            birdPositionY + birdImage.height >= pipe[i].y + pipeUpImage.height + gap)
        ) {
            location.reload();
        }
        if( pipe[i].x == 0)
            scoreSound.play()

        if( pipe[i].x < -pipeUpImage.width) {
            pipe.shift()
        }
    }
}

function moveUp() {
    velocityY = -5;
    flySound.play()
}

/* --- Events --- */

addEventListener("click", () => {
    moveUp();
})

setInterval(drawGame, 20);
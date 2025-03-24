const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const backgroundImg = new Image();
backgroundImg.src = "assets/background.webp"; 

backgroundImg.onload = function() {
    resizeCanvas();
    gameLoop();
};

function resizeCanvas() {
    const aspectRatio = backgroundImg.width / backgroundImg.height;

    if (window.innerWidth / window.innerHeight > aspectRatio) {
        canvas.height = window.innerHeight;
        canvas.width = canvas.height * aspectRatio;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = canvas.width / aspectRatio;
    }

    // Center canvas
    canvas.style.position = "absolute";
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height); 
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", resizeCanvas);

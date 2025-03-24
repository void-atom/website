// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const backgroundImg = new Image();
backgroundImg.src = "assets/background.jpg"; // Make sure this exists

const playerImg = new Image();
playerImg.src = "assets/player.png"; // Make sure this exists

// Player properties
let player = {
    x: 100,
    y: 100,
    width: 40,
    height: 40,
    speed: 5
};

// Define areas (places to visit)
const areas = [
    { name: "Home", x: 50, y: 50, width: 100, height: 100, color: "green", info: "Welcome to my home! I'm a developer passionate about games and coding." },
    { name: "School", x: 300, y: 100, width: 100, height: 100, color: "red", info: "Here is my academic background and certifications!" }
];

// Movement tracking
let keys = {};

// Event listeners for movement
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Popup elements
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const closePopup = document.getElementById("close-popup");

// Show popup function
function showPopup(text) {
    popupText.textContent = text;
    popup.classList.remove("hidden");
    popup.style.display = "block";
}

// Close popup
closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup.style.display = "none";
});

// Update function (Handles movement & collisions)
function update() {
    let moved = false;
    if (keys["ArrowUp"]) { player.y -= player.speed; moved = true; }
    if (keys["ArrowDown"]) { player.y += player.speed; moved = true; }
    if (keys["ArrowLeft"]) { player.x -= player.speed; moved = true; }
    if (keys["ArrowRight"]) { player.x += player.speed; moved = true; }

    // Add movement animation
    if (moved) {
        document.body.classList.add("animated");
    } else {
        document.body.classList.remove("animated");
    }

    // Check for area interactions
    areas.forEach(area => {
        if (player.x < area.x + area.width &&
            player.x + player.width > area.x &&
            player.y < area.y + area.height &&
            player.y + player.height > area.y) {
            showPopup(area.info);
        }
    });
}

// Draw function (Renders everything)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // Draw areas (interactive places)
    areas.forEach(area => {
        ctx.fillStyle = area.color;
        ctx.fillRect(area.x, area.y, area.width, area.height);
    });

    // Draw player character
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Game loop (Runs continuously)
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

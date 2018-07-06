// The Enemies
// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // take random line number for enemy
    this.y = y;
    // random start position for enemy
    this.x = [-100, 100, 200][Math.floor(Math.random() * 3)];
    // random speed for enemy
    this.speed = Math.floor((Math.random() * (8 - 3) + 3));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // check if enemy is out of gameboard and reset its values
    if(this.x >= 500 ){
        this.x = -100;
        this.y = [65, 145, 240][Math.floor(Math.random() * 3)];
    }
    // make the enemy move by changing its X position
    this.x += (500 / this.speed) * dt;
    this.checkCollision();    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
    if (player.x <= this.x + 50 && this.x <= player.x + 20 && player.y <= this.y + 20 &&this.y <= player.y + 20) {
        // when colliding with player, 'bump' them
        player.x = 200;
        player.y = 400;
    }
};


// The Player
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    //position of player
    this.x = 200;
    this.y = 400;
};
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    allEnemies.forEach(function(enemy) {
        if (enemy.y === (player.y - 12) && enemy.x > player.x - 75 && enemy.x < player.x + 70) {
            player.x = 200;
            player.y = 400;
        }
    });
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    // check witch key is pressed and move player
    // check if player touch border of game board and stop movement
    if(e === 'up'){
        
        if(this.y === 60 || this.y === -25){
            this.y = -25;
            openModal();
        }else{
            this.y -=85;
        }
    }
    if(e === 'down'){
        if(this.y === 400){
            this.y = 400;
        }else{
            this.y +=85;
        }
    }
    if(e === 'left'){
        if(this.x === 0){
            this.x = 0;
        }else{
            this.x -=100;
        }
    }
    if(e === 'right'){
        if(this.x === 400){
            this.x = 400;
        }else{
            this.x +=100;
        }
    }
};





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

// create a level - depending on level amout of enemys
// TBD: count up level
const level = 1;

let enemyRow1 = new Enemy(60);
let enemyRow2 = new Enemy(143);
let enemyRow3 = new Enemy(226); 
const allEnemies = [];
allEnemies.push(enemyRow1, enemyRow2, enemyRow3); //push enemises to an array


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var reset = document.getElementById('reset');
// When the user clicks on <span> (x), close the modal
reset.onclick = function() {
    modal.style.display = "none";
    player.x = 200;
    player.y = 400;
}

// Modal
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
function openModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    player.x = 200;
    player.y = 400;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        player.x = 200;
        player.y = 400;
    }
}
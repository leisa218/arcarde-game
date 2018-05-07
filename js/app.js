// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // take random line number for enemy
    this.y = [65, 145, 240][Math.floor(Math.random() * 3)];
    // random start position for enemy
    this.x = [-100, 100, 200][Math.floor(Math.random() * 3)];
    //this.x = -100;
    // random speed for enemy
    //this.speed = speed;
    this.speed = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)];
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 500 ){
        this.x = -100;
        this.y = [65, 145, 240][Math.floor(Math.random() * 3)];
    }
    this.x += this.speed;
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    // check witch key is pressed and move player
    // check if player touch border of game board and stop movement
    if(e === 'up'){
        if(this.y === -25){
            this.y = -25;
            // game won
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
    // debuggin
    //console.log('x = '+this.x, 'y ='+this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const level = 7;
 
const allEnemies = [];
for (var i = 0; i <= level; i++) {
  let enemy= new Enemy();   
  //console.log(enemy);
  allEnemies.push(enemy);
}
console.log(allEnemies);
//const levelOne = allEnemies.push();


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
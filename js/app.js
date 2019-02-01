
// Enemies our player must avoid
var Enemy = function Enemy(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //when the enemies are off canvas
    if (this.x > 505){
        this.x = -101;
        this.speed = 200 + Math.floor(Math.random() * 100 + 50);
    }
    // When the enemy collides with the player.
    if (player.x + 60 > this.x &&
        player.x - 60 < this.x &&
        player.y + 50 > this.y &&
        player.y - 50 < this.y
        ){
        player.x = 200;
        player.y = 406;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function Player(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
}

Player.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for 
    // all computers.
    if (this.x > 404){
        this.x = 404;
    }
    if (this.x < 0){
        this.x = 0;
    }
    if (this.y > 406){
        this.y = 406;
    }
    if (this.y <= 0){
        setTimeout(() => {
            alert("Congrats! You've reached to the land!");
            this.x = 200;
            this.y = 406;
        }, 0)
    }
    //Change randomly player's character
    //when the player is on the selector.
    var chars = ['images/char-boy.png',
        'images/char-horn-girl.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];
    var randomChar = function (array) {
        return array[Math.floor(Math.random() * array.length)];
    };
    if (this.x >= 400 && this.y >= 400){
        return setTimeout(function(){
            player.sprite = randomChar(chars);
            console.log("character has changed.")
            player.x = 200;
            player.y = 406;
        }, 0);
    }

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move){
    switch(move){
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 45;
            break;
        case 'down':
            this.y += this.speed + 45;
            break;
    }

}
var Selector = function Selector(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Selector.png';
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPositionY = [60, 140, 220];
var player = new Player(200, 406, 50);
var selector = new Selector(400, 400);

enemyPositionY.forEach(function(posY){
    var enemy = new Enemy(-101, posY, 100 + Math.floor(Math.random() * 100 + 1));
    allEnemies.push(enemy);
});


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


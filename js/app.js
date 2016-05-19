// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
      this.x = 0;
    };
};

// Method to draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 200;
  this.y = 392;
};

Player.prototype.update = function() {
  this.checkCollisions();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
  if (allowedKeys === "left" && this.x > 10) {
    this.x = this.x - 101;
  };
  if (allowedKeys === "right" && this.x < 400) {
    this.x = this.x + 101;
  };
  if (allowedKeys === "up" && this.y > 10) {
    this.y = this.y - 83;
    if (this.y < 50) {
      this.reset();
      alert ("YOU WON");
    };
  };
  if (allowedKeys === "down" && this.y < 400) {
    this.y = this.y + 83;
  };
  console.log(this.x+", "+this.y);
};

Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x + 40 > this.x && this.x + 40 > allEnemies[i].x
      && allEnemies[i].y + 50 > this.y && this.y + 50 > allEnemies[i].y) {
      alert("YOU LOST");
      this.reset();
    };
  };
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 392;
};

// Instantiate objects.
var player = new Player();

var enemy1 = new Enemy(0, 60, 100);
var enemy2 = new Enemy(202, 143, 150);
var enemy3 = new Enemy(101, 226, 90);
var enemy4 = new Enemy(202, 60, 120);
var enemy5 = new Enemy(404, 226, 90);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

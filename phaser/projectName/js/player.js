function Player(game, x, y , key, frame) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.body.gravity.y = 2800;
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = true;

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update  = function() {
    this.body.velocity.x = 0;
    this.body.gravity.y = 2800;
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.body.velocity.x = 300;
        this.scale.x = 1;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -300;
        this.scale.x = -1;
    }

    this.isGrounded = this.body.blocked.down;

    if(this.isGrounded) {
        this.jumps = 2;
        this.jumping = false;
    }
    // allow steady velocity change up to a certain key down duration
    if(this.jumps > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
        this.body.velocity.y = -700
        this.jumping = true;
    } 

    if(this.jumps === 1 && game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR,150)) {
        this.body.velocity.x = this.scale.x * 700;
        this.jumping = true;
    }

    // finally, letting go of the UP key subtracts a jump
    if(this.jumping && (game.input.keyboard.upDuration(Phaser.Keyboard.UP)||game.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR))) {
        this.jumps--;
        this.jumping = false;
    }
}
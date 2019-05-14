function Player(game, x, y , key, frame) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.body.gravity.y = 2800;
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = true;
    this.dash = false;
    this.jumpSound = game.add.audio('jump');
    this.animations.add('walk', Phaser.Animation.generateFrameNames('robot_', 1, 11, '', 4), 30, true);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if(!this.dash ) {
        this.body.velocity.x = 0;
        this.body.gravity.y = 2800;
    }
    if(!this.dash) {
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.body.velocity.x = 300;
            this.scale.x = 1;
            this.animations.play('walk');
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.body.velocity.x = -300;
            this.scale.x = -1;
            this.animations.play('walk');
        } else {
            this.frameName = 'robot_0001';
        }
    }
    this.isGrounded = this.body.blocked.down;

    if(this.isGrounded) {
        this.jumps = 2;
        this.jumping = false;
        this.inAir = false
    } else {
        if(!this.inAir)  {
            this.jumps = 1;
            this.inAir = true;
        }
    }
    // allow steady velocity change up to a certain key down duration
    
    if(this.jumps > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
        this.body.velocity.y = -700
        this.jumping = true;
        this.inAir = true;
        this.jumpSound.play();
    } 

    if(!this.jumping && this.jumps === 1 && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
        this.body.gravity.y = 0;
        this.body.velocity.y = 0;
        this.body.velocity.x = this.scale.x * 1000;
        this.dash = true;
        game.time.events.add(Phaser.Timer.SECOND * 0.2, this.stopDash, this);
        this.jumping = true;
        this.jumps--;
    }

    // finally, letting go of the UP key subtracts a jump
    if(this.jumping && game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
        this.jumps--;
        this.jumping = false;
    }

}
Player.prototype.stopDash = function() {
    this.body.velocity.x = 0;
    this.dash = false;
}
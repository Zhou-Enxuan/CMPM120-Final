//constructor for creating player object
function Player(game, x, y , key, frame) {
    //add sprite
    Phaser.Sprite.call(this, game, x, y, key, frame);
    //enable physics and function to the game world
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.body.gravity.y = 2800;
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = true;
    //boolean check if player is on dash move
    this.dash = false;
    //add jump sound effect
    this.jumpSound = game.add.audio('jump');
    this.body.setSize(35,53,13,5);
    //add walk animation
    this.animations.add('walk', Phaser.Animation.generateFrameNames('robot_', 1, 11, '', 4), 30, true);
}

//enable player constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//make upadte function for player object only
Player.prototype.update = function() {
    //if player is not on dashing, set everything to default
    if(!this.dash ) {
        this.body.velocity.x = 0;
        this.body.gravity.y = 2800;
    }
    //implement left and right movement
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

    //check if player is on ground
    this.isGrounded = this.body.blocked.down || this.body.touching.down;

    //if it is, set the jump move beck to default, if not , make sure player can only do one more jump or dash
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
    
    //implement key for jump move, can only jump twice
    if(this.jumps > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
        this.body.velocity.y = -700
        this.jumping = true;
        this.inAir = true;
        this.jumpSound.play();
    } 

    //implement air dash move, can only dash once after one jump, can't dash if player did doble jump
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

    if(UI.energyValue > 0.3 && game.input.keyboard.justPressed(Phaser.Keyboard.Q)) {
        UI.energyValue -= 0.3;
        UI.temp -= 100;
        UI.tempChanged = true;
    }

}

//function that help player stop dash after then press dash move
Player.prototype.stopDash = function() {
    this.body.velocity.x = 0;
    this.dash = false;
}
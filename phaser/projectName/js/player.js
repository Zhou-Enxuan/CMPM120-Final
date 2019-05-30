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
    this.super = false;
    this.superTime = game.time.create(false);
    this.superTime.loop(Phaser.Timer.SECOND * 2, function(){
        this.super = false;
    },this);
    this.superEffect = game.add.tween(this)
    this.superEffect.to( {alpha: 2}, 100, Phaser.Easing.Default, true, 0, false).yoyo(true);
    this.superTime.start();
    //add walk animation
    this.animations.add('walk', Phaser.Animation.generateFrameNames('robot_', 1, 11, '', 4), 30, true);

    this.playerStates = [
        {
            'name':     'stand',
            'initial': true,
            'events': {
                'walking':  'walk',
                'cooling/heating':  'cool/heat',
                'jumping': 'jump',
                'falling': 'fall'
            }
            
        },
        {
            'name':     'walk',
            'events': {
                'stop':  'stand',
                'jumping':  'jump',
                'falling': 'fall'
            }
        },
        {
            'name':     'jump',
            'events': {
                'falling':  'fall'
            }
        },
        {
            'name':  'fall',
            'events': {
                'stop': 'stand',
                'double jumping':   'double jump',
                'dashing':  'dash'

            }
        },
        {
            'name':     'double jump',
            'events': {
                'falling':  'fall'
            }
        },
        {
            'name': 'dash',
            'events': {
                'falling':  'fall'
            }
        },
        {
            'name': 'cool/heat',
            'events': {
                'stop': 'stand'
            }
        }

    ];
    this.playerSM = new StateMachine(this.playerStates, this);
    game.time.create
    //this.transitioning = false;
}

//enable player constructor
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//make upadte function for player object only
Player.prototype.update = function() {
//     // if player is not on dashing, set everything to default
//     if(!this.dash) {
//         this.body.velocity.x = 0;
//         this.body.gravity.y = 2800;
//         if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
//             this.body.velocity.x = 300;
//             this.scale.x = 1;
//             this.animations.play('walk');
//         } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
//             this.body.velocity.x = -300;
//             this.scale.x = -1;
//             this.animations.play('walk');
//         } else {
//             this.frameName = 'robot_0001';
//         }
//     }

//     //check if player is on ground

//     //if it is, set the jump move beck to default, if not , make sure player can only do one more jump or dash
//     this.isGrounded = this.body.blocked.down || this.body.touching.down;

//     if(this.isGrounded) {
//         this.jumps = 2;
//         this.jumping = false;
//         this.inAir = false
//     } else {
//         if(!this.inAir)  {
//             this.jumps = 1;
//             this.inAir = true;
//         }
//     }
    
//     //implement key for jump move, can only jump twice
//     if(this.jumps > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
//         this.body.velocity.y = -700
//         this.jumping = true;
//         this.inAir = true;
//         this.jumpSound.play();
//     } 

//     //implement air dash move, can only dash once after one jump, can't dash if player did doble jump
//     if(!this.jumping && this.jumps === 1 && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
//         this.body.gravity.y = 0;
//         this.body.velocity.y = 0;
//         this.body.velocity.x = this.scale.x * 1000;
//         this.dash = true;
//         game.time.events.add(Phaser.Timer.SECOND * 0.2, this.stopDash, this);
//         this.jumping = true;
//         this.jumps--;
//     }

//     // finally, letting go of the UP key subtracts a jump
//     if(this.jumping && game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
//         this.jumps--;
//         this.jumping = false;
//     }

//     if(UI.energyValue > 0.3 && game.input.keyboard.justPressed(Phaser.Keyboard.Q)) {
//         UI.energyValue -= 0.3;
//         UI.temp -= 100;
//         UI.tempChanged = true;
//     }
    this.state = this.playerSM.getState();
    console.log(this.state.name);

    switch(this.state.name) {
        // ***********************************************************
        case 'stand':
            this.body.velocity.x = 0;
            this.body.gravity.y = 2800;
            this.secondMove = false;
            this.isGrounded = this.body.blocked.down || this.body.touching.down;
            this.frameName = 'robot_0001';
            if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.playerSM.consumeEvent('walking');
            }else if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
                this.playerSM.consumeEvent('jumping');
            }else if(game.input.keyboard.justPressed(Phaser.Keyboard.Z)){
                this.playerSM.consumeEvent('cooling/heating');
            } else if (!this.isGrounded) {
                this.playerSM.consumeEvent('falling');
            }
        break;

        case 'walk':
            this.isGrounded = this.body.blocked.down || this.body.touching.down;

            if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
                this.playerSM.consumeEvent('jumping');
            } else if (!this.isGrounded) {
                this.playerSM.consumeEvent('falling');
            }
            if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                this.body.velocity.x = 300;
                this.scale.x = 1;
                this.animations.play('walk');           
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -300;
                this.scale.x = -1;
                this.animations.play('walk');  
            }
            else {
                this.playerSM.consumeEvent('stop');
            }
        break;
        case 'fall':
            this.jump = false;
            this.isGrounded = this.body.blocked.down || this.body.touching.down;
            this.frameName = 'robot_0001';
            if(this.isGrounded){
                this.playerSM.consumeEvent('stop');
            } else if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) && !this.secondMove) {
                this.secondMove = true;
                this.playerSM.consumeEvent('double jumping');
            } else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.secondMove) {
                this.secondMove = true;
                this.playerSM.consumeEvent('dashing');
            }

            if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                this.body.velocity.x = 300;
                this.scale.x = 1;         
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -300;
                this.scale.x = -1; 
            } else {
                this.body.velocity.x = 0;
            }
        break;
        case 'jump':
            this.frameName = 'robot_0001';

            if(game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
                this.body.velocity.y = -700;
                this.jump = true;
            }

            if(this.jump && game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
                this.playerSM.consumeEvent('falling');
            }


            if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                this.body.velocity.x = 300;
                this.scale.x = 1;         
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -300;
                this.scale.x = -1; 
            } else {
                this.body.velocity.x = 0;
            }
            //console.log('this.isGrounded: ' + this.isGrounded);

        break;
        case 'double jump':
            this.frameName = 'robot_0001';

            if(game.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
                this.body.velocity.y = -700;
                this.jump = true;
            }

            if(game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
                this.playerSM.consumeEvent('falling');
            }

            if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                this.body.velocity.x = 300;
                this.scale.x = 1;         
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -300;
                this.scale.x = -1; 
            } else {
                this.body.velocity.x = 0;
            }
        break;
        case 'dash':
            this.frameName = 'robot_0001';

            this.body.gravity.y = 0;
            this.body.velocity.y = 0;
            this.body.velocity.x = this.scale.x * 1000;
            game.time.events.add(Phaser.Timer.SECOND * 0.2, this.stopDash, this);

        break;
        case 'cool/heat':
            this.frameName = 'robot_0001';

            if(game.input.keyboard.isDown(Phaser.Keyboard.Z) && UI.energyValue > 0){
                UI.energyValue -= 0.005;
                UI.temp -= 1.5;
                UI.tempChanged = true;
            } else {
                this.playerSM.consumeEvent('stop');
            }
        break;
        default:
            console.warn('Unknown state');
    }

    if(this.super) {
        this.superTime.resume();
        this.superEffect.resume();
    } else {
        this.superTime.pause();
        this.superEffect.pause();
        this.alpha = 1;
    }
}

//function that help player stop dash after then press dash move
Player.prototype.stopDash = function() {
    this.body.velocity.x = 0;
    this.body.gravity.y = 2800;
    this.playerSM.consumeEvent('falling');
}
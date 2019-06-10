 var End = function(game) {};

 End.prototype = {
     create: function() {
        this.BG = game.add.sprite(0, -1400, 'end');
        this.rocket = game.add.sprite(400, 300, 'UI', 'fly001');
        this.rocket.anchor.setTo(0.5);
        this.rocket.animations.add('fly', Phaser.Animation.generateFrameNames('fly', 1, 2, '', 3), 30, true);
        this.rocket.animations.play('fly');
        this.sound = game.add.audio('rocket');
        this.sound.play('', 0, 0.5, false);
     },

     update: function() {
        if(this.BG.y < 0){
            this.BG.y += 5;
        }
        else {
            this.rocket.y -= 5;
            game.time.events.add(Phaser.Timer.SECOND * 4, function(){
                this.sound.destroy();
                game.state.start('mainMenu');
            }, this);
        }
     }
 }
var LevelMenu = function(game) {};

LevelMenu.prototype = {
    create: function() {
        if(BGM) {
            BGM.destroy();
        }
        game.add.sprite(0, 0, 'levelMenu');
        this.tour = game.add.sprite(570, 100, 'UI', 'tour logo');         
        this.tour.anchor.setTo(0.5);
        this.tour.inputEnabled = true;
        this.fire = game.add.sprite(570, 280, 'UI', 'fire logo');
        this.fire.anchor.setTo(0.5);
        this.fire.inputEnabled = true;
        this.ice = game.add.sprite(570, 490, 'UI', 'ice logo');
        this.ice.anchor.setTo(0.5);
        this.ice.inputEnabled = true;

        this.spaceShip = game.add.sprite(30, 150, 'UI', 'Spaceship001');
        this.Effect = game.add.tween(this.spaceShip);
        this.Effect.to( {alpha: 0}, 2000, Phaser.Easing.Default, true, 0, false).yoyo(true);
        this.Effect.pause();
        this.spaceShip.inputEnabled = true;

        this.select = game.add.audio('button');

        game.input.mouse.capture = true;
        this.selected = false;
        this.selected2 = false;
        this.selected3 = false;
    },

    update: function() {
        if(!partOne && !partTwo) {
            this.spaceShip.frameName = 'Spaceship001';
        } 
        else if(partOne && !partTwo) {
            this.spaceShip.frameName = 'Spaceship002';
        }
        else if(!partOne && partTwo) {
            this.spaceShip.frameName = 'Spaceship003';
        } 
        else {
            this.spaceShip.frameName = 'Spaceship004';
            this.Effect.resume();
            if(this.spaceShip.input.pointerOver()) {
                this.Effect.pause();
                this.spaceShip.alpha = 1;
                if(game.input.activePointer.leftButton.isDown) {
                    game.state.start('END');
                }
            }
        }
        if(this.fire.input.pointerOver()){
            if(!this.selected) {
                this.select.play('', 0, 0.5, false);
                this.selected = true;
            }
            this.fire.tint = 0xffffff;
            if(game.input.activePointer.leftButton.isDown) {
                game.state.start('Play');
            }
        } else {
            this.selected = false;
            this.fire.tint = 0x999999;;
        }

        if(this.ice.input.pointerOver()){
            if(!this.selected2) {
                this.select.play('', 0, 0.5, false);
                this.selected2 = true;
            }
            this.ice.tint = 0xffffff;
            if(game.input.activePointer.leftButton.isDown) {
                game.state.start('Ice');
            }
        } else {
            this.selected2 = false;
            this.ice.tint = 0x999999;;
        }

        if(this.tour.input.pointerOver()){
            if(!this.selected3) {
                this.select.play('', 0, 0.5, false);
                this.selected3 = true;
            }
            this.tour.tint = 0xffffff;
            if(game.input.activePointer.leftButton.isDown) {
                game.state.start('tutorial');
            }
        } else {
            this.selected3 = false;
            this.tour.tint = 0x999999;;
        }
    }
}
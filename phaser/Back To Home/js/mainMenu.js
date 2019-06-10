var MainMenu = function(game) {};

MainMenu.prototype = {
    create: function() {
        game.add.sprite(0, 0, 'mainMenu');
        this.start = game.add.sprite(400, 300, 'UI', 'START');
        this.start.anchor.setTo(0.5);
        this.start.inputEnabled = true;
        this.credits = game.add.sprite(400, 470, 'UI', 'Credits');
        this.credits.anchor.setTo(0.5);
        this.credits.inputEnabled = true;

        this.select = game.add.audio('button');

        game.input.mouse.capture = true;
        this.selected = false;
        this.selected2 = false;

        partOne = false;
        partTwo = false;
    },

    update: function() {
        if(this.start.input.pointerOver()){
            if(!this.selected) {
                this.select.play('', 0, 0.5, false);
                this.selected = true;
            }
            this.start.scale.setTo(1.5);
            if(game.input.activePointer.leftButton.isDown) {
                game.state.start('levelMenu');
            }
        } else {
            this.selected = false;
            this.start.scale.setTo(1);
        }

        if(this.credits.input.pointerOver()){
            if(!this.selected2) {
                this.select.play('', 0, 0.5, false);
                this.selected2 = true;
            }
            this.credits.scale.setTo(1.5);
            if(game.input.activePointer.leftButton.isDown) {
                game.state.start('credits');
            }
        } else {
            this.selected2 = false;
            this.credits.scale.setTo(1);
        }
    }
}
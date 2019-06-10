var Credits = function(game) {};

Credits.prototype = {
    create: function() {
        game.add.sprite(0, 0, 'credits')
        this.return = game.add.sprite(725,0,'UI','return');
        this.return.inputEnabled = true;

        this.select = game.add.audio('button');
        this.selected = false;

    },

    update: function() {
        if(this.return.input.pointerOver()){
            if(!this.selected) {
                this.select.play('', 0, 0.5, false);
                this.selected = true;
            }
            this.return.tint = 0xffffff;
            if(game.input.activePointer.leftButton.isDown) {
                game.state.start('mainMenu');
            }
        } else {
            this.selected = false;
            this.return.tint = 0x999999;;
        }
    }
}
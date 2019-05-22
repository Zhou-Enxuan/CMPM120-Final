//creating game UI
function myUI(game) {
    //add the tempture bar
    this.tempbar = game.add.sprite(400, 30, 'UI', 'temp_bar');
    this.tempbar.anchor.set(0.5);
    //make it stay on screen while camera is moving
    this.tempbar.fixedToCamera = true;
    //add the pointer on temputure bar
    this.pointer = game.add.sprite(400, 20, 'UI', 'pointer');
    this.pointer.anchor.set(0.5);
    this.pointer.scale.setTo(0.5);
    this.pointer.fixedToCamera = true;
    //add a heart to repersent life
    this.lifeScreen = game.add.sprite(5.5,2.5,'UI','lifeOut');
    this.lifeScreen.fixedToCamera = true;
    this.life = game.add.sprite(39,161,'UI','LifeBar');
    this.life.anchor.set(1);
    this.lifeValue = 1;
    this.life.fixedToCamera = true;
    this.energyScreen = game.add.sprite(45.5,2.5,'UI','coolEnergyOut');
    this.energyScreen.fixedToCamera = true;
    this.energy = game.add.sprite(79,161,'UI','coolEnery');
    this.energy.anchor.set(1);
    this.energyValue = 1;
    this.energy.fixedToCamera = true;
    //numer repersent life left for player
    this.lifeNum = 5;
    //the current temputre
    this.temp = 0;
    //where the pointer should be depend on temp
    this.pointerPos = 400;
    this.tempChanged = false;
}

//myUI.prototype = Object.create(Phaser.Sprite.prototype);
//myUI.prototype.constructor = myUI;

myUI.prototype = {
    updateUI: function() {
        if(this.pointer.cameraOffset.x > this.pointerPos && this.pointer.cameraOffset.x > 160) {
            this.pointer.cameraOffset.x--;
            //console.log('UI--: ' + UI.pointer.x);
        }

        if(this.pointer.cameraOffset.x < this.pointerPos && this.pointer.cameraOffset.x < 640) {
            this.pointer.cameraOffset.x++;
            //console.log('UI++: ' + UI.pointer.x);
        }

        if(UI.temp > 240) {
            UI.temp = 240;
        } else if(UI.temp < -240) {
            UI.temp = -240;
        }

        this.lifePercent(this.lifeValue);
        this.energyPercent(this.energyValue);
    },
    lifePercent: function(percent) {
        this.currentLife = 160 * percent;
        if(this.life.height > this.currentLife) {
            this.life.height -= 2;
        }
        else if(this.life.height < this.currentLife) {
            this.life.height = this.currentLife;
        }
        if(this.life.height < 0) {
            this.life.height = 0
        }
    },
    energyPercent: function(percent) {
        this.currentEnergy = 160 * percent;
        if(this.energy.height > this.currentEnergy) {
            this.energy.height -= 2;
        }
        else if(this.energy.height < this.currentEnergy) {
            this.energy.height = this.currentEnergy;
        }
        if(this.energy.height < 0) {
            this.energy.height = 0
        }
    }
}
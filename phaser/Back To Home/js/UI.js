//creating game UI
function myUI(game) {
    this.hot = game.add.sprite(0, 0, 'hot');
    this.hot.alpha = 0;
    this.hot.fixedToCamera = true;
    this.cold = game.add.sprite(0, 0, 'cold');
    this.cold.alpha = 0;
    this.cold.fixedToCamera = true;
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
    this.life = game.add.sprite(38.8,161,'UI','LifeBar');
    this.life.anchor.set(1);
    this.lifeValue = 1;
    this.life.fixedToCamera = true;
    if(level_stage == 'ice'){
        this.energyScreen = game.add.sprite(45.5,2.5,'UI','heatEnergyOut');
        this.energy = game.add.sprite(77.5,159,'UI','heatEnergy');
    } else {
        this.energyScreen = game.add.sprite(45.5,2.5,'UI','coolEnergyOut');
        this.energy = game.add.sprite(78.8,161,'UI','coolEnery');
    }
    this.energyScreen.fixedToCamera = true;
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
    this.heatDamage = game.time.create(false);
    this.hitSound = game.add.audio('hit');
    this.heatDamage.loop(Phaser.Timer.SECOND * 2,function(){
        this.hitSound.play('', 0, 0.5, false);
        this.lifeValue -= 0.1;
    },this);
    this.heatDamage.start();
    this.heatSound = game.add.audio('heat');
    this.frozenSound = game.add.audio('fronze');
    this.tempSound = this.heatSound;
}

//myUI.prototype = Object.create(Phaser.Sprite.prototype);
//myUI.prototype.constructor = myUI;

myUI.prototype = {
    updateUI: function() {
        if(this.pointer.cameraOffset.x > this.pointerPos && this.pointer.cameraOffset.x > 160) {
            var speed = (this.pointer.cameraOffset.x - this.pointerPos)/10;
            this.pointer.cameraOffset.x -= speed;
        }

        if(this.pointer.cameraOffset.x < this.pointerPos && this.pointer.cameraOffset.x < 640) {
            var speed = (this.pointerPos - this.pointer.cameraOffset.x)/10;
            this.pointer.cameraOffset.x += speed;
        }

        if(this.temp > 240) {
            this.temp = 240;
        } else if(this.temp < -240) {
            this.temp = -240;
        }

        if(this.lifeValue > 1) {
            this.lifeValue = 1;
        }

        if(this.energyValue > 1){
            this.energyValue = 1;
        }

        if(this.tempChanged) {
            this.pointerPos = 400 + this.temp;
            this.tempChanged = false;
        }

        if(this.temp >= 240 || this.temp <= -240) {
            if(this.temp >= 240) {
                this.tempSound = this.heatSound;
            } else {
                this.tempSound = this.frozenSound;
            }
            if(!this.tempSound.isPlaying){
                this.tempSound.play('', 0, 1, true);
            }
            this.heatDamage.resume();
        } else {
            this.tempSound.stop();
            this.heatDamage.pause();
        }

        if(this.pointer.cameraOffset.x > 400) {
            if(this.temp > 240) {
                this.hot.alpha = 1;
            } else {
                this.hot.alpha = (this.pointer.cameraOffset.x - 400)/240;
            }
        }
        else if(this.pointer.cameraOffset.x < 400) {
            if(this.temp > 240) {
                this.cold.alpha = 1;
            } else {
                this.cold.alpha = (400 - this.pointer.cameraOffset.x)/240;
            }
        }

        if(this.lifeValue <= 0.0001) {
            this.tempSound.destroy();
            game.state.start('levelMenu');
        }
        this.lifePercent(this.lifeValue);
        this.energyPercent(this.energyValue);
    },
    lifePercent: function(percent) {
        this.currentLife = 155 * percent;
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
        this.currentEnergy = 155 * percent;
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
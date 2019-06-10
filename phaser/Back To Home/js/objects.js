function myObjects(game, myTilemap) {
    //objects for helper blocks
    this.helper = game.add.group();
    this.helper.enableBody = true;
    myTilemap.createFromObjects('helper', 1, 'assets', 1, true, true, this.helper);
    this.helper.setAll('alpha', 0);
    this.helper.setAll('body.immovable', true);
    //add hit sound effect
    this.hitSound = game.add.audio('hit');
    //objects for up down moving blocks
    this.blocks = [];
    this.blocks.push(game.add.group());
    this.blocks[0].enableBody = true;
    myTilemap.createFromObjects('moving block 0', 2, 'assets', 1, true, true, this.blocks[0]);
    this.blocks[0].setAll('body.velocity.y', 100)
    this.blocks[0].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[1].enableBody = true;
    myTilemap.createFromObjects('moving block 1', 1, 'assets', 0, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 1', 2, 'assets', 1, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 1', 3, 'assets', 2, true, true, this.blocks[1]);
    this.blocks[1].setAll('body.velocity.y', 100)
    this.blocks[1].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[2].enableBody = true;
    myTilemap.createFromObjects('moving block 2', 1, 'assets', 0, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 2', 2, 'assets', 1, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 2', 3, 'assets', 2, true, true, this.blocks[2]);
    this.blocks[2].setAll('body.velocity.y', 100)
    this.blocks[2].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[3].enableBody = true;
    myTilemap.createFromObjects('moving block 3', 1, 'assets', 0, true, true, this.blocks[3]);
    myTilemap.createFromObjects('moving block 3', 2, 'assets', 1, true, true, this.blocks[3]);
    myTilemap.createFromObjects('moving block 3', 3, 'assets', 2, true, true, this.blocks[3]);
    this.blocks[3].setAll('body.velocity.y', 100)
    this.blocks[3].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[4].enableBody = true;
    myTilemap.createFromObjects('moving block 4', 1, 'assets', 0, true, true, this.blocks[4]);
    myTilemap.createFromObjects('moving block 4', 2, 'assets', 1, true, true, this.blocks[4]);
    myTilemap.createFromObjects('moving block 4', 3, 'assets', 2, true, true, this.blocks[4]);
    this.blocks[4].setAll('body.velocity.y', 100)
    this.blocks[4].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[5].enableBody = true;
    myTilemap.createFromObjects('moving block 5', 1, 'assets', 0, true, true, this.blocks[5]);
    myTilemap.createFromObjects('moving block 5', 2, 'assets', 1, true, true, this.blocks[5]);
    myTilemap.createFromObjects('moving block 5', 3, 'assets', 2, true, true, this.blocks[5]);
    this.blocks[5].setAll('body.velocity.y', 100)
    this.blocks[5].setAll('body.immovable', true);
    //objects for protals
    this.portal = game.add.group();
    this.portal.enableBody = true;
    this.portalFalg = false;
    this.portalFalg2 = false;
    myTilemap.createFromObjects('portal level enter', 36, 'objects', 20, true, true, this.portal);
    myTilemap.createFromObjects('portal level recieve', 26, 'objects', 10, true, true, this.portal);
    myTilemap.createFromObjects('portal_energy_in', 26, 'objects', 10, true, true, this.portal);
    myTilemap.createFromObjects('portal_energy_out', 36, 'objects', 20, true, true, this.portal);
    myTilemap.createFromObjects('portol_down_enter', 19, 'objects', 20, true, true, this.portal);
    myTilemap.createFromObjects('portol_down_recieve', 19, 'objects', 20, true, true, this.portal);
    this.portal.callAll('animations.add', 'animations', 'portal1', [10,11,12,13,14], 10, true);
    this.portal.callAll('animations.add', 'animations', 'portal2', [20,21,22,23,24], 10, true);
    this.portal.forEach(function(portal){
        if(portal.frame === 10) {
            portal.animations.play('portal1');
        } else {
            portal.animations.play('portal2');
        }
    });
    this.portalSound = game.add.audio('portal');
    //objects for enemy
    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    myTilemap.createFromObjects('monster', 21, 'objects', 5, true, true, this.enemies);
    this.enemies.callAll('animations.add', 'animations', 'monster-walk', [5,6,7,8], 10, true);
    this.enemies.callAll('animations.play', 'animations', 'monster-walk');
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('body.velocity.x',50);
    this.enemies.setAll('body.immovable',true);
    //objects energy/health item
    this.energy = game.add.group();
    this.energy.enableBody = true;
    myTilemap.createFromObjects('energy item', 25, 'objects', 9, true, true, this.energy);
    game.add.tween(this.energy).to( {y: 2}, 300, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    this.health = game.add.group();
    this.health.enableBody = true;
    myTilemap.createFromObjects('health item', 32, 'objects', 16, true, true, this.health);
    game.add.tween(this.health).to( {y: 2}, 300, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    this.collectSound = game.add.audio('item');
    //objects for fireBall
    this.fireBall = game.add.group();
    this.fireBall.enableBody = true;
    myTilemap.createFromObjects('fire bomb', 34, 'objects', 18, true, true, this.fireBall);
    this.fireBall.setAll('body.gravity.y',3000);
    this.fireBall.callAll('animations.add', 'animations', 'fireballs',[18,19], 10, true);
    this.fireBall.callAll('animations.play', 'animations', 'fireballs');
    game.time.events.loop(Phaser.Timer.SECOND * 2, function() {
        this.fireBall.setAll('body.velocity.y', -1300);
    }, this);
    //objects for thorn
    this.thornDown = game.add.group();
    this.thornDown.enableBody = true;
    myTilemap.createFromObjects('cer_down', 20, 'objects', 4, true, true, this.thornDown);
    this.thornUp = game.add.group();
    this.thornUp.enableBody = true;
    myTilemap.createFromObjects('cer_up', 20, 'objects', 4, true, true, this.thornUp);
    this.thornDown.callAll('body.setSize', 'body', 28, 25, 2, 7);
    this.thornUp.callAll('body.setSize', 'body', 28, 25, 2, 7);
    this.thronflag = false;
    game.time.events.loop(Phaser.Timer.SECOND * 1.5, function(){
        if(!this.thronflag) {
            this.thornDown.setAll('body.velocity.y', 100);
            this.thornUp.setAll('body.velocity.y', -100);
            this.thronflag = true;
        }
        else {
            this.thornDown.setAll('body.velocity.y', -100);
            this.thornUp.setAll('body.velocity.y', 100);
            this.thronflag = false;
        }

    },this);
    this.movethron = game.add.group();
    this.movethron.enableBody = true;
    this.fireInAir = true;
    myTilemap.createFromObjects('down_cer', 20, 'objects', 4, true, true, this.movethron);
    //objects for switch
    this.switch = game.add.group();
    this.switch.enableBody = true;
    myTilemap.createFromObjects('key_down_cer', 16, 'objects', 0, true, true, this.switch);
    this.switch.getChildAt(0).isOn = false;
    myTilemap.createFromObjects('key_for_door', 16, 'objects', 0, true, true, this.switch);
    this.switch.getChildAt(1).isOn = false;
    this.switchSound = game.add.audio('switch');
    //objects for door
    this.door = game.add.group();
    this.door.enableBody = true;
    myTilemap.createFromObjects('door', 31, 'objects', 15, true, true, this.door);
    this.door.setAll('body.immovable', true);
    //add clearItem
    this.clearItem = game.add.group();
    this.clearItem.enableBody = true;
    myTilemap.createFromObjects('clearItem', 41, 'objects', 25, true, true, this.clearItem);
    myTilemap.createFromObjects('clearItem', 42, 'objects', 26, true, true, this.clearItem);
    game.add.tween(this.clearItem).to( {y: 2}, 300, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
}

myObjects.prototype = {
    objectAllUpdate: function() {
        this.blockUpdate();
        this.portalUpdate();
        this.monsterUpdate();
        this.energyUpdate();
        this.healthUpdate();
        this.thronUpdate();
        this.switchUpdate();
        this.clearItemUpdate();
        //player.body.acceleration.x = 0;
        game.physics.arcade.collide(player, this.door);

        this.fireBallUpdate();

    },
    blockUpdate: function() {
        for(var i = 0; i < this.blocks.length; i++) {
            game.physics.arcade.collide(player, this.blocks[i]);
            game.physics.arcade.overlap(this.blocks[i], this.helper, this.blocksHelper, null, this);
        }
    },
    blocksHelper: function(block, helper) {
        block.body.velocity.y *= -1;
    },
    portalUpdate: function() {
        this.portalFalg = game.physics.arcade.overlap(player, this.portal, this.portalHelper, null, this);
        if(!this.portalFalg) {
            this.portalFalg2 = false;
        }
    },
    portalHelper: function(player, portal) {
        if(!this.portalFalg2){
            this.portalSound.play('', 0, 0.5, false);
            this.portalFalg2 = true;
            if(this.portal.getIndex(portal) === 0) {
                player.x = this.portal.getChildAt(1).x
                player.y = this.portal.getChildAt(1).y
            } else if(this.portal.getIndex(portal) === 1) {
                player.x = this.portal.getChildAt(0).x
                player.y = this.portal.getChildAt(0).y
            } else if(this.portal.getIndex(portal) === 2) {
                player.x = this.portal.getChildAt(3).x
                player.y = this.portal.getChildAt(3).y
            } else if(this.portal.getIndex(portal) === 3) {
                player.x = this.portal.getChildAt(2).x
                player.y = this.portal.getChildAt(2).y
            } else if(this.portal.getIndex(portal) === 4) {
                player.x = this.portal.getChildAt(5).x
                player.y = this.portal.getChildAt(5).y
            } else if(this.portal.getIndex(portal) === 5) {
                player.x = this.portal.getChildAt(4).x
                player.y = this.portal.getChildAt(4).y
            }
        }
    },
    monsterUpdate: function() {
        game.physics.arcade.overlap(player, this.enemies, this.monsterHelper2, null, this);
        game.physics.arcade.overlap(this.enemies, this.helper, this.monsterHelper, null, this);
    },
    monsterHelper: function(enemy, helper) {
        enemy.body.velocity.x *= -1;
        enemy.scale.x *= -1;
    },
    monsterHelper2: function(player, enemy) {
        if(!player.super){
            this.hitSound.play('', 0 , 0.5, false);
            UI.lifeValue -= 0.2;
            player.super = true;
            if(enemy.x - player.x < 0) {
                player.body.acceleration.x = 50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            } else {
                player.body.acceleration.x = -50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            }
        }
    },
    energyUpdate: function() {
        game.physics.arcade.overlap(player, this.energy, this.energyHelper, null, this);

    },
    energyHelper: function(player, energy) {
        this.collectSound.play('', 0, 0.5, false);
        UI.energyValue += 0.4;
        energy.kill();
    },
    healthUpdate: function() {
        game.physics.arcade.overlap(player, this.health, this.healthHelper, null, this);
    },
    healthHelper: function(player, health) {
        this.collectSound.play('', 0, 0.5, false);
        UI.lifeValue += 0.4;
        health.kill();
    },
    fireBallUpdate: function() {
        game.physics.arcade.collide(this.fireBall, this.helper);
        game.physics.arcade.overlap(player, this.fireBall, this.fireBallHelper, null, this);
    },
    fireBallHelper: function(player, fireBall) {
        if(!player.super){
            this.hitSound.play('', 0 , 0.5, false);
            UI.lifeValue -= 0.2;
            player.super = true;
            if(fireBall.x - player.x < 0) {
                player.body.acceleration.x = 50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            } else {
                player.body.acceleration.x = -50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            }
        }
    },
    thronUpdate: function() {
        if(this.thornDown.getChildAt(0).y > 2243) {
            this.thornDown.setAll('y',2243);
            this.thornDown.setAll('body.velocity.y', 0);
        }
        else if (this.thornDown.getChildAt(0).y < 2147) {
            this.thornDown.setAll('y',2147);
            this.thornDown.setAll('body.velocity.y', 0);
        }
        if(this.thornUp.getChildAt(0).y < 2147) {
            this.thornUp.setAll('y',2147);
            this.thornUp.setAll('body.velocity.y', 0);
        }else if(this.thornUp.getChildAt(0).y > 2243) {
            this.thornUp.setAll('y',2243);
            this.thornUp.setAll('body.velocity.y', 0);
        }
        game.physics.arcade.overlap(player, this.thornDown,this.thronHelper, null, this);
        game.physics.arcade.overlap(player, this.thornUp,this.thronHelper, null, this);
        game.physics.arcade.overlap(player, this.movethron,this.thronHelper, null, this);
    },
    thronHelper: function(player, thorn) {
        if(!player.super){
            this.hitSound.play('', 0 , 0.5, false);
            UI.lifeValue -= 0.2;
            player.super = true;
            if(thorn.x - player.x < 0) {
                player.body.acceleration.x = 50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            } else {
                player.body.acceleration.x = -50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            }
        }
    },
    switchUpdate: function() {
        game.physics.arcade.overlap(player, this.switch,this.switchHelper, null, this);
    },
    switchHelper: function(player, switchs) {
        if(!switchs.isOn) {
            this.switchSound.play('', 0, 0.5, false);
            switchs.frame = 1;
            if(this.switch.getChildIndex(switchs) === 0) {
                this.movethron.callAll('kill');
            }
            else if(this.switch.getChildIndex(switchs) === 1) {
                this.door.callAll('kill');
            }
        }
    },

    clearItemUpdate: function() {
        game.physics.arcade.overlap(player, this.clearItem, this.clearItemHelper, null, this);
    },

    clearItemHelper: function() {
        partOne = true;
        game.state.start('levelMenu');
    }
}
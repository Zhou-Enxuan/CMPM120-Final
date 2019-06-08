function Objects_ice(game, myTilemap, floor) {
    //add the helper objects
    this.floor = floor;
    this.helper = game.add.group();
    this.helper.enableBody = true;
    myTilemap.createFromObjects('helper', 1, 'assets', 1, true, true, this.helper);
    this.helper.setAll('alpha', 0);
    this.helper.setAll('body.immovable', true);
    //add ther detector
    this.detector = game.add.group();
    this.detector.enableBody = true;
    myTilemap.createFromObjects('detector', 1, 'assets', 1, true, true, this.detector);
    this.detector.setAll('alpha', 0);
    this.detector.setAll('body.immovable', true);
    //adding the iceCone trap
    this.iceCone = game.add.group();
    this.iceCone.enableBody = true;
    myTilemap.createFromObjects('ice cone', 22, 'objects2', 12, true, true, this.iceCone);
    this.iceCone.setAll('body.gravity.y', 0);
    this.iceBack = [];
    this.iceCone.forEach(function(ice) {
        this.iceBack.push(ice.y);
        //console.log(this.iceBack);
    }, this)
    //console.log(this.iceBack.length);
    game.time.events.loop(Phaser.Timer.SECOND * 4.5, function() {
        for(i = 0; i < this.iceCone.length - 1; i++) {
            if(i % 2 === 0) {
                this.iceCone.getChildAt(i).body.gravity.y = 3000;
            }
        }
    }, this);

    game.time.events.loop(Phaser.Timer.SECOND * 6, function() {
        for(i = 0; i < this.iceCone.length - 1; i++) {
            if(i % 2 !== 0) {
                this.iceCone.getChildAt(i).body.gravity.y = 3000;
            }
        }
    }, this);
    //adding the moving blocks 
    this.blocks = [];
    this.blocks.push(game.add.group());
    this.blocks[0].enableBody = true;
    myTilemap.createFromObjects('moving block', 1, 'asset2', 0, true, true, this.blocks[0]);
    myTilemap.createFromObjects('moving block', 2, 'asset2', 1, true, true, this.blocks[0]);
    myTilemap.createFromObjects('moving block', 3, 'asset2', 2, true, true, this.blocks[0]);
    this.blocks[0].setAll('body.velocity.x', 100)
    this.blocks[0].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[1].enableBody = true;
    myTilemap.createFromObjects('moving block 2', 1, 'asset2', 0, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 2', 2, 'asset2', 1, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 2', 3, 'asset2', 2, true, true, this.blocks[1]);
    this.blocks[1].setAll('body.velocity.x', 100)
    this.blocks[1].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[2].enableBody = true;
    myTilemap.createFromObjects('moving block 3', 1, 'asset2', 0, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 3', 2, 'asset2', 1, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 3', 3, 'asset2', 2, true, true, this.blocks[2]);
    this.blocks[2].setAll('body.velocity.x', 100)
    this.blocks[2].setAll('body.immovable', true);
    //add top down blocks
    this.TDBlock = game.add.group();
    this.TDBlock.enableBody = true;
    myTilemap.createFromObjects('topDownBlock', 1, 'asset2', 0, true, true, this.TDBlock);
    myTilemap.createFromObjects('topDownBlock', 2, 'asset2', 1, true, true, this.TDBlock);
    myTilemap.createFromObjects('topDownBlock', 3, 'asset2', 2, true, true, this.TDBlock);
    this.TDBlock.setAll('body.velocity.y', 100);
    this.TDBlock.setAll('body.immovable', true)
    //add dropping blocks
    this.dropBlock = game.add.group();
    this.dropBlock.enableBody = true; 
    myTilemap.createFromObjects('drop block', 10, 'objects2', 0, true, true, this.dropBlock);
    myTilemap.createFromObjects('drop block', 11, 'objects2', 1, true, true, this.dropBlock);
    myTilemap.createFromObjects('drop block', 12, 'objects2', 2, true, true, this.dropBlock);
    this.dropBlock.setAll('body.immovable', true);
    this.dropBlock.setAll('isChecked', false);
    //add the snowball
    this.snowBalls = game.add.group();
    this.snowBalls.enableBody = true;
    myTilemap.createFromObjects('snowball', 17, 'objects2', 7, true, true, this.snowBalls);
    this.snowBalls.setAll('body.gravity.y', 3000);
    this.snowBalls.setAll('detected', false);
    this.snowBalls.callAll('anchor.setTo', 'anchor', 0.5);
    this.snowBalls.callAll('animations.add', 'animations', 'split', [7,8,9], 10, false);
    //add thone
    this.thornUp = game.add.group();
    this.thornUp.enableBody = true;
    myTilemap.createFromObjects('cer_up', 14, 'objects2', 4, true, true, this.thornUp);
    this.thornUp.callAll('body.setSize', 'body', 28, 25, 2, 7);
    this.thronflag = false;
    this.thornDown = game.add.group();
    this.thornDown.enableBody = true;
    myTilemap.createFromObjects('cer_energy', 14, 'objects2', 4, true, true, this.thornDown);
    this.thornDown.callAll('body.setSize', 'body', 28, 25, 2, 7);
    game.time.events.loop(Phaser.Timer.SECOND * 1, function(){
        if(!this.thronflag) {
            this.thornUp.setAll('body.velocity.y', -100);
            this.thronflag = true;
        }
        else {
            this.thornUp.setAll('body.velocity.y', 100);
            this.thronflag = false;
        }

    },this);
    //add unbreakable snowball
    this.specialSnowBall = game.add.group();
    this.specialSnowBall.enableBody = true;
    myTilemap.createFromObjects('specialSnowBall', 17, 'objects2', 7, true, true, this.specialSnowBall);
    this.specialSnowBall.callAll('anchor.setTo', 'anchor', 0.5);
    this.specialSnowBall.setAll('body.gravity.y', 3000);
    this.specialSnowBall.setAll('body.velocity.x', 300);
    this.specialSnowBall.setAll('body.angularVelocity', 400);
    //add ice danger
    this.danger = game.add.group();
    this.danger.enableBody = true;
    myTilemap.createFromObjects('danger', 16, 'objects2', 6, true, true, this.danger);
    this.danger.setAll('body.immovable', true);
    //objects energy/health item
    this.energy = game.add.group();
    this.energy.enableBody = true;
    myTilemap.createFromObjects('energy', 13, 'objects2', 3, true, true, this.energy);
    game.add.tween(this.energy).to( {y: 2}, 300, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    this.health = game.add.group();
    this.health.enableBody = true;
    myTilemap.createFromObjects('health', 15, 'objects2', 5, true, true, this.health);
    game.add.tween(this.health).to( {y: 2}, 300, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
    //add key
    this.switch = game.add.group();
    this.switch.enableBody = true;
    myTilemap.createFromObjects('key_for_door', 28, 'objects2', 17, true, true, this.switch);
    this.switch.getChildAt(0).isOn = false;
    //add door
    this.door = game.add.group();
    this.door.enableBody = true;
    myTilemap.createFromObjects('door for final', 16, 'objects2', 6, true, true, this.door);
    this.door.setAll('body.immovable', true);
}

Objects_ice.prototype = {
    objectAllupdate: function() {
        this.iceConeUpdate();
        this.blocksUpdate();
        this.dropBlockUpdate();
        this.snowBallsUpdate();
        this.thronUpdate();
        this.slideFloorUpdate();
        this.healthUpdate();
        this.energyUpdate();
        this.switchUpdate();
        //console.log(player.x + " and " + player.y);
        game.physics.arcade.collide(player, this.danger);
        game.physics.arcade.collide(player, this.door);
    },

    iceConeUpdate: function() {
        game.physics.arcade.collide(this.iceCone, this.helper,this.iceConeHelper, null, this);
        game.physics.arcade.overlap(player, this.iceCone,this.iceConeHelper2, null, this);
        this.iceCone.forEach(function(ice){
            if(ice.scale.y < 2) {
                ice.y = this.iceBack[this.iceCone.getChildIndex(ice)];
                ice.scale.y += 0.01;
            }
        }, this);
        

    },

    iceConeHelper: function(iceCone, helper) {
        iceCone.body.gravity.y = 0;
        iceCone.scale.y = 0;
    },

    iceConeHelper2: function(player, iceCone) {
        if(!player.super){
            UI.lifeValue -= 0.2;
            player.super = true;
            if(iceCone.x - player.x < 0) {
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

    blocksUpdate: function() {
        this.i = 0;
        for(;this.i < this.blocks.length; this.i++) {
            game.physics.arcade.collide(player, this.blocks[this.i]);
            game.physics.arcade.overlap(this.blocks[this.i], this.helper, this.blocksHelper, null, this);
        }
        game.physics.arcade.overlap(this.TDBlock, this.helper, this.TDblocksHelper, null, this);
        game.physics.arcade.collide(player, this.TDBlock);


    },

    blocksHelper(block, helper) {
        this.blocks[this.i].setAll('body.velocity.x', block.body.velocity.x * -1) 
    },

    TDblocksHelper: function(block, helper) {
        block.body.velocity.y *= -1;
    },

    dropBlockUpdate: function() {
        game.physics.arcade.collide(player, this.dropBlock,this.dropBlockHelper, null, this);

    },

    dropBlockHelper: function(player, block) {
        if(block.body.touching.up){
            if(!block.isChecked){
                this.Effect = game.add.tween(block)
                this.Effect.to( {alpha: 0}, 300, Phaser.Easing.Default, true, 0, false).yoyo(true);
            
                game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
                    block.body.velocity.y = 500;
                }, this)

                game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                    block.kill();
                }, this)          
            }
            block.isChecked = true;
        }
    },

    snowBallsUpdate: function() {
        game.physics.arcade.overlap(player, this.detector, this.snowBallsHelper2, null, this);
        game.physics.arcade.overlap(player, this.snowBalls, this.snowBallsHelper, null, this);
        game.physics.arcade.overlap(player, this.specialSnowBall, this.snowBallsHelper5, null, this);
        game.physics.arcade.collide(this.snowBalls, this.floor);
        game.physics.arcade.collide(this.specialSnowBall, this.floor);
        game.physics.arcade.overlap(this.snowBalls, this.helper, this.snowBallsHelper3, null, this);
        game.physics.arcade.overlap(this.specialSnowBall, this.helper, this.snowBallsHelper4, null, this);
        this.snowBalls.forEach(function(snowball){
            //console.log(this.snowBalls.getChildIndex(snowball) + ': ' + snowball.body.velocity.x);
            if(snowball.body.velocity.x < 0) {
                snowball.scale.x += 0.01;
                snowball.scale.y += 0.01;
                snowball.body.velocity.x--;
            } else if(snowball.body.velocity.x > 0) {
                snowball.scale.x += 0.01;
                snowball.scale.y += 0.01;
                snowball.body.velocity.x++;
            }

            if(snowball.animations.getAnimation('split').isFinished) {
                snowball.kill();
            }
        },this);
        

    },

    snowBallsHelper: function(player, snowball) {
        //console.log('snowBall: ', this.snowBalls.getChildIndex(snowBalls));
        if(!player.super){
            UI.lifeValue -= 0.2;
            UI.temp -= 50;
            player.super = true;
            if(snowball.x - player.x < 0) {
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

        if(snowball.animations.getAnimation('split').isFinished) {
            snowball.kill();
        }

        if(!snowball.animations.getAnimation('split').isPlaying){
            snowball.body.velocity.x = 0;
            snowball.body.angularVelocity = 0;
            snowball.animations.play('split');
        }
        console.log(snowball.animations.getAnimation('split').isPlaying);
    },

    snowBallsHelper2: function(player, helper) {
        //console.log('detector: ', this.detector.getChildIndex(helper));
        if(this.snowBalls.getChildAt(this.detector.getChildIndex(helper)).x > player.x){
            this.snowBalls.getChildAt(this.detector.getChildIndex(helper)).body.velocity.x = -200
            this.snowBalls.getChildAt(this.detector.getChildIndex(helper)).body.angularVelocity = -400;
        }
        else {
            this.snowBalls.getChildAt(this.detector.getChildIndex(helper)).body.velocity.x = 200
            this.snowBalls.getChildAt(this.detector.getChildIndex(helper)).body.angularVelocity = 400;           
        }
        helper.kill();
        //this.snowBalls.getChildAt(this.detector.getChildIndex(helper)).detected = true;

    }, 

    snowBallsHelper3: function(snowball, helper) {
        if(snowball.animations.getAnimation('split').isFinished) {
            snowball.kill();
        }

        if(!snowball.animations.getAnimation('split').isPlaying){
            snowball.body.velocity.x = 0;
            snowball.body.angularVelocity = 0;
            snowball.animations.play('split');
        }
    },

    snowBallsHelper4: function(snowBall, helper) {
        snowBall.body.velocity.x *= -1;
        snowBall.body.angularVelocity *= -1;
        console.log(snowBall.body.velocity.x);
    },

    snowBallsHelper5: function(player, snowBall) {
        if(!player.super){
            UI.lifeValue -= 0.2;
            UI.temp -= 50;
            player.super = true;
            if(snowBall.x - player.x < 0) {
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
        if(this.thornUp.getChildAt(0).y < 576) {
            this.thornUp.setAll('y', 576);
            this.thornUp.setAll('body.velocity.y', 0);
        }else if(this.thornUp.getChildAt(0).y > 624) {
            this.thornUp.setAll('y', 624);
            this.thornUp.setAll('body.velocity.y', 0);
        }
        game.physics.arcade.overlap(player, this.thornUp,this.thronHelper, null, this);
        game.physics.arcade.overlap(player, this.thornDown,this.thronHelper, null, this);

    },

    thronHelper: function(player, thorn) {
        //console.log(thorn.z);
        if(!player.super){
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
    slideFloorUpdate: function() {
        this.onIce = game.physics.arcade.collide(player, this.slideFloor, this.slideFloorHelper, null, this);
        game.physics.arcade.collide(this.snowBalls, this.slideFloor)
        if(!this.onIce) {
            player.body.drag.setTo(0, 0);
        }
    },

    slideFloorHelper: function(player, slideFloor) {
        player.body.drag.setTo(600, 0);
    },    
    energyUpdate: function() {
        game.physics.arcade.overlap(player, this.energy, this.energyHelper, null, this);

    },
    energyHelper: function(player, energy) {
        UI.energyValue += 0.4;
        energy.kill();
    },
    healthUpdate: function() {
        game.physics.arcade.overlap(player, this.health, this.healthHelper, null, this);
    },
    healthHelper: function(player, health) {
        UI.lifeValue += 0.4;
        health.kill();
    },
    switchUpdate: function() {
        game.physics.arcade.overlap(player, this.switch,this.switchHelper, null, this);
    },
    switchHelper: function(player, switchs) {
        //console.log(this.switch.getChildIndex(switchs));
        if(!switchs.isOn) {
            switchs.frame = 11;
            this.door.callAll('kill');
        }
    }
}
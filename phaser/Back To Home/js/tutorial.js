var Tutorial = function(game) {};

Tutorial.prototype = {
    create: function() {
        level_stage = 'valcano';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        game.add.tileSprite(0, 320, 3904, 1280, 'BG');

        this.map = game.add.tilemap('tutorial-level');
        this.map.addTilesetImage('text', 'text');
        this.map.addTilesetImage('tour', 'tour');
        this.map.addTilesetImage('test2', 'assets');

        this.map.setCollisionByExclusion([]);

        this.floor = this.map.createLayer('floor');
        this.instruction = this.map.createLayer('text');

        this.floor.resizeWorld();

        BGM = game.add.audio('BGM');
        BGM.play('', 0, 0.5, true);

        player = new Player(game,60, 704,'UI','robot_0001');
        game.add.existing(player);

        this.lava = game.add.group();
        this.lava.enableBody = true;
        this.map.createFromObjects('lava', 7, 'assets', 6, true, true, this.lava);
        this.map.createFromObjects('lava', 8, 'assets', 7, true, true, this.lava);

        this.energy = game.add.group();
        this.energy.enableBody = true;
        this.map.createFromObjects('energy', 31, 'objects', 9, true, true, this.energy);
        game.add.tween(this.energy).to( {y: 2}, 300, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
        this.health = game.add.group();
        this.health.enableBody = true;
        this.map.createFromObjects('blood', 38, 'objects', 16, true, true, this.health);
        game.add.tween(this.health).to( {y: 2}, 300, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);
        this.collectSound = game.add.audio('item');

        this.helper = game.add.group();
        this.helper.enableBody = true;
        this.map.createFromObjects('helper', 1, 'assets', 1, true, true, this.helper);
        this.helper.setAll('alpha', 0);
        this.helper.setAll('body.immovable', true);

        this.lava.callAll('animations.add', 'animations', 'lava1', [6,7], 10, true);
        this.lava.callAll('animations.add', 'animations', 'lava2', [7,6], 10, true);

        this.lava.forEach(function(item){
            if(item.frame === 6) {
                item.animations.play('lava1');
            } else if (item.frame === 7) {
                item.animations.play('lava2');
            }
        });

        UI = new myUI(game);

        this.camera = game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //add a deadzone of camera for a better camera view
        game.camera.deadzone = new Phaser.Rectangle(350, 200, 100, 200);
        if(game.camera.deadzone !== null) {
            this.zx = game.camera.deadzone.x;
			this.zy = game.camera.deadzone.y;
			this.zone = new Phaser.Rectangle(this.zx, this.zy, game.camera.deadzone.width, game.camera.deadzone.height);
        }
        this.moveup =true;
        //console.log(UI.pointerPos);
        this.tempGrow = game.time.events.loop(Phaser.Timer.SECOND * 0.5, function() {
            UI.temp++;
            UI.tempChanged = true;
        }, this);

        this.zflag = true;

    },

    update: function() {
        if(game.camera.deadzone !== null) {
			this.zone.x = this.zx + game.camera.x;
			this.zone.y = this.zy + game.camera.y;
        }

        UI.updateUI();

        game.physics.arcade.collide(player, this.floor);
        this.isHitLava = game.physics.arcade.overlap(player, this.lava, this.hitLava, null, this);

        if(!this.isHitLava) {
            if(!this.zflag) {
                game.world.moveDown(this.floor);
            }
            this.zflag = true;
        }
        this.energyUpdate();
        this.healthUpdate();

        game.physics.arcade.overlap(player, this.helper, this.finished, null, this);
    },

    hitLava: function(player, lava) {
        if(!player.super) {
            UI.temp = 240;
            UI.tempChanged = true;
            player.super = true;
        }
        if(this.zflag) {
            game.world.moveUp(this.floor);
        }
        this.zflag = false;
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

    finished: function() {
        game.state.start('levelMenu');
    }

}
var Ice = function(game) {};

Ice.prototype = {
    create: function() {
        level_stage = 'ice';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.TILE_BIAS = 32;
        game.add.image(64,320,'Ice-BG');

        this.map = game.add.tilemap('Ice-level');
        this.map.addTilesetImage('asset2', 'asset2');

        this.map.setCollisionByExclusion([]);

        //creating layer in tilemaps
        this.floor = this.map.createLayer('ice');
        //resize the world to tilemap size
        this.floor.resizeWorld();

        mapObjects = new Objects_ice(game, this.map, this.floor);
        console.log(this.floor.z);
        game.world.bringToTop(this.floor);


        player = new Player(game,200,416,'UI','robot_0001');
        game.add.existing(player);

        this.water = game.add.group();
        this.water.enableBody = true;
        this.map.createFromObjects('water', 7, 'asset2', 6, true, true, this.water);
        this.map.createFromObjects('water', 8, 'asset2', 7, true, true, this.water);
        this.water.setAll('anchor.x', 0.5);

        game.time.events.loop(Phaser.Timer.SECOND * 0.25, function() {
            this.water.setAll('scale.x', this.water.getChildAt(0).scale.x * -1);
        }, this);

        UI = new myUI(game);

        this.camera = game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        game.camera.deadzone = new Phaser.Rectangle(350, 200, 100, 200);
        if(game.camera.deadzone !== null) {
            this.zx = game.camera.deadzone.x;
			this.zy = game.camera.deadzone.y;
			this.zone = new Phaser.Rectangle(this.zx, this.zy, game.camera.deadzone.width, game.camera.deadzone.height);
        }
        
        this.tempDrop = game.time.events.loop(Phaser.Timer.SECOND * 0.5, function() {
            UI.temp--;
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
        mapObjects.objectAllupdate();

        game.physics.arcade.collide(player, this.floor);

        this.isHitwater = game.physics.arcade.overlap(player, this.water, this.hitwater, null, this);

        if(!this.isHitwater) {
            if(!this.zflag) {
                game.world.moveDown(this.floor);
                this.water.setAll('alpha',1);
            }
            this.zflag = true;
        }

    },

    hitwater: function(player, water) {
        if(!player.super) {
            UI.temp = -240;
            UI.tempChanged = true;
            player.super = true;
        }
        if(this.zflag) {
            game.world.moveUp(this.floor);
            this.water.setAll('alpha',0.5);
        }
        this.zflag = false;
    }
};
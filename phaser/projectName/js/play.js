var Play = function(game) {};
Play.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        game.add.tileSprite(0, 320, 2432, 928, 'BG');

        this.map = game.add.tilemap('level');
        this.map2 = game.add.tilemap('level-2');
        this.map3 = game.add.tilemap('level-3');
        this.map.addTilesetImage('sucai', 'assets');
        this.map2.addTilesetImage('sucai', 'assets');
        this.map3.addTilesetImage('sucai', 'assets');

		this.map.setCollisionByExclusion([]);
        this.map2.setCollisionByExclusion([]);
        this.map3.setCollisionByExclusion([]);

        this.heatFloor = this.map2.createLayer('danger');
        this.floor = this.map.createLayer('floor');
        this.lava = this.map3.createLayer('lava');

        this.floor.resizeWorld();

        this.BGM = game.add.audio('BGM');
        this.BGM.play('', 0, 0.5, true);

        this.heatSound = game.add.audio('heat');

        this.hot = game.add.sprite(0, 0, 'hot');
        this.hot.alpha = 0;
        this.hot.fixedToCamera = true;
        this.cold = game.add.sprite(0, 0, 'cold');
        this.cold.alpha = 0;
        this.cold.fixedToCamera = true;

        this.touchHeat = false;

        UI = new myUI(game);
        player = new Player(game,0,385,'UI','robot_0001');
        game.add.existing(player);
        this.camera = game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        game.camera.deadzone = new Phaser.Rectangle(350, 200, 100, 200);
        if(game.camera.deadzone !== null) {
            this.zx = game.camera.deadzone.x;
			this.zy = game.camera.deadzone.y;
			this.zone = new Phaser.Rectangle(this.zx, this.zy, game.camera.deadzone.width, game.camera.deadzone.height);
		}

        UI.temp = 200;
        this.debug = false;
        //console.log(UI.pointerPos);
        UI.pointerPos = 400 + UI.temp;
        UI.pointer.x += 300;

    },

    update: function() {
        //console.log(UI.pointer.x);
        if(game.camera.deadzone !== null) {
			this.zone.x = this.zx + game.camera.x;
			this.zone.y = this.zy + game.camera.y;
        }

        if(this.input.keyboard.justPressed(Phaser.Keyboard.T)){
            this.debug = !this.debug;
            console.log(this.debug);
        }

        if(this.hot.alpha > 0 && !this.touchHeat) {
            this.hot.alpha -=0.01;
            console.log('work');
        }

        if(!this.touchHeat) {
            this.heatSound.stop();
        }

        // if(UI.pointer.x > UI.pointerPos) {
        //     UI.pointer.x--;
        //     console.log('UI--: ' + UI.pointer.x);
        // }

        // if(UI.pointer.x < UI.pointerPos) {
        //     UI.pointer.x += 100;
        //     console.log('UI++: ' + UI.pointer.x);
        // }

        //console.log('UIx is: ' + UI.pointer.x);
        //console.log('UI is: ' + UI.pointerPos);

        this.touchHeat = game.physics.arcade.collide(player, this.heatFloor, this.touchLava, null, this);
        game.physics.arcade.collide(player, this.floor);

        //console.log(UI.pointerPos);

    },

    touchLava: function(player, lava) {
        if (this.hot.alpha < 1) {
            this.hot.alpha += 0.01;
        }
        if(!this.heatSound.isPlaying) {
            this.heatSound.play('', 0, 0.5, true);
        }
        console.log('touched lava');

    }, 
    render: function() {
        if(this.debug) {
            game.debug.cameraInfo(game.camera, 32, 32);

            if(game.camera.deadzone !== null) {
			    game.debug.geom(this.zone, 'rgba(255,0,0,0.25');
            }
        }

    }
};
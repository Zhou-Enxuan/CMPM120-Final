var Play = function(game) {};
Play.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        game.add.tileSprite(0, 0, 2432, 928, 'BG');

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

        UI = new myUI(game);
        player = new Player(game,0,0,'dude',4);
        game.add.existing(player);
        this.camera = game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        game.camera.deadzone = new Phaser.Rectangle(350, 200, 100, 200);
        if(game.camera.deadzone !== null) {
            this.zx = game.camera.deadzone.x;
			this.zy = game.camera.deadzone.y;
			this.zone = new Phaser.Rectangle(this.zx, this.zy, game.camera.deadzone.width, game.camera.deadzone.height);
		}

        console.log(this.zx);
        UI.temp = 200;
        this.debug = false;
        //console.log(UI.pointerPos);

    },

    update: function() {

        if(game.camera.deadzone !== null) {
			this.zone.x = this.zx + game.camera.x;
			this.zone.y = this.zy + game.camera.y;
        }

        if(this.input.keyboard.justPressed(Phaser.Keyboard.T)){
            this.debug = !this.debug;
            console.log(this.debug);
        }
        
        game.physics.arcade.collide(player, this.heatFloor, this.touchLava, null, this);
        game.physics.arcade.collide(player, this.floor);

        //console.log(UI.pointerPos);

    },

    touchLava: function(player, lava) {
        player.kill();
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
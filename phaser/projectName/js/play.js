var Play = function(game) {};
Play.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        game.add.sprite(0,0,'BG');

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

        player = new Player(game,0,0,'dude',4);
        game.add.existing(player);
        this.camera = game.camera.follow(player, 0, 0.5, 0.5);

    },

    update: function() {
        game.physics.arcade.collide(player, this.heatFloor, this.touchLava, null, this);
        game.physics.arcade.collide(player, this.floor);

    },

    touchLava: function(player, lava) {
        player.kill();
        console.log('touched lava');

    }
};
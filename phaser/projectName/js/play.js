var Play = function(game) {};
Play.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        this.map = game.add.tilemap('level');
        this.map.addTilesetImage('map1', 'floor');
        this.map.addTilesetImage('map2', 'lava');

		this.map.setCollisionByExclusion([]);

        this.heatFloor = this.map.createLayer('heat');
        this.floor = this.map.createLayer('floor');
        this.lava = this.map.createLayer('lava');

        this.floor.resizeWorld();

        player = new Player(game,0,0,'dude',4);
        game.add.existing(player);
        game.camera.follow(player, 0, 0.5, 0.5);

    },

    update: function() {
        game.physics.arcade.collide(player, this.heatFloor);
        game.physics.arcade.collide(player, this.floor);

    }
};
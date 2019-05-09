var Play = function(game) {};
Play.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        this.map = game.add.tilemap('level');
        this.map.addTilesetImage('sucai', 'floor');
        this.map.addTilesetImage('danger', 'lava');

		this.map.setCollisionByExclusion([]);

        this.lava = this.map.createLayer('lava');
        this.floor = this.map.createLayer('floors');

        this.floor.resizeWorld();
        

        player = new Player(game,400,500,'dude',4);
        game.add.existing(player);

        game.camera.follow(player, 0, 0.5, 0.5);

    },

    update: function() {
        game.physics.arcade.collide(player, this.floor);


    }
};
var Load = function(game) {};
Load.prototype = {
	preload: function() {
        game.load.path = './assets/img/';
        game.load.tilemap('level', 'map_temp.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('floor', 'sucai.png', 128, 128);
		game.load.spritesheet('lava', 'danger.png', 128, 128);
		game.load.spritesheet('enemy','baddie.png',32,32);
		game.load.spritesheet('dude', 'dude.png',32,48);
	},
	create: function() {
		
        game.state.start('Play');
	}
};
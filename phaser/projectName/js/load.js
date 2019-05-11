var Load = function(game) {};
Load.prototype = {
	preload: function() {
        game.load.path = './assets/img/';
	game.load.tilemap('level', 'Vol1_floor.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level-2', 'Vol1_danger.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level-3', 'Vol1_lava.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('assets', 'sucai.png', 32, 32);
	game.load.spritesheet('lava', 'danger.png', 32, 32);
	game.load.spritesheet('enemy','baddie.png',32,32);
	game.load.spritesheet('dude', 'dude.png',32,48);
	},
    create: function() {
	//fix the size
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.state.start('Play');
    }
};

// “Sound effects obtained from https://www.zapsplat.com“
// “Additional sound effects from https://www.zapsplat.com“
// “Music from https://www.zapsplat.com“
//vol_BGM author: Trevor Lentz
//Fire_heating resouse are use from SoundJay.com
var Load = function(game) {};
Load.prototype = {
	// load the assets
	preload: function() {
        game.load.path = './assets/img/';
		game.load.tilemap('level', 'Vol1_floor.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.images(['BG', 'hot', 'cold'],['volcano_theme.png','Hot.png','Cold.png']);
		game.load.atlas('UI','UI.png','UI.json');
        game.load.spritesheet('assets', 'assets.png', 32, 32);
		game.load.spritesheet('objects', 'object.png', 32, 32);
		game.load.path = './assets/audio/';
		game.load.audio('jump',['jump.mp3']);
		game.load.audio('BGM',['vol_BGM.mp3']);
		game.load.audio('heat',['fire_heating.mp3']);
	},
    create: function() {
	//fix the size
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
        //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	//start the playing stage
        game.state.start('Play');
    }
};

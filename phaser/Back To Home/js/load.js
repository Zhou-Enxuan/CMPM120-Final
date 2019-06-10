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
		game.load.tilemap('Ice-level', 'ice_stage.json',null,Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('tutorial-level', 'tutorial.json', null, Phaser.Tilemap.TILED_JSON)
		game.load.images(['mainMenu','levelMenu','credits','BG', 'Ice-BG','end','hot', 'cold','rocket'],['mainMenu.png','levelMenu.png', 'citation.png','volcano_theme.png','ice_theme.png','EndScene.png','Hot.png','Cold.png','rocket.png']);
		game.load.atlas('UI','UI.png','UI.json');
		game.load.spritesheet('assets', 'assets.png', 32, 32);
		game.load.spritesheet('asset2', 'asset_2.png', 32, 32);
		game.load.spritesheet('objects', 'object.png', 32, 32);
		game.load.spritesheet('objects2', 'ice_object.png', 32, 32);
		game.load.spritesheet('tour', 'tour.png', 32, 32);
		game.load.spritesheet('text', 'text.png', 32, 32);
		game.load.path = './assets/audio/';
		game.load.audio('jump', ['jump.mp3']);
		game.load.audio('BGM', ['vol_BGM.mp3']);
		game.load.audio('heat', ['fire_heating.mp3']);
		game.load.audio('fronze', ['frozen.mp3']);
		game.load.audio('ice_BGM', ['ice_bgm.mp3']);
		game.load.audio('item', ['item.mp3']);
		game.load.audio('hit', ['hit.mp3']);
		game.load.audio('button', ['button.mp3']);
		game.load.audio('switch', ['Switch.mp3']);
		game.load.audio('snowball', ['snowball.mp3']);
		game.load.audio('dash', ['dash_jump.mp3'])
		game.load.audio('portal', ['portal.mp3']);
		game.load.audio('charge',['EnergyUse.mp3']);
		game.load.audio('rocket', ['rocket.mp3']);
	},
    create: function() {
	//fix the size
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
        //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	//start the playing stage
        game.state.start('mainMenu');
    }
};

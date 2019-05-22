//add global variable
var player;
var UI;
var moveup

//load window
window.onload = function() {
	game = new Phaser.Game(800,600, Phaser.AUTO, 'Game');

	game.state.add('Load', Load);
	game.state.add('Play', Play);
	game.state.start('Load');
}

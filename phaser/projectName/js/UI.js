//creating game UI
function myUI(game) {
    //add the tempture bar
    this.tempbar = game.add.sprite(400, 30, 'UI', 'temp_bar');
    this.tempbar.anchor.set(0.5);
    //make it stay on screen while camera is moving
    this.tempbar.fixedToCamera = true;
    //add the pointer on temputure bar
    this.pointer = game.add.sprite(400, 20, 'UI', 'pointer');
    this.pointer.anchor.set(0.5);
    this.pointer.scale.setTo(0.5);
    this.pointer.fixedToCamera = true;
    //add a heart to repersent life
    this.life = game.add.sprite(5,5,'UI','life-1');
    this.life.scale.setTo(0.5);
    this.life.fixedToCamera = true;
    //numer repersent life left for player
    this.lifeNum = 5;
    //the current temputre
    this.temp = 0;
    //where the pointer should be depend on temp
    this.pointerPos = 400;
    //add text next to heart to show numbers of life left for player
    this.lifeText = game.add.text(45, 5, 'X ' + this.lifeNum, {font: "25px Arial", fill: "#00000"});
    this.lifeText.fixedToCamera = true;
}

myUI.prototype = Object.create(Phaser.Sprite.prototype);
myUI.prototype.constructor = myUI;

// myUI.prototype.update = function() {
//         this.pointerPos = 400 + this.temp;
//         while(this.pointer.x > this.pointerPos) {
//             this.pointer.x--;
//         }

//         while(this.pointer.x < this.pointerPos) {
//             this.pointer.x++;
//         }

//         console.log('UI is: ' + this.pointerPos);
// }
function myUI(game) {
    this.tempbar = game.add.sprite(400, 30, 'UI', 'temp_bar');
    this.tempbar.anchor.set(0.5);
    this.tempbar.fixedToCamera = true;
    this.pointer = game.add.sprite(400, 20, 'UI', 'pointer');
    this.pointer.anchor.set(0.5);
    this.pointer.scale.setTo(0.5);
    this.pointer.fixedToCamera = true;
    this.life = game.add.sprite(5,5,'UI','life-1');
    this.life.scale.setTo(0.5);
    this.life.fixedToCamera = true;
    this.lifeNum = 5;
    this.temp = 0;
    this.pointerPos = 400;
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
function myObjects(game, myTilemap) {
    this.helper = game.add.group();
    this.helper.enableBody = true;
    myTilemap.createFromObjects('helper', 1, 'assets', 1, true, true, this.helper);
    this.helper.setAll('alpha', 0);
    this.blocks = [];
    this.blocks.push(game.add.group());
    this.blocks[0].enableBody = true;
    myTilemap.createFromObjects('moving block 0', 2, 'assets', 1, true, true, this.blocks[0]);
    this.blocks[0].setAll('body.velocity.y', 100)
    this.blocks[0].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[1].enableBody = true;
    myTilemap.createFromObjects('moving block 1', 1, 'assets', 0, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 1', 2, 'assets', 1, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 1', 3, 'assets', 2, true, true, this.blocks[1]);
    this.blocks[1].setAll('body.velocity.y', 100)
    this.blocks[1].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[2].enableBody = true;
    myTilemap.createFromObjects('moving block 2', 1, 'assets', 0, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 2', 2, 'assets', 1, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 2', 3, 'assets', 2, true, true, this.blocks[2]);
    this.blocks[2].setAll('body.velocity.y', 100)
    this.blocks[2].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[3].enableBody = true;
    myTilemap.createFromObjects('moving block 3', 1, 'assets', 0, true, true, this.blocks[3]);
    myTilemap.createFromObjects('moving block 3', 2, 'assets', 1, true, true, this.blocks[3]);
    myTilemap.createFromObjects('moving block 3', 3, 'assets', 2, true, true, this.blocks[3]);
    this.blocks[3].setAll('body.velocity.y', 100)
    this.blocks[3].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[4].enableBody = true;
    myTilemap.createFromObjects('moving block 4', 1, 'assets', 0, true, true, this.blocks[4]);
    myTilemap.createFromObjects('moving block 4', 2, 'assets', 1, true, true, this.blocks[4]);
    myTilemap.createFromObjects('moving block 4', 3, 'assets', 2, true, true, this.blocks[4]);
    this.blocks[4].setAll('body.velocity.y', 100)
    this.blocks[4].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[5].enableBody = true;
    myTilemap.createFromObjects('moving block 5', 1, 'assets', 0, true, true, this.blocks[5]);
    myTilemap.createFromObjects('moving block 5', 2, 'assets', 1, true, true, this.blocks[5]);
    myTilemap.createFromObjects('moving block 5', 3, 'assets', 2, true, true, this.blocks[5]);
    this.blocks[5].setAll('body.velocity.y', 100)
    this.blocks[5].setAll('body.immovable', true);
}

myObjects.prototype = {
    objectAllUpdate: function() {
        this.blockUpdate();
        console.log(player.y);
    },
    blockUpdate: function() {
        for(var i = 0; i < this.blocks.length; i++) {
            game.physics.arcade.collide(player, this.blocks[i]);
            game.physics.arcade.overlap(this.blocks[i], this.helper, this.blocksHelper, null, this);
        }
    },
    blocksHelper: function(block, helper) {
        block.body.velocity.y *= -1;
    }
}
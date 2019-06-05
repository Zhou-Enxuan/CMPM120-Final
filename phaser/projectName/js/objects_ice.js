function Objects_ice(game, myTilemap) {
    //add the helper objects
    this.helper = game.add.group();
    this.helper.enableBody = true;
    myTilemap.createFromObjects('helper', 1, 'assets', 1, true, true, this.helper);
    this.helper.setAll('alpha', 0);
    this.helper.setAll('body.immovable', true);
    //adding the iceCone trap
    this.iceCone = game.add.group();
    this.iceCone.enableBody = true;
    myTilemap.createFromObjects('ice cone', 22, 'objects2', 12, true, true, this.iceCone);
    this.iceCone.setAll('body.gravity.y', 0);
    this.iceBack = [];
    this.iceCone.forEach(function(ice) {
        this.iceBack.push(ice.y);
        //console.log(this.iceBack);
    }, this)
    //console.log(this.iceBack.length);
    game.time.events.loop(Phaser.Timer.SECOND * 4.5, function() {
        for(i = 0; i < this.iceCone.length - 1; i++) {
            if(i % 2 === 0) {
                this.iceCone.getChildAt(i).body.gravity.y = 3000;
            }
        }
    }, this);

    game.time.events.loop(Phaser.Timer.SECOND * 6, function() {
        for(i = 0; i < this.iceCone.length - 1; i++) {
            if(i % 2 !== 0) {
                this.iceCone.getChildAt(i).body.gravity.y = 3000;
            }
        }
    }, this);
    //adding the moving blocks 
    this.blocks = [];
    this.blocks.push(game.add.group());
    this.blocks[0].enableBody = true;
    myTilemap.createFromObjects('moving block', 1, 'asset2', 0, true, true, this.blocks[0]);
    myTilemap.createFromObjects('moving block', 2, 'asset2', 1, true, true, this.blocks[0]);
    myTilemap.createFromObjects('moving block', 3, 'asset2', 2, true, true, this.blocks[0]);
    this.blocks[0].setAll('body.velocity.x', 100)
    this.blocks[0].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[1].enableBody = true;
    myTilemap.createFromObjects('moving block 2', 1, 'asset2', 0, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 2', 2, 'asset2', 1, true, true, this.blocks[1]);
    myTilemap.createFromObjects('moving block 2', 3, 'asset2', 2, true, true, this.blocks[1]);
    this.blocks[1].setAll('body.velocity.x', 100)
    this.blocks[1].setAll('body.immovable', true);
    this.blocks.push(game.add.group());
    this.blocks[2].enableBody = true;
    myTilemap.createFromObjects('moving block 3', 1, 'asset2', 0, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 3', 2, 'asset2', 1, true, true, this.blocks[2]);
    myTilemap.createFromObjects('moving block 3', 3, 'asset2', 2, true, true, this.blocks[2]);
    this.blocks[2].setAll('body.velocity.x', 100)
    this.blocks[2].setAll('body.immovable', true);
    //add top down blocks
    this.TDBlock = game.add.group();
    this.TDBlock.enableBody = true;
    myTilemap.createFromObjects('topDownBlock', 1, 'asset2', 0, true, true, this.TDBlock);
    myTilemap.createFromObjects('topDownBlock', 2, 'asset2', 1, true, true, this.TDBlock);
    myTilemap.createFromObjects('topDownBlock', 3, 'asset2', 2, true, true, this.TDBlock);
    this.TDBlock.setAll('body.velocity.y', 100);
    this.TDBlock.setAll('body.immovable', true)
    //add dropping blocks
    this.dropBlock = game.add.group();
    this.dropBlock.enableBody = true; 
    myTilemap.createFromObjects('drop block', 10, 'objects2', 0, true, true, this.dropBlock);
    myTilemap.createFromObjects('drop block', 11, 'objects2', 1, true, true, this.dropBlock);
    myTilemap.createFromObjects('drop block', 12, 'objects2', 2, true, true, this.dropBlock);
    this.dropBlock.setAll('body.immovable', true);
    this.dropBlock.setAll('isChecked', false);
}

Objects_ice.prototype = {
    objectAllupdate: function() {
        this.iceConeUpdate();
        this.blocksUpdate();
        this.dropBlockUpdate();
        console.log(player.x + " and " + player.y);
    },

    iceConeUpdate: function() {
        game.physics.arcade.collide(this.iceCone, this.helper,this.iceConeHelper, null, this);
        game.physics.arcade.overlap(player, this.iceCone,this.iceConeHelper2, null, this);
        this.iceCone.forEach(function(ice){
            if(ice.scale.y < 2) {
                ice.y = this.iceBack[this.iceCone.getChildIndex(ice)];
                ice.scale.y += 0.01;
            }
        }, this);
        

    },

    iceConeHelper: function(iceCone, helper) {
        iceCone.body.gravity.y = 0;
        iceCone.scale.y = 0;
    },

    iceConeHelper2: function(player, iceCone) {
        if(!player.super){
            UI.lifeValue -= 0.2;
            player.super = true;
            if(iceCone.x - player.x < 0) {
                player.body.acceleration.x = 50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            } else {
                player.body.acceleration.x = -50000;
                game.time.events.add(Phaser.Timer.SECOND * 0.2, function(){
                    player.body.acceleration.x = 0;
                },this);
            }
        }
    },

    blocksUpdate: function() {
        this.i = 0;
        for(;this.i < this.blocks.length; this.i++) {
            game.physics.arcade.collide(player, this.blocks[this.i]);
            game.physics.arcade.overlap(this.blocks[this.i], this.helper, this.blocksHelper, null, this);
        }
        game.physics.arcade.overlap(this.TDBlock, this.helper, this.TDblocksHelper, null, this);
        game.physics.arcade.collide(player, this.TDBlock);


    },

    blocksHelper(block, helper) {
        this.blocks[this.i].setAll('body.velocity.x', block.body.velocity.x * -1) 
    },

    TDblocksHelper: function(block, helper) {
        block.body.velocity.y *= -1;
    },

    dropBlockUpdate: function() {
        game.physics.arcade.collide(player, this.dropBlock,this.dropBlockHelper, null, this);

    },

    dropBlockHelper: function(player, block) {
        if(block.body.touching.up){
            if(!block.isChecked){
                this.Effect = game.add.tween(block)
                this.Effect.to( {alpha: 0}, 300, Phaser.Easing.Default, true, 0, false).yoyo(true);
            
                game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
                    block.body.velocity.y = 500;
                }, this)

                game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                    block.kill();
                }, this)          
            }
            block.isChecked = true;
        }
    }
}
function myObjects(game, myTilemap) {
    //objects for helper blocks
    this.helper = game.add.group();
    this.helper.enableBody = true;
    myTilemap.createFromObjects('helper', 1, 'assets', 1, true, true, this.helper);
    this.helper.setAll('alpha', 0);
    //objects for up down moving blocks
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
    //objects for protals
    this.portal = game.add.group();
    this.portal.enableBody = true;
    this.portalFalg = false;
    this.portalFalg2 = false;
    myTilemap.createFromObjects('portal level enter', 19, 'objects', 3, true, true, this.portal);
    myTilemap.createFromObjects('portal level recieve', 18, 'objects', 2, true, true, this.portal);
    myTilemap.createFromObjects('portal enter', 19, 'objects', 3, true, true, this.portal);
    myTilemap.createFromObjects('portal recieve', 19, 'objects', 3, true, true, this.portal);
    myTilemap.createFromObjects('portal_energy_in', 18, 'objects', 2, true, true, this.portal);
    myTilemap.createFromObjects('portal_energy_out', 19, 'objects', 3, true, true, this.portal);
    //objects for enemy
    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    myTilemap.createFromObjects('monster', 21, 'objects', 5, true, true, this.enemies);
    this.enemies.callAll('animations.add', 'animations', 'monster-walk', [5,6,7,8], 10, true);
    this.enemies.callAll('animations.play', 'animations', 'monster-walk');
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('body.velocity.x',50);
    this.enemies.setAll('body.immovable',true);
    //objects switches
    
}

myObjects.prototype = {
    objectAllUpdate: function() {
        this.blockUpdate();
        this.portalUpdate();
        this.monsterUpdate();
        //console.log(player.y);
    },
    blockUpdate: function() {
        for(var i = 0; i < this.blocks.length; i++) {
            game.physics.arcade.collide(player, this.blocks[i]);
            game.physics.arcade.overlap(this.blocks[i], this.helper, this.blocksHelper, null, this);
        }
    },
    blocksHelper: function(block, helper) {
        block.body.velocity.y *= -1;
    },
    portalUpdate: function() {
        this.portalFalg = game.physics.arcade.overlap(player, this.portal, this.portalHelper, null, this);
        if(!this.portalFalg) {
            this.portalFalg2 = false;
        }
    },
    portalHelper: function(player, portal) {
        console.log(this.portalFlag);
        console.log(this.portalFlag2);
        //console.log(this.portal.getIndex(portal));
        if(!this.portalFalg2){
            this.portalFalg2 = true;
            if(this.portal.getIndex(portal) === 0) {
                player.x = this.portal.getChildAt(1).x
                player.y = this.portal.getChildAt(1).y
            } else if(this.portal.getIndex(portal) === 1) {
                player.x = this.portal.getChildAt(0).x
                player.y = this.portal.getChildAt(0).y
            } else if(this.portal.getIndex(portal) === 2) {
                player.x = this.portal.getChildAt(3).x
                player.y = this.portal.getChildAt(3).y
            } else if(this.portal.getIndex(portal) === 3) {
                player.x = this.portal.getChildAt(2).x
                player.y = this.portal.getChildAt(2).y
            } else if(this.portal.getIndex(portal) === 4) {
                player.x = this.portal.getChildAt(5).x
                player.y = this.portal.getChildAt(5).y
            } else if(this.portal.getIndex(portal) === 5) {
                player.x = this.portal.getChildAt(4).x
                player.y = this.portal.getChildAt(4).y
            }
        }
    },
    monsterUpdate: function() {
        game.physics.arcade.collide(player, this.enemies, this.monsterHelper2, null, this);
        game.physics.arcade.overlap(this.enemies, this.helper, this.monsterHelper, null, this);

    },
    monsterHelper: function(enemy, helper) {
        enemy.body.velocity.x *= -1;
        enemy.scale.x *= -1;
    },
    monsterHelper2: function(player, enemies) {
        if(!player.super){
            UI.lifeValue -= 0.2;
            player.super = true;
        }
    }
}
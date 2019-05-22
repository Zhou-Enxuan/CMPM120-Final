var Play = function(game) {};
//the playing state
Play.prototype = {
    create: function() {
        //enable physics to the world
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        //add the background and make it a tile sprite
        game.add.tileSprite(0, 320, 2432, 928, 'BG');

        //add the tile map, there is three tile map so palyer 
        //can collide with different layer with different affect
        this.map = game.add.tilemap('level');
        this.map2 = game.add.tilemap('level-2');
        this.map3 = game.add.tilemap('level-3');
        this.map.addTilesetImage('sucai', 'assets');
        this.map2.addTilesetImage('sucai', 'assets');
        this.map3.addTilesetImage('sucai', 'assets');

        //making the blank part not collidable
		this.map.setCollisionByExclusion([]);
        this.map2.setCollisionByExclusion([]);
        this.map3.setCollisionByExclusion([]);

        //creating layer in tilemaps
        this.heatFloor = this.map2.createLayer('danger');
        this.floor = this.map.createLayer('floor');
        this.lava = this.map3.createLayer('lava');

        this.blocks = game.add.group();
        this.blocks.enableBody = true;
        this.map.createFromObjects('move', 7, 'assets', 6, true, true, this.blocks);
        this.map.createFromObjects('move', 5, 'assets', 4, true, true, this.blocks);
        this.map.createFromObjects('move', 4, 'assets', 3, true, true, this.blocks);
        this.map.createFromObjects('move2', 6, 'assets', 5, true, true, this.blocks);


        this.blocks.setAll('body.velocity.y',-100);
        this.blocks.setAll('body.immovable',true);

        
        //resize the world to tilemap size
        this.floor.resizeWorld();

        //add and playing bakground music
        this.BGM = game.add.audio('BGM');
        this.BGM.play('', 0, 0.5, true);

        //add sound effect for player stand on the heating floor
        this.heatSound = game.add.audio('heat');

        //add sprite of the effect that screen turn red or blue depend on temp
        this.hot = game.add.sprite(0, 0, 'hot');
        this.hot.alpha = 0;
        this.hot.fixedToCamera = true;
        this.cold = game.add.sprite(0, 0, 'cold');
        this.cold.alpha = 0;
        this.cold.fixedToCamera = true;

        //a boolean check if the player touching the heating floor
        this.touchHeat = false;

        //creating the UI
        UI = new myUI(game);
        player = new Player(game,0,385,'UI','robot_0001');
        game.add.existing(player);
        //adding the camera that follows the player, use example of Nathon's code
        this.camera = game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //add a deadzone of camera for a better camera view
        game.camera.deadzone = new Phaser.Rectangle(350, 200, 100, 200);
        if(game.camera.deadzone !== null) {
            this.zx = game.camera.deadzone.x;
			this.zy = game.camera.deadzone.y;
			this.zone = new Phaser.Rectangle(this.zx, this.zy, game.camera.deadzone.width, game.camera.deadzone.height);
		}


        //change the temp in the current level
        //63 to first line
        //240 to the highest
        this.debug = false;

        this.moveup =true;
        //console.log(UI.pointerPos);
        this.tempGrow = game.time.events.loop(Phaser.Timer.SECOND * 1, function() {
            UI.temp++;
            UI.tempChanged = true;
        }, this);

    },

    update: function() {
        //console.log(UI.pointer.x);
        //make the camera move only when player reach the camera dead zone
        if(game.camera.deadzone !== null) {
			this.zone.x = this.zx + game.camera.x;
			this.zone.y = this.zy + game.camera.y;
        }

        //key for debug showing
        if(this.input.keyboard.justPressed(Phaser.Keyboard.T)){
            this.debug = !this.debug;
            //console.log(this.debug);
        }

        if(UI.tempChanged) {
            UI.pointerPos = 400 + UI.temp;
            UI.tempChanged = false;
        }
        if(UI.pointer.cameraOffset.x > 400) {
            if(UI.temp > 240) {
                this.hot.alpha = 1;
            } else {
                this.hot.alpha = (UI.pointer.cameraOffset.x - 400)/240;
            }
        }
        else if(UI.pointer.cameraOffset.x < 400) {
            if(UI.temp > 240) {
                this.cold.alpha = 1;
            } else {
                this.cold.alpha = (400 - UI.pointer.cameraOffset.x)/240;
            }
        }

        if((this.blocks.getChildAt(1).y < 400 && this.moveup) || (this.blocks.getChildAt(1).y > 700 && !this.moveup)) {
            this.blocks.setAll('body.velocity.y', this.blocks.getChildAt(1).body.velocity.y * -1);
            this.moveup = !this.moveup;
            console.log(this.blocks.getChildAt(1).y);
        }

        //console.log('TEMP:' + UI.temp);

        //check if the hot screen should turn on
        if(!this.touchHeat) {
            this.tempGrow.delay = Phaser.Timer.SECOND * 1;
        }

        //stop sound effect if player is not on heat floor
        if(!this.touchHeat) {
            this.heatSound.stop();
        }

        UI.updateUI();

        //console.log('UIx is: ' + UI.pointer.x);
        //console.log('UI is: ' + UI.pointerPos);

        //make player collide with heat floor and run touchLava function
        this.touchHeat = game.physics.arcade.collide(player, this.heatFloor, this.touchLava, null, this);
        //make player collide with normal floor
        game.physics.arcade.collide(player, this.floor);

        game.physics.arcade.collide(player, this.lava);

        game.physics.arcade.collide(player, this.blocks);

        //console.log(UI.pointerPos);

    },

    //function that when player is landing on heat floor
    touchLava: function(player, lava) {
        //make the hot screen start showing up
        this.tempGrow.delay = Phaser.Timer.SECOND * 0.05;
        // if (this.hot.alpha < 1) {
        //     this.hot.alpha += 0.01;
        // }
        //playing the heat sound, don't make play again if it is already playing
        if(!this.heatSound.isPlaying) {
            this.heatSound.play('', 0, 0.5, true);
        }
        //console.log('touched lava');

    }, 
    //showing the debug info
    render: function() {
        if(this.debug) {
            game.debug.cameraInfo(game.camera, 32, 32);

            if(game.camera.deadzone !== null) {
			    game.debug.geom(this.zone, 'rgba(255,0,0,0.25');
            }
            game.debug.body(player);
        }

    }
};
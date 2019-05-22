var Play = function(game) {};
//the playing state
Play.prototype = {
    create: function() {
        //enable physics to the world
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.physics.arcade.TILE_BIAS = 32;

        //add the background and make it a tile sprite
        game.add.tileSprite(0, 320, 4800, 1600, 'BG');

        //add the tile map, there is three tile map so palyer 
        //can collide with different layer with different affect
        this.map = game.add.tilemap('level');
        this.map2 = game.add.tilemap('level-2');
        this.map3 = game.add.tilemap('level-3');
        this.map.addTilesetImage('test2', 'assets');
        this.map2.addTilesetImage('test2', 'assets');
        this.map3.addTilesetImage('test2', 'assets');

        //making the blank part not collidable
		this.map.setCollisionByExclusion([]);
        this.map2.setCollisionByExclusion([]);
        this.map3.setCollisionByExclusion([]);

        mapObjects = new myObjects(game, this.map);

        //creating layer in tilemaps
        this.heatFloor = this.map2.createLayer('danger');
        this.floor = this.map.createLayer('new_floor');
        //resize the world to tilemap size
        this.floor.resizeWorld();

        //add and playing bakground music
        this.BGM = game.add.audio('BGM');
        this.BGM.play('', 0, 0.5, true);

        //add sound effect for player stand on the heating floor
        this.heatSound = game.add.audio('heat');

        //add sprite of the effect that screen turn red or blue depend on temp

        //a boolean check if the player touching the heating floor
        this.touchHeat = false;

        //creating the UI
        player = new Player(game,60,385,'UI','robot_0001');
        game.add.existing(player);

        this.lava = game.add.group();
        this.lava.enableBody = true;
        this.map3.createFromObjects('lava', 7, 'assets', 6, true, true, this.lava);
        this.map3.createFromObjects('lava', 8, 'assets', 7, true, true, this.lava);

        this.lava.callAll('animations.add', 'animations', 'lava1', [6,7], 10, true);
        this.lava.callAll('animations.add', 'animations', 'lava2', [7,6], 10, true);

        this.lava.forEach(function(item){
            if(item.frame === 6) {
                item.animations.play('lava1');
            } else if (item.frame === 7) {
                item.animations.play('lava2');
            }
        });

        UI = new myUI(game);

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
        this.tempGrow = game.time.events.loop(Phaser.Timer.SECOND * 0.5, function() {
            UI.temp++;
            UI.tempChanged = true;
        }, this);

        this.zflag = true;


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
        mapObjects.objectAllUpdate();

        //console.log('UIx is: ' + UI.pointer.x);
        //console.log('UI is: ' + UI.pointerPos);

        //make player collide with heat floor and run touchLava function
        this.touchHeat = game.physics.arcade.collide(player, this.heatFloor, this.touchLava, null, this);
        //make player collide with normal floor
        game.physics.arcade.collide(player, this.floor);

        this.isHitLava = game.physics.arcade.overlap(player, this.lava, this.hitLava, null, this);

        if(!this.isHitLava) {
            if(!this.zflag) {
                game.world.moveDown(this.floor);
            }
            this.zflag = true;
        }

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

    hitLava: function(player, lava) {
        this.tempGrow.delay = Phaser.Timer.SECOND * 0.001;
        if(this.zflag) {
            game.world.moveUp(this.floor);
        }
        this.zflag = false;
        if(!this.heatSound.isPlaying) {
            this.heatSound.play('', 0, 0.5, true);
        }
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
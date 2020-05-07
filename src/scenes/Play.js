class Play extends Phaser.Scene {
     
    constructor() {
        super("playScene");
    }

    preload() {
        // background music
        this.load.audio('sfx_music', './assets/bensound-dance.mp3'); // Music: https://www.bensound.com

        // load audio
        this.load.audio('sfx_power', './assets/powerup.wav'); //https://freesound.org/people/evan.schad/sounds/470768/
        this.load.audio('sfx_coin', './assets/collectcoin.wav'); //https://freesound.org/people/bradwesson/sounds/135936/
        this.load.audio('sfx_jumpup', './assets/small-jump-for-videogames.wav'); //https://freesound.org/people/simoneyoh3998/sounds/500675/
        
        // load images/tile sprites
        this.load.image('betty','./assets/betty1.png'); //https://opengameart.org/content/one-more-lpc-alternate-character
        this.load.image('ground','./assets/RockTileSet2020.png'); // https://opengameart.org/content/stone-ground
        this.load.image('shoe','./assets/shoe.png');
       
        // icons for UI
        this.load.image('clock','./assets/Monsters_2/AlarmClock/AlarmClock_32x32_blue_damage_R.png'); //https://opengameart.org/content/cute-sprites-pack-1 
        this.load.image('score_icon','./assets/star_coin_animation_Pack/star_coin_shine/star_coin_1.png');
    
        // background picture
        this.load.image('background','./assets/cavernous.png'); //https://opengameart.org/content/cavernous-background
        
        // load spritesheet for coins 
        this.load.spritesheet('coin','./assets/spin_coin_big_upscale_strip6.png',{frameWidth: 18, frameheight: 20, startFrame: 0, endFrame: 20});
        
        
        
    }

    create()  {
        
        // This will make the background move as a parallax scroller. - H.
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
        this.bg_1.setScale(1.8);
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setScrollFactor(0);

        // adding sound effects
        this.sfxCoin = this.sound.add('sfx_coin');
        this.sfxShoe = this.sound.add('sfx_power');
        this.sfxJump = this.sound.add('sfx_jumpup')

        // play bg music
        this.bgm = this.sound.add('sfx_music');
        this.bgm.loop = true;
        this.bgm.play()

         // place tile sprite
        this.ground = this.add.tileSprite(0, 0, game.config.width, 48, 'ground');
        this.ground.setOrigin(0, 0);
        this.ground.setScrollFactor(0);
        this.physics.add.existing(this.ground);

        // score and timer icon
        this.clock = this.add.image(380,20,'clock');
        this.score_icon = this.add.image(33,25,'score_icon').setScale(.100,.100)


        // since this tile is shorter I positioned it at the bottom of the screen
        this.ground.y = 12 * 32.5;
        
        // coins and powerups
        // animation configs
        this.anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers('coin',{start:0, end: 5, first: 0}),
            framerate: 30,
            repeat: -1,
        });
        
        
        // adding coins at y and x axis
      //  this.coin = this.add.sprite(100,300,'coin');
       // this.coin.anims.play('rotate', true);
       // this.physics.add.existing(this.coin);

        this.shoe = this.add.sprite(300,300,'shoe');
        this.physics.add.existing(this.shoe);

        // add blocks / death pits
        this.ground1 = new Ground(this,game.config.width/2,game.config.height*.95,'ground');
        this.physics.add.existing(this.ground1);
        this.ground2 = new Ground(this,50,game.config.height*.95,'ground');
        this.physics.add.existing(this.ground2);

        // main character postion
        this.player = new Betty(this, game.config.width/2,300,'betty').setScale(1.5,1.5).setOrigin(0,0);
        this.physics.add.existing(this.player); //adding physics to betty
        this.player.body.setSize(30,32,0,0); //setting collision box size
        this.player.body.gravity.y = 100; //adding gravity

        // define movement and colliders
        this.physics.add.collider(this.player,this.ground1);
        this.physics.add.collider(this.player,this.ground2);
        this.physics.add.collider(this.player,this.ground);
        
        // define keyboard keys for movement
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         
        // score
        this.p1Score = 0

        // Time UI
        this.timer = this.formatTime(game.settings.gameTimer);
        this.timerRight = this.add.text(400,5,this.timer,timerConfig);
        let timeInSeconds;
        timeInSeconds = this.time.addEvent({delay:1000, callback: this.onEvent, callbackScope: this, loop:true})
       
        // When player collects coins

            // spawn 3 coins
            this.coinGroup = this.physics.add.group();
            for (let i = 0; i < 3; i++) {

                 let x = 15;
                 let y = 300;
                 switch (Phaser.Math.Between(0, 1)) {
                    case 0: x = Phaser.Math.Between(50, this.game.renderer.width);
                            y = y = Phaser.Math.Between(100, 300);
                        break;
                    case 1: x = Phaser.Math.Between(50, this.game.renderer.width); 
                            y = 300;
                }
                this.coins = this.add.sprite(x,y,'coin');
                this.physics.add.existing(this.coins);
                this.coinGroup.add(this.coins);     
            }
            // plays anims for coins
            for (let i = 0; i <this.coinGroup.getChildren().length; i++) {
                this.newCoin = this.coinGroup.getChildren()[i];
                this.newCoin.anims.play('rotate', true);     
            }

         // game ends
        this.gameOver = false;

    }   // end of create
   

    update() {
        
        // overlap detection with powerups and coins
        // looping over all the children to see which one is overlapping and to destroy
        for(let k = 0; k < this.coinGroup.getChildren().length; k++){
            this.one = this.coinGroup.getChildren()[k];
            if(this.physics.overlap(this.player,this.one) == true){
                this.one.destroy();
                // keep track of score 
                this.p1Score += 1;
                this.timer += 10;
                //play audio
                this.sfxCoin.play();
            }
        }
        this.physics.add.overlap(this.player,this.shoe,this.pickShoe,null,this); 

        // making ground immovable
        this.ground.body.immovable = true;

        // scrolls the background
        this.bg_1.tilePositionX += 0.5;
        
        // show score
        this.scoreLeft = this.add.text(55, 5, this.p1Score, scoreConfig);

        // move to death scene once timer runs out or if betty runs into death pits
        if(this.timer <= 0 || this.player.y > game.config.height){
            this.gameOver = true;
            this.bgm.stop();
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

            // check for input during death scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.restart(this.p1Score);
                game.settings.gameTimer = 15000;
                this.bgm.destroy();
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.scene.start('menuScene');
            }
        
        }
          
        // Tracking highscore
        let highScore = localStorage.getItem("highscore");
        if(highScore == null){
          localStorage.setItem("highscore", 0);
          highScore = 0;
        }
        else if(this.p1Score > highScore){
            localStorage.setItem("highscore", this.p1Score);
        }
        

        // check key input for restart during the game
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            
            //resets score and timer
            this.scene.restart(this.p1Score);
            game.settings.gameTimer = 15000;
            this.bgm.destroy();
            this.scene.start('playScene');
      
        }

        // extended class update
        this.player.update(); // runs update function in Betty.js
        this.ground.update();
        this.ground1.update();
        this.ground2.update();
    
        // check collisions

       
    } // end of update function

    // More Time UI 
    formatTime(milliseconds){
        return milliseconds / 1000;
    }

    onEvent(){
        if(this.timer > 0){
            this.timer -= 1;
        }
        this.timerRight.setText(this.timer);
    }

    pickShoe(){
        //possibly make a higher jump out of this? 
        game.settings.shoe = true;
        this.sfxShoe.play();
        this.shoe.destroy();
    }
   

}   // end of Play.js
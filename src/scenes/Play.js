class Play extends Phaser.Scene {
     
    constructor() {
        super("playScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_sizzle', './assets/zapsplat_horror_acid_burn_010_14878.mp3'); // Sound effect: obtained from https://www.zapsplat.com
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
        //https://opengameart.org/content/lasers-and-beams 122 111
        this.load.spritesheet('lasertrap','./assets/lasertrap.png',{frameWidth: 20, frameHeight: 112, startFrame: 0, endFrame: 100});
        
        
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
        this.sfxJump = this.sound.add('sfx_jumpup');
        this.sfxSizzle = this.sound.add('sfx_sizzle');

        // play bg music
        music.play();

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
        this.anims.create({
            key: 'rotate2',
            frames: this.anims.generateFrameNumbers('lasertrap',{start:0, end: 2, first: 0}),
            framerate: 30,
           repeat: -1,
        });
       
        // Power-up every 10 seconds
        this.powerUps = this.physics.add.group();
        this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.onEvent2, callbackScope: this, loop: true });

        // adds lasers / death pits
         // Laser Trap
        this.timedEvent2 = this.time.addEvent({ delay: 5000, callback: this.onEvent3, callbackScope: this, loop: true });
         // laser speed counter.
        this.laserCounter = 0;
        // main character postion
        this.player = new Betty(this, 0,300,'betty').setScale(1.5,1.5).setOrigin(0,0);
        this.physics.add.existing(this.player); //adding physics to betty
        this.player.body.setSize(30,32,0,0); //setting collision box size
        this.player.body.gravity.y = 100; //adding gravity

        // define movement and colliders
        this.physics.add.collider(this.player,this.ground);
        // ground speed counter.
        this.counter = 0;
        // define keyboard keys for movement
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); 
        // score
        this.p1Score = 0
        // Time UI
        game.settings.gameTimer = 30000;
        this.timer = this.formatTime(game.settings.gameTimer);
        this.timerRight = this.add.text(400,5,this.timer,timerConfig);
        let timeInSeconds;
        timeInSeconds = this.time.addEvent({delay:2000, callback: this.onEvent, callbackScope: this, loop:true})
       
        // Spawning coins
            // spawn 3 coins
            this.threeCoins = 3;
            this.coinGroup = this.physics.add.group();
            for (let i = 0; i < 3; i++) {

                 let x = 15;
                 let y = 300;
                 switch (Phaser.Math.Between(0, 1)) {
                    case 0: x = Phaser.Math.Between(50, this.game.renderer.width);
                        break;
                    case 1: x = Phaser.Math.Between(50, this.game.renderer.width); 
                          break;
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
            // spawns more coins if coin group has no children
            this.timedEvent3 = this.time.addEvent({ delay: 5000, callback: this.onEvent4, callbackScope: this, loop: true });
         // gameover flag
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
                this.timer += 2;
                //play audio
                this.sfxCoin.play();
                // increase ground speed
               this.counter += 0.5;
               // increase laser speed
               this.laserCounter += -20;
               // first three coin counter
               this.threeCoins -= 1 ;
            }
        }
       
        // shoe collision
        for(let x = 0; x < this.powerUps.getChildren().length; x++){
            this.shoe = this.powerUps.getChildren()[x];
            if(this.physics.overlap(this.player,this.shoe) == true){
                this.shoe.destroy();
                game.settings.shoe = true;
                this.sfxShoe.play();
            }
        }
        // making ground immovable
        this.ground.body.immovable = true;
        // increase ground speed
        this.ground.tilePositionX += this.counter;
        // scrolls the background
        this.bg_1.tilePositionX += 0.5;
        // show score
        this.scoreLeft = this.add.text(55, 5, this.p1Score, scoreConfig);
        // move to death scene once timer runs out or if betty runs into death pits
      
        if(this.timer <= 0 || this.player.y > game.config.height || this.physics.overlap(this.player,this.laser)){
            // play sizzle if laser is touched 
            this.sfxSizzle.play();
            music.stop();
            this.gameOver = true;
            this.timer = 0;
            this.laser.anims.stop();
            this.player.body.immovable = true;
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("high-score"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or R for Menu', deathConfig).setOrigin(0.5);
            // check for input during death scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                music.stop();
                this.scene.restart(this.p1Score);
                game.settings.gameTimer = 30000;
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                music.stop();
                this.scene.start('menuScene');
            }  
        }  
      // Tracking highscore
        let highScore = localStorage.getItem("high-score");
        if(highScore == null){
          localStorage.setItem("high-score", 0);
          highScore = 0;
        }
        else if(this.p1Score > highScore){
            localStorage.setItem("high-score", this.p1Score);
        } 
        // extended class update
        this.player.update(); // runs update function in Betty.js
        this.ground.update();     
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

    // Shoe powerup spawn
    onEvent2(){
        this.shoe = this.physics.add.sprite(300,300,'shoe');
        this.powerUps.add(this.shoe);         
        this.shoe.setRandomPosition(0,0, game.config.width, game.config.height);
        this.shoe.setVelocity(100,100);
        this.shoe.setCollideWorldBounds(true);
        this.shoe.setBounce(1);
     }


     // Laser spawn
    onEvent3(){

    this.laser = this.physics.add.sprite(640,360,'lasertrap');
    this.laser.anims.play('rotate2', true); 
    this.laser.setVelocity(-100 + this.laserCounter,0);

    }
    // Coin spawn
    onEvent4(){
        if(this.threeCoins <= 0){   
        this.coins = this.physics.add.sprite(640,360,'coin');
        this.coinGroup.add(this.coins); 
        this.coins.anims.play('rotate', true);
        // x,y, width, and height of random area spawning         
        this.coins.setRandomPosition(640,250, 100, 150);
        this.coins.setVelocity(-100,0);
        }
     }


 }   // end of Play.js
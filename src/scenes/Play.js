class Play extends Phaser.Scene {
     
    constructor() {
        super("playScene");
    }
    preload() {
        // load background music
        this.load.audio('sfx_power', './assets/powerup.wav'); //https://freesound.org/people/evan.schad/sounds/470768/
        this.load.audio('sfx_coin', './assets/collectcoin.wav'); //https://freesound.org/people/bradwesson/sounds/135936/ 
        this.load.audio('sfx_jump', './assets/small-jump-for-videogames.wav'); //https://freesound.org/people/simoneyoh3998/sounds/500675/
        this.load.audio('bg','./assets/horror-music.wav'); //https://freesound.org/people/theojt/sounds/510950/ 
       

        // load images/tile sprites
        this.load.image('betty','./assets/betty1.png'); //https://opengameart.org/content/one-more-lpc-alternate-character
        this.load.image('ground','./assets/blocks_prev.png'); //https://opengameart.org/content/platformer-rock-blocks
        this.load.image('clock','./assets/Monsters_2/AlarmClock/AlarmClock_32x32_blue_damage_R.png'); //https://opengameart.org/content/cute-sprites-pack-1 
        this.load.image('score_icon','./assets/star_coin_animation_Pack/star_coin_shine/star_coin_1.png');

        // load borders
        
        // background picture
        this.load.image('background','./assets/cavernous.png'); //https://opengameart.org/content/cavernous-background
        
        // load spritesheet
        this.load.spritesheet('coin','./assets/spin_coin_big_strip6.png',{frameWidth: 192, frameheight: 191, startFrame: 0, endFrame: 20});
    }

    create() {
        // play bg music
        this.bgm = this.sound.add('bg');
        this.bgm.loop = true;
        this.bgm.play();
    
        // place tile sprite and images
        this.starfield = this.add.tileSprite(0,0,980,980,'background').setScale(1.66,1.66).setOrigin(0,0); 
        this.clock = this.add.image(380,20,'clock');
        this.score_icon = this.add.image(33,25,'score_icon').setScale(.100,.100);
        
        // UI to keep track of points
       
        // add blocks / death pits
        this.ground1 = new Ground(this,game.config.width/2,game.config.height*.95,'ground');
        this.physics.add.existing(this.ground1);
        this.ground2 = new Ground(this,50,game.config.height*.95,'ground');
        this.physics.add.existing(this.ground2);
        //ground.displayWidth = game.config.width*1.1;

        // borders?
        
        // main character postion
        this.p1Betty = new Betty(this,30,380,'betty').setScale(1.5,1.5).setOrigin(0,0);
        this.physics.add.existing(this.p1Betty); //adding physics to betty
        this.p1Betty.body.setSize(30,32,0,0); //setting collision box size
        this.p1Betty.body.gravity.y = 100; //adding gravity

        // define movement and colliders
        this.physics.add.collider(this.p1Betty,this.ground1);
        this.physics.add.collider(this.p1Betty,this.ground2);

        //define keyboard keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); 
        
        // animation configs
        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion',{start:0, end: 9, first: 0}),
          framerate: 30,
        })

        // score
        this.p1Score = 0

        // score display moved to main.js

        
        //score position
        this.scoreLeft = this.add.text(55, 5, this.p1Score, scoreConfig);

        
        
        // Time UI
    
        //this.timer = this.formatTime(game.settings.gameTimer);
        //this.Right = this.add.text(500, 54, this.timer, timeUIConfig);

        //var timeInSeconds;
        //timeInSeconds = this.time.addEvent({delay:1000, callback: this.onEvent, callbackScope: this, loop:true});
        // places score
        // this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        // game over flag
        this.gameOver = false;
        /*
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        music.stop();
        this.add.text(game.config.width/2, game.config.height/2 + 100, "Current Highscore: "+localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
        */
    }   // end of create

    update() {

        //show timer
        if (this.gameOver == false){
            this.timerRight = this.add.text(400,5,game.settings.gameTimer/1000,timerConfig);
        }else{
            this.timerRight = this.add.text(400,5,0.000,timerConfig); 
        }

        //timer going down each second
        game.settings.gameTimer = game.settings.gameTimer - 17;

        //move to death scene once timer runs out or if betty runs into death pits
        if(game.settings.gameTimer <= 0 || this.p1Betty.y > game.config.height){
            this.gameOver = true;
            this.bgm.stop();
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '<- to Restart or -> for Menu', deathConfig).setOrigin(0.5);

            // check for input during death scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.scene.start('menuScene');
            }
        
        }
          
        //Tracking highscore
        var highScore = localStorage.getItem("highscore");
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

        //extended class update
        this.p1Betty.update(); // runs update function in Betty.js
        this.ground1.update();
        this.ground2.update();
    
        // check collisions
        
        
      
    }
      
    formatTime(milliseconds){
        return milliseconds / 1000;
    }
    onEvent(){
        if(this.timer > 0){
            this.timer -= 1;
        }
        this.Right.setText(this.timer);
    }
      
    checkCollision() {
        
    }
   

}   // end of Play.js
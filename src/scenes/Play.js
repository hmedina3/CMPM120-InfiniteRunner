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
        this.load.audio('sfx_jump', './assets/small-jump-for-videogames.wav'); //https://freesound.org/people/simoneyoh3998/sounds/500675/
        this.load.audio('sfx_stab', './assets/stab.wav'); //https://freesound.org/people/InspectorJ/sounds/413496/
        this.load.audio('sfx_throw', './assets/throw.wav'); //https://freesound.org/people/kylepyke/sounds/196562/
       
        // load images/tile sprites
        this.load.image('betty','./assets/betty1.png'); //https://opengameart.org/content/one-more-lpc-alternate-character
        this.load.image('ground','./assets/RockTileSet2020.png'); // https://opengameart.org/content/stone-ground
            
        // background picture
        this.load.image('background','./assets/cavernous.png'); //https://opengameart.org/content/cavernous-background
        
        // load spritesheet
        this.load.spritesheet('coin','./assets/spin_coin_big_strip6.png',{frameWidth: 192, frameheight: 191, startFrame: 0, endFrame: 20});
    }

    create() {

      // This will make the background move as a parallax scroller. - H.
      this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
      this.bg_1.setScale(1.8);
      this.bg_1.setOrigin(0, 0);
      this.bg_1.setScrollFactor(0);

     // play music
      music = this.sound.add('sfx_music');
      music.play();

    // place tile sprite
        this.ground = this.add.tileSprite(0, 0, game.config.width, 48, 'ground');
        this.ground.setOrigin(0, 0);
        this.ground.setScrollFactor(0);
    // since this tile is shorter I positioned it at the bottom of the screen
        this.ground.y = 12 * 32.5;

        
        // UI to keep track of points
       
        // add blocks / death pits
        this.ground1 = new Ground(this,game.config.width/2,game.config.height*.95,'ground');
        this.physics.add.existing(this.ground1);
        this.ground2 = new Ground(this,50,game.config.height*.95,'ground');
        this.physics.add.existing(this.ground2);
        //ground.displayWidth = game.config.width*1.1;

        // borders?
        
        // main character postion
        this.p1Betty = new Betty(this, game.config.width/2,350,'betty').setScale(1.5,1.5).setOrigin(0,0);
       
        // define keyboard keys for movement
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

        // UI to keep track of points
        // score
        this.p1Score = 0

        // score display
        let scoreConfig = {
          fontFamily: 'Helvetica',
          fontSize: '28px',
          backgroundColor: '#Ff4343',
          color: '#F3B141',
          align: 'right',
          padding: {
              top: 3,
              bottom: 3,
          },
          fixedWidth: 60
        }
        
        // score position
        this.scoreLeft = this.add.text(5, 5, this.p1Score, scoreConfig)
        
        // Time UI
    
        this.gameOver = false;

    }   // end of create

    update() {
        // scrolls the background
         this.bg_1.tilePositionX += 0.3;

        // timer going down each second
        game.settings.gameTimer = game.settings.gameTimer - 1000;

        // move to death scene once timer runs out or if betty runs into death pits
        if(game.settings.gameTimer <= 0 || this.p1Betty.y > game.config.height){
            this.gameOver = true;
         // move to death scene once timer runs out
            music.stop();
            this.add.text(game.config.width/2, game.config.height/2 + 100, "Current Highscore: "+localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '<- to Restart or -> for Menu', scoreConfig).setOrigin(0.5);

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
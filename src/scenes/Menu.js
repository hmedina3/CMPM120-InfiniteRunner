class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/Punching_Designed6.wav');  // https://gamesounds.xyz
        this.load.audio('sfx_jump', './assets/HITS - 05.wav'); // https://gamesounds.xyz
        // background music
        this.load.audio('sfx_music', './assets/bensound-dance.mp3'); // Music: https://www.bensound.com
        // background picture
        this.load.image('background','./assets/cavernous.png'); // https://opengameart.org/content/cavernous-background
    }
    
    create() {
      // This will make the background move as a parallax scroller.
      this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
      // SetScale()
      this.bg_1.setScale(1.8);
      // Set its pivot to the top left corner
      this.bg_1.setOrigin(0, 0);
      // fixed it so it won't move when the camera moves.
      this.bg_1.setScrollFactor(0);

       // play music
        music = this.sound.add('sfx_music');
        music.play();

      let menuConfig = {
        fontFamily: 'Helvetica',
        fontSize: '40px',
        color: '#00ff00',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

    let centerX = game.config.width/2;
    let centerY = game.config.height/2;
    let textSpacer = 64;

    this.add.text(centerX, centerY- textSpacer, 'The Great Escape!', menuConfig).setOrigin(0.5);
    this.add.text(centerX, centerY, 'Press Spacebar to Jump', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00ff00';
    menuConfig.color = '#000';
    this.add.text(centerX, centerY + textSpacer, 'Press ➙ to Escape', menuConfig).setOrigin(0.5);

     // define keys
     keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
     keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
      // scrolls the background
      this.bg_1.tilePositionX += 0.3;

      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // starts game
        game.settings = {
          //BlockSpeed: 4,
          gameTimer: 60000    
        }
        this.sound.play('sfx_select');
        music.stop();
        this.scene.start("playScene");    
      }
    } // update function ends
             
} // end of Menu class
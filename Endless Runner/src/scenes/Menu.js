class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){ //something that loads before game starts
        //load images/tile sprite
        //('what you want to define the name as', 'where is this in the folder')
        this.load.image('betty','./assets/betty1.png'); //https://opengameart.org/content/one-more-lpc-alternate-character
        this.load.image('ground','./assets/blocks_prev.png'); //https://opengameart.org/content/platformer-rock-blocks
        this.load.image('background','./assets/cavernous.png'); //https://opengameart.org/content/cavernous-background
        this.load.image('cover','./assets/4680.jpg'); //http://www.freepik.com">Designed by macrovector_official / Freepik
        
        //load spritesheet
        this.load.spritesheet('explosion','./assets/boom.png',{frameWidth: 192, frameheight: 191, startFrame: 0, endFrame: 20}); //https://www.subpng.com/png-1mtyxe/

        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/stab.wav'); //https://freesound.org/people/InspectorJ/sounds/413496/
        this.load.audio('sfx_rocket', './assets/throw.wav'); //https://freesound.org/people/kylepyke/sounds/196562/
    }

    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#aa93e9',
            color: '#d9f5f6',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        //bg image
        this.cover = this.add.tileSprite(0,0,4500,4500,'cover').setScale(.20,.20).setOrigin(0,0);

        //displays menu text
        // add this text to screen at (x axis,y axis,string)
        // 0,0 coordination is upper left corner
        //this.add.text(20,20,"Rocket Patrol Menu");
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY- textSpacer, 'Eat the Steak', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#61c1a1';
        this.add.text(centerX, centerY, 'Use <--> arrows to move & (SPACE) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#f08080';
        this.add.text(centerX,centerY + textSpacer,'Press <- for Easy or -> for Hard', menuConfig).setOrigin(0.5);

        //launch the next scene
        //this.scene.start("playScene");

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (keyLEFT.isDown) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                count:0
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
        if (keyRIGHT.isDown) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                // faster time to end the game
                gameTimer: 45000,
                count:0   
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }

        // goes back to menu if left key is pressed down
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }
}
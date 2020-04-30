class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){ //something that loads before game starts
        //load images/tile sprite
        //('what you want to define the name as', 'where is this in the folder')
        this.load.image('rocket','./assets/betty1.png'); //https://opengameart.org/content/one-more-lpc-alternate-character
        this.load.image('ground','./assets/blocks_prev.png'); //https://opengameart.org/content/platformer-rock-blocks
        this.load.image('background','./assets/cavernous.png'); //https://opengameart.org/content/cavernous-background
        //load spritesheet
        this.load.spritesheet('explosion','./assets/boom.png',{frameWidth: 192, frameheight: 191, startFrame: 0, endFrame: 20}); //https://www.subpng.com/png-1mtyxe/

        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/stab.wav'); //https://freesound.org/people/InspectorJ/sounds/413496/
        this.load.audio('sfx_rocket', './assets/throw.wav'); //https://freesound.org/people/kylepyke/sounds/196562/
        //this.load.audio('bg','./assets/skymusic.wav'); //https://freesound.org/people/dkiller2204/sounds/423133/
    }

    create(){ //something that loads once after game starts
        //place tile sprite (where on screen top left x, where on screen top left y, where end for image bottom right x, where end for image bottom right y, variable name)
        this.starfield = this.add.tileSprite(0,0,980,980,'background').setScale(1.66,1.66).setOrigin(0,0);
        


        // white rectangular borders
        //(x axis, y axis, width, height, color in hex value)
        /*this.add.rectangle(5,5,630,32,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,443,630,32,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,5,32,455,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603,5,32,455,0xFFFFFF).setOrigin(0,0);

        // yellow UI background
        this.add.rectangle(37,42,566,64,0xfff266).setOrigin(0,0);
        */

        //add rocket (p1)
        // constructor(scene, x, y, texture, frame) just skip frame bc phaser dont care about frame
        this.p1Rocket = new Rocket(this, game.config.width/2,350,'rocket').setScale(1.5,1.5).setOrigin(0,0);

        // add spaceships (x3)
        let random1 = Math.random()*1000
        let random2 = Math.random()*1000
        let random3 = Math.random()*1000
        this.ship01 = new spaceship(this, game.config.width+random1+ random3, 132, 'spaceship', 0, 30, random1).setOrigin(0,0);
        this.ship02 = new spaceship(this, game.config.width+random2+ random1, 196, 'spaceship', 0, 20, random2).setOrigin(0,0);
        this.ship03 = new spaceship(this, game.config.width+random3+ random2, 260, 'spaceship', 0, 10, random3).setOrigin(0,0);
        

        //bg music
        // https://stackoverflow.com/questions/34210393/looping-audio-in-phaser
        /*this.bgm = this.sound.add('bg');
        this.bgm.loop = true;
        this.bgm.play();
        */


        // add this text to screen at (x axis,y axis,string)
        // 0,0 coordination is upper left corner
        //this.add.text(20,20,"Rocket Patrol Play");

        //define keyboard keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{start:0, end: 9, first: 0}),
            framerate: 30,
        });

        // score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#Ff4343',
            color: '#F3B141',
            align: 'right',
            padding: {
                top: 3,
                bottom: 3,
            },
            fixedWidth: 100
        }
        //score position
        //the numbers are x and y axis on where the score display should be
        this.scoreLeft = this.add.text(5, 5, this.p1Score, scoreConfig);

        //game over flag
        this.gameOver = false;

        //60-sec play clock to end the game
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0,5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Fire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.bgm.pause();
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.start('menuScene');
            }
        }, null, this);

    }

    update(){ //something that reloads every frame

        //counting the time in sec
        game.settings.count = game.settings.count + 1;
        //increasing speed after 30 sec
        if(game.settings.count >= 3000){
            game.settings = {
                spaceshipSpeed: 10,
            }
        }

        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.restart(this.p1Score);
            //this.bgm.pause();
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.start('menuScene');
            }
            
        }


        // scroll starfield
        // -= 4 means move backwards 4 pixels each frame on x axis
        this.starfield.tilePositionX -= 4;
        //this.starfield.tilePositionY -= 4;

        /*
        //update rocket
        this.p1Rocket.update();

        //update spaceship
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        */

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);;
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        //only update rocket and spaceships if game is not over
        if(!this.gameOver){
            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y + ship.y){
                return true;
        }else{
            return false;
        }
    }

    shipExplode(ship) {

        ship.alpha = 0; //temporarily hide ship
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setScale(0.5,0.5).setOrigin(0,0);
        boom.anims.play('explode'); // play explode animation

        //callback after animation completes
        boom.on('animationcomplete', () => {
           ship.reset(); //reset ship position
           ship.alpha = 1; // make ship visible again
           boom.destroy(); //remove explosion sprite
        });

        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}
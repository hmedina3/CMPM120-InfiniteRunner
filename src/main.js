/*
NOTE*:

I have implemented a code base for this project. Feel free to add other .js files.
If you do decide to add other .js files please let me know as soon as possible.

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    //scene: [Menu, Play]
    scene: [Play],
    physics:{
        default: 'arcade',
        arcade: {debug:true} //debug put boxes over your objects w/ physics and velocity
    }
}

// score display
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

let deathConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#6B7177',
  color: '#d4d4d4',
  align: 'center',
  padding: {
      top: 3,
      bottom: 3,
  },
  fixedWidth: 600
}

  // reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keySPACE;

let game = new Phaser.Game(config); 

// define game settings
game.settings = {
  gameTimer: 15000,
  
}


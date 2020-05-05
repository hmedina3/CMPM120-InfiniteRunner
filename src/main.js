/*
NOTE*:

I have implemented a code base for this project. Feel free to add other .js files.
If you do decide to add other .js files please let me know as soon as possible.

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    physics:{
        default: 'arcade',
        arcade: {debug:true} //debug put boxes over your objects w/ physics and velocity
    }
}

// score display
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#a5c3cf',
    color: '#4b88b0',
    align: 'right',
    padding: {
        top: 3,
        bottom: 3,
    },
    fixedWidth: 100
}

// timer display
let timerConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#a5c3cf',
  color: '#4b88b0',
  align: 'right',
  padding: {
      top: 3,
      bottom: 3,
  },
  fixedWidth: 100
}

let highScoreConfig = {
  fontFamily: 'Impact',
  fontSize: '35px',
  backgroundColor: '#545176',
  color: '#f0eae5',
  align: 'center',
  padding: {
      top: 15,
      bottom: 15,
  },
  fixedWidth: 350
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
  fixedWidth: 500
}

  // reserve keyboard vars
let keyR, keySPACE, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config); 

// define game settings
game.settings = {
  gameTimer: 15000, 
}

let music;

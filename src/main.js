/*
Hector Medina
Yongshi Sun
Game title: Betty's Great Escape!
Date completed: 5/7/2020 extension given by Professor Nathan.
Creative tilt:
The creative tilt for this project was to make "time" a major factor. As you play the game
you will notice that there is a factor of time in every object. The coins come in every 5
seconds or so. They also increase the time on the clock. The lasers speed up when more coins 
are captured. Therefore collecting coins isn't just rewarding for your score, but it also brings 
survivability for the player while also introducing a faster paced game. The visual style was
inspired by a spy/robbery theme, simliar to James Bond. We wanted betty to be running away from that 
hideout that included lasers rigged up by the evil orgranization. We made sure to include that 
underground base-like background to make the player feel that this isn't just your ordinary cave. It is
someone's hideout and you need to help secret agent Betty get out as quickly as you can.

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false //debug put boxes over your objects w/ physics and velocity
      }
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
// highscore display
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
// death scene display 
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
  // 30 second timer
  gameTimer: 30000,
  shoe: false,
}
// global music variable
let music;

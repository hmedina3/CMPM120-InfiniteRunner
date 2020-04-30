/*
NOTE*:

I have implemented a code base for this project. Feel free to add other .js files.
If you do decide to add other .js files please let me know as soon as possible.

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
  }

  // reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config); 
// define game settings
game.settings = {
  
}


class Play extends Phaser.Scene {
     
 
    constructor() {
        super("playScene");
    }
    preload() {
        // load background music
        
        // load images/tile sprites
       
        // load borders
        
        // background picture
        
        // load spritesheet
       
      }

    create() {
        // play music
       // let music = this.sound.add('sfx_music');
       // music.play();
    
        // place tile sprite
        
        // UI to keep track of points
       
         // add blocks / death pits
        

       // borders?
        
        // main character postion
       
       
      // define movement
        
        // animation configs
        

        // score
        
        // score display
        

      // Time UI
    
    //this.timer = this.formatTime(game.settings.gameTimer);
    //this.Right = this.add.text(500, 54, this.timer, timeUIConfig);

    //var timeInSeconds;
    //timeInSeconds = this.time.addEvent({delay:1000, callback: this.onEvent, callbackScope: this, loop:true});
        // places score
        // this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        // game over flag
      /*  this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        music.stop();
        this.add.text(game.config.width/2, game.config.height/2 + 100, "Current Highscore: "+localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
        */
       } // end of create

      update() {
          
        // Tracking highscore
        /*  var highScore = localStorage.getItem("highscore");
          if(highScore == null){
            localStorage.setItem("highscore", 0);
            highScore = 0;
          }
          else if(this.p1Score > highScore){
              localStorage.setItem("highscore", this.p1Score);
          }
          */

           // check key input for restart

        
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
   

} // end of Play.js
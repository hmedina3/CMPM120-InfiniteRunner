//Betty prefab
class Betty extends Phaser.GameObjects.Sprite{
    // (scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); // add object to existing scene
        this.isJumping = false; // tracks players jumping status

        // adds jump audio
        this.sfxJump = scene.sound.add('sfx_jump');
    }

    update(){

        // Jump button
      if(Phaser.Input.Keyboard.JustDown(keySPACE)){
        this.isJumping = true;
        // play sfx
        this.sfxJump.play();
      }
        // if player jumps, move up
        if(this.isJumping && this.y >= 108){
            // move player forward
           this.y -= 2;
    
          } // end of if jumping player.
          

        // fire button ( NOT spacebar)
        // isDown =  if it was pressed this frame, do this
        // JustDown = if it was pressed last frame, do this; this is
        //      to prevent player from holding down F to fire, they 
        //      must manually do it to fire
    
    // control player while jumping
      if(this.isJumping){
        if(keyLEFT.isDown && this.x >= 47){
          this.x -= 2;
        }
        else if(keyRIGHT.isDown && this.x <= 578){
          this.x += 2;
        }
        else{
          ;
        }
      }

        // reset on miss
        if(this.y <= 10){
            //this.y = 431;
            this.reset();
        }
    }

    // reset player to ground
    reset(){
        this.isJumping = false;
        this.y = 350; //431
    }

}
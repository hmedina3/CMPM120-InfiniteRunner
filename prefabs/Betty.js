//Betty prefab
class Betty extends Phaser.GameObjects.Sprite {

    // (scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); // add object to existing scene
        this.isJumping = false; // tracks players jumping status

        // adds jump audio
        this.sfxJump = scene.sound.add('sfx_jumpup');
    }

    update(){

      // left/right movement
      if(keyLEFT.isDown && this.x >= 0){
        // speed depends on this
        this.x -= 4;
      }else if (keyRIGHT.isDown && this.x <= 600){
        this.x += 4;
      }

      //jumping
      if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isJumping){
        this.isJumping = true;
        this.jump();
        this.sfxJump.play(); // play sfx
      }

        //only allow jump if betty is touching ground (to prevent double jump)
        if(this.body.velocity.y ==0){
            this.isJumping = false;
        }
      
    }
    
    jump(){
      this.body.velocity.y = -150; //setVelocityY(-100)
    }

  } // end of Betty class

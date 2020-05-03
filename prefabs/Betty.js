//Betty prefab
class Betty extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); //add object to existing scene
        this.isJumping = false; // track betty's jump status

        //adds audio
        this.sfxJump = scene.sound.add('sfx_jump');
    }

    update(){
        // left/right movement
        if(!this.isJumping){
            //this.x >= 47 is to prevent rocket from passing border
            if(keyLEFT.isDown && this.x >= 47){
                //speed depends on this
                this.x -= 2;
            }else if (keyRIGHT.isDown && this.x <= 578){
                this.x += 2;
            }
        }

        // jump button (spacebar)
        // isDown =  if it was pressed this frame, do this
        // JustDown = if it was pressed last frame, do this; this is
        //      to prevent player from holding down F to fire, they 
        //      must manually do it to fire
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isJumping){
            this.isJumping = true;
            this.sfxJump.play(); // play sfx
        }

        //if jumping, move up
        if(this.isJumping && this.y >= 108){
            this.y -= 2;

            //Allows the player to control the fork after it's fired
            if(keyLEFT.isDown && this.x >= 47){
                //speed depends on this
                this.x -= 2;
            }else if (keyRIGHT.isDown && this.x <= 578){
                this.x += 2;
            }
        }

        // reset on miss
        if(this.y <= 10){
            //this.y = 431;
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset(){
        this.isJumping = false;
        this.y = 350; //431
    }

}
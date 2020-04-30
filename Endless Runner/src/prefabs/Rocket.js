//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); //add object to existing scene
        this.isFiring = false; // track rocket's firing status

        //adds rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        // left/right movement
        if(!this.isFiring){
            //this.x >= 47 is to prevent rocket from passing border
            if(keyLEFT.isDown && this.x >= 47){
                //speed depends on this
                this.x -= 2;
            }else if (keyRIGHT.isDown && this.x <= 578){
                this.x += 2;
            }
        }

        // fire button ( NOT spacebar)
        // isDown =  if it was pressed this frame, do this
        // JustDown = if it was pressed last frame, do this; this is
        //      to prevent player from holding down F to fire, they 
        //      must manually do it to fire
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }

        //if fired, move up
        if(this.isFiring && this.y >= 108){
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
            //this.isFiring = false;
            //this.y = 431;
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = 350; //431
    }

}
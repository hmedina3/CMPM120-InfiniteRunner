//Betty prefab
class Betty extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //setting physics and gravity
        //scene.physics.add.existing(this); //add object to existing scene
        scene.add.existing(this); //add object to existing scene
        //this.body.gravity.y = 100; //this.setGravityY(100);
        this.isJumping = false; // track betty's jump status

        //adds audio
        this.sfxJump = scene.sound.add('sfx_jump');
        
    }

    update(){
        // left/right movement
        if(keyLEFT.isDown && this.x >= 0){
            //speed depends on this
            this.x -= 2;
        }else if (keyRIGHT.isDown && this.x <= 600){
            this.x += 2;
        }
        

        // jump button (spacebar)
        // isDown =  if it was pressed this frame, do this
        // JustDown = if it was pressed last frame, do this; this is
        //      to prevent player from holding down F to fire, they 
        //      must manually do it to fire
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

}
//ground prefab
class Ground extends Phaser.Physics.Arcade.Sprite{
    //(scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //setting physics and gravity
        scene.add.existing(this); //add object to existing scene
        //this.body.setImmovable(true); //this.setImmovable()
        this.set = true;
        

        
    }

    update(){
        if(this.set == true){
            this.body.setImmovable(true);

        }

    }

}
//ground prefab
class Ground extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //setting physics and gravity
        scene.add.existing(this); //add object to existing scene
        //this.body.immovable = true; //this.setImmovable()
        //this.

        
    }

    update(){

    }

}
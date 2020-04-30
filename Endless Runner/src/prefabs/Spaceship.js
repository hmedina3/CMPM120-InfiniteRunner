//spaceship prefab
class spaceship extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame,, pointValue)
    //adding pointValue so that further spaceships can be worth more points
    constructor(scene, x, y, texture, frame, pointValue, speed){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); //add object to existing scene
        this.points = pointValue;
        this.speed = speed;
       
    }

    update(){
        //move spaceship left
        //this.x -=3;
        if(this.speed < 500){
            this.x -= game.settings.spaceshipSpeed;
            var direct = 0;
        }else{
            this.x += game.settings.spaceshipSpeed;
            var direct = 1;
        }

        //wraparound screen bounds
        if (direct == 0){
            if(this.x <=0 - this.width){
                //this.x = game.config.width;
                this.reset();
            }
        }else{
            if(this.x > game.config.width - 15){
                this.x = 15;
            }
        }
        
    }

    reset(){
        this.x = game.config.width;
    }
}
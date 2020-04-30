/*  Name: Yongshi Sun 
    Student ID:1619410

    point breakdown:

    Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
        I changed all of the sci-fi related images and sounds into different images and sounds that I found online 
        with creative commons licensing to create a new theme for the game. I decided to make this mod verion of
        Rocket Patrol into a game about eating streak. I also changed the explosion sprite into a different sprite 
        that I thought added a but more "boom" into the game. Finally I also changed one part of the UI of this game.
        I changed the firing button from the F key to the SPACE key because it seemed better fitting for most fingers
        when playing these types of catching games.

    Allow the player to control the Rocket/fork after it's fired (10)
        I added a couple lines of code in the Rocket.js file so that when the rocket (or in my case the fork) is getting
        fired up in the air, the player can control the rocket/fork's left and right movements. Although I could've made it
        so that the rocket/fork can move up and down as well while being fired up, I thought it wouldnt make sense to allow
        the player to move the rocket/fork up and down while being fired up in the air because that would take away the
        purpose of firing up the rocket/fork in the first place so I ended up only allowing the player to move left and right
        when the rocket/fork gets fired up.

    Create a new scrolling tile sprite for the background (10)
        I simply replaced the old sprite tile with a simple png image that I found online. When looking for new scrolling
        background online, I made sure to find one that I knew would repeat seamlessly and made it the new background. Then
        I used the scrolling command to tell the image to scroll in a loop so it looks like it is scrolling forever.
        
    Randomize each spaceship's movement direction at the start of each play (10)
        I was able to make the spaceships (or in my case, the meats) to start off in random directions by making 3 new variables
        and using Math.random() to randomly assign those 3 variables random numbers. Then I made a new parameter for our spaceship
        constructor in spaceship.js called speed so that we can add the random number that we generated into that parameter. Then 
        from there on, in the spaceship.js file, I used an if statement to determine which spaceship/meat will do what direction. If
        the speed(random generated nunber) is < 500 then that spaceship/meat will go left, else it will go right. I also then added a
        new wraparound screen bound for all the spaceships and meats going to the right side.

    Add your own (copyright-free) background music to the Play scene (10)
        Since my game's theme is more on the happy and cartoonish vibe, I decided to add a more up beat background music during the 
        play scene. I did think by looking for an upbeat sound effect on freesound.org under the creative commons's section. Then I
        added the music to the game by setting that audio as the background music and having it play on loop while the play screen 
        is ongoing.

    Implement the speed increase that happens after 30 seconds in the original game (10)
        I created a new variable in game.settings called count and set it as zero. Then in play.js I made sure that count gets incremented
        every frame in the update function. Once count reaches 3000 which is about 30 seconds in the game, I used an if statement to 
        increase the speed of the spaceships/meats from a speed of 3 to a speed of 10. If count >= 3000 then game.setting.spaceshipSpeed = 10.

    




*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scene:[Menu, Play],
};

let game = new Phaser.Game(config);

//reserve some keyboard variables
let keySPACE, keyLEFT, keyRIGHT;

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    count: 0,  
}
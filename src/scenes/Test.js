import Phaser from "phaser"
import TimeBar from "../firstGameSystem/objects/timeBar"

export default class Test extends Phaser.Scene{
    constructor(userID,appSpot){
        super("test")
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot

    }


    preload(){

        this.load.image('gun',this.appSpot + 'src/assets/gun.png')
        this.load.image('target',this.appSpot + 'src/assets/targetS.png')
        this.load.image('hitbox',this.appSpot + 'src/assets/targetS.png')
        this.load.image('gameover',this.appSpot + 'src/assets/gameover/gameoverLabel.png')
        this.load.image('playAgain',this.appSpot + 'src/assets/gameover/playAgainButton.png')
        this.load.image('star',this.appSpot + 'src/assets/star.png')
        this.load.image('sky',this.appSpot + 'src/assets/background.png')

    }

    create(){
        this.add.image(180,300,'sky')
        this.player = this.physics.add.image(180,300,'star')
        this.cameras.main.startFollow(this.player);

        this.timer = new TimeBar(this,"")
        this.timer.start()

        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.graphics = this.add.graphics({ x: 50, y: 36 }).setDepth(2);

        this.cursors = this.input.keyboard.createCursorKeys();
        
    }

    update(time, delta){
        this.graphics.clear();
        for (var i = 0; i < 1; i++)
        {
            this.graphics.fillStyle(this.hsv[30].color, 1);
            this.graphics.fillRect(0, 0, 200 * this.timer.timerEvent.getProgress(), 50);
        }

        this.player.setVelocity(0,0);

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-500);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(500);
        }

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-500);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(500);
        }
    }

}
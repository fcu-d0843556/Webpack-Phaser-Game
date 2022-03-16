import Phaser from "phaser"
import getMouseSpot from "../firstGameSystem/getMouseSpot"
import GameTimer from "../firstGameSystem/GameTimer"
import Score from "../firstGameSystem/ScoreText"
import ballonSpawner from "../firstGameSystem/ballonSpawner"
import DropTimeCounter from "../firstGameSystem/DropTimeCounter"

export default class ShootingGame extends Phaser.Scene{
    constructor(userID){
        super("bangbangShooting")
        this.userID = userID
    }


    preload(){
        console.log("bangbang userID is :" + this.userID)

        // this.load.tilemapTiledJSON('b1','tiles/balloonss.json')
        for(var i=1;i<6;i++){
            this.load.image('balloon' + i,'src/assets/balloon' + i + '.png')
        }
        this.load.image('background','src/assets/background.png')
        this.load.image('star','src/assets/star.png')
        this.load.image('gun','src/assets/gun.png')
        this.load.image('target','src/assets/targetS.png')
        this.load.image('hitbox','src/assets/targetS.png')
        this.load.spritesheet('dude','src/assets/dude.png',{
            frameWidth: 32, frameHeight:48
        });
    }

    create(){
        this.add.image(400,320,'background').setScale(1.1)

        this.cursor = this.input.keyboard.createCursorKeys()
        this.add.image(170,550,'gun').setScale(0.21,0.21).setDepth(1);

        

        this.scoreText = this.createScoreText(16,16,0)
        const timerLabel2 = this.add.text(16, 54, 'Time : ', {fontSize:32,fill:'#000'})
        this.gameTimer = new GameTimer(this,timerLabel2)
        this.gameTimer.start(this.gameover.bind(this),10000)//5s

        this.balloon = new ballonSpawner(this,this.scoreText) 

        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.createBalloon.bind(this),500)//5s
 

        // const moveSpotLabel = this.add.text(10,580,'moveSpot: ',{fontSize:12,fill:'#000'})
        // const clickSpotLabel = this.add.text(10,550,'clickSpot: ',{fontSize:12,fill:'#000'})

        this.mouseSpot = new getMouseSpot(this,"")
        this.clickMouseSpot = new getMouseSpot(this,"")



        this.target = this.physics.add.sprite(400,500,'target').setScale(0.8,0.8)
        this.target.setGravityY(0)

        this.input.on('pointermove',function(pointer){
            this.mouseSpot.get(pointer)
            this.target.x = pointer.x
            this.target.y = pointer.y
        },this)

        // this.input.on('pointerdown',function(pointer){
        //     this.clickMouseSpot.get(pointer)

        // },this)


    }

    gameover(){
        this.physics.pause()
        this.gameOver = true
    }

    createScoreText(x,y,score){
        const style = {fontSize:'32px', fill:'#000'}
        const label = new Score(this,x,y,score,style)
        this.add.existing(label)
        return label
    }

    createBalloon(){
        this.balloon.spawn()
    }

    update(){
        this.gameTimer.update()
    }

}
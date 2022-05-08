import Phaser, { Math } from "phaser"
import getMouseSpot from "../firstGameSystem/objects/getMouseSpot"
import Score from "../firstGameSystem/objects/Score"
import DropTimeCounter from "../firstGameSystem/objects/DropTimeCounter"
import StarsSpawner from "../firstGameSystem/catch-fruit/StarsSpawner"
import GameTimer from "../firstGameSystem/objects/GameTimer"
import BombSpawner from "../firstGameSystem/catch-fruit/BombSpawner"
import ShowMessage from "../firstGameSystem/objects/showMessage"

const BombKey = 'bomb'
const StarKey = 'star'


export default class CatchFruitGame extends Phaser.Scene{


    constructor(userID,appSpot){
        super("catch-fruit")
        this.userID = userID
        this.appSpot = appSpot

        this.player = undefined
        this.cursor = undefined
        this.stars = undefined
        this.scoreText = undefined
        this.bombsGroup = undefined
        this.starsGroup = undefined
        this.gameOver = false
        this.playerMoveSpeed = 400
        this.allJsonData = []

    }

    preload(){
        this.jsonData = this.cache.json.get('jsonData');
        console.log("find jsonData")
        console.log(this.jsonData)

        this.load.image('ground', this.appSpot + 'src/assets/platform.png');
        this.load.image('bomb',this.appSpot + 'src/assets/bomb.png');
        this.load.image('arrowButton',this.appSpot + 'src/assets/arrowButton.png');
        this.load.image('box',this.appSpot + 'src/assets/textbox.png')

        this.load.spritesheet('dude',this.appSpot + 'src/assets/dude.png',{
            frameWidth: 32, frameHeight:48
        });


        const items = this.jsonData.items
        console.log("all items = ")
        console.log(items)

        for(let t=0; t<items.length; t++){
            if(items[t].items){
                for(let s=0; s<items[t].items.length; s++){
                    this.load.image(items[t].items[s].name, this.appSpot + items[t].items[s].src)
                }
                this.allJsonData[items[t].name] = items[t]
            }else{
                if(items[t].src){
                    this.load.image(items[t].name, this.appSpot + items[t].src)
                }
                this.allJsonData[items[t].name] = items[t]
            }
            
        }

        console.log("all allJsonData = ")
        console.log(this.allJsonData)
    }

    create(){
        this.add.image(this.allJsonData.background.position.x, this.allJsonData.background.position.y ,'background').setScale(this.allJsonData.background.size/100)
        

        this.platforms = this.createPlatform()
        this.player = this.createPlayer()
        this.cursor = this.input.keyboard.createCursorKeys()
        this.starsSpawner = new StarsSpawner(this,this.allJsonData.star.name,this.allJsonData.star)
        this.starsGroup = this.starsSpawner.group
        this.bombSpawner = new BombSpawner(this,BombKey)
        this.bombsGroup = this.bombSpawner.groupA

        this.starsSpawner.spawn()

        const scoreTextLabel = this.add.text(this.allJsonData.scoreText.text.x,this.allJsonData.scoreText.text.y, this.allJsonData.scoreText.text.content, this.allJsonData.scoreText.text.style)
        this.scoreText = new Score(this,scoreTextLabel,this.allJsonData.scoreText.text.content,0)
        this.scoreText.showScoreText()

        /* related to collider between objects */
        this.physics.add.collider(this.player,this.platforms)
        this.physics.add.overlap(this.player, this.starsGroup, this.collectStar,null,this)
        this.physics.add.collider(this.platforms, this.starsGroup,this.disableBody,null,this)
        this.physics.add.collider(this.platforms, this.bombsGroup, this.hitBomb,null,this)
        this.physics.add.collider(this.player, this.bombsGroup, this.hitBomb, null, this)

        /* related to time*/
        // const timerLabel = this.add.text(16, 90, 'timeLabel : ', {fontSize:32,fill:'#000'})
        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.handleCountDownFinished.bind(this),500)//5s


        const timerLabel2 = this.add.text(this.allJsonData.timeText.text.x, this.allJsonData.timeText.text.y, this.allJsonData.timeText.text.content, this.allJsonData.timeText.text.style)
        this.gameTimer = new GameTimer(this,timerLabel2,this.allJsonData.timeText.text.content)
        this.gameTimer.start(this.gameover.bind(this),8500)//5s


        this.leftButton = this.physics.add.sprite(70,500,'arrowButton')
        this.leftButton.alpha = 0.3
        this.rightButton = this.physics.add.sprite(300,500,'arrowButton').setFlipX(true);
        this.rightButton.alpha = 0.3
        this.leftButton.setInteractive({ draggable: true })
            .on('dragstart', function(pointer, dragX, dragY){
                this.isMousePress = true
                this.player.setVelocityX(this.playerMoveSpeed * -1)
            }, this)
            .on('drag', function(pointer, dragX, dragY){

                this.player.setVelocityX(this.playerMoveSpeed * -1)
            }, this)
            .on('dragend', function(pointer, dragX, dragY, dropped){
                this.isMousePress = false
                this.player.setVelocityX(0)
            }, this);

        this.rightButton.setInteractive({ draggable: true })
            .on('dragstart', function(pointer, dragX, dragY){
                this.isMousePress = true
                this.player.setVelocityX(this.playerMoveSpeed)
            }, this)
            .on('drag', function(pointer, dragX, dragY){
                this.player.setVelocityX(this.playerMoveSpeed)
            }, this)
            .on('dragend', function(pointer, dragX, dragY, dropped){
                this.isMousePress = false
                this.player.setVelocityX(0)
            }, this);
    }

    handleCountDownFinished(){
        this.starsSpawner.spawn()
    }

    gameover(){
        this.physics.pause()
        this.starCoolDown.stop()
        this.player.setTint(0xff0000)
        this.player.anims.play('stop')
        this.gameOver = true
        this.add.image(180,330,'box')
        this.add.text(180,300,"遊戲結束",{fontSize:'32px', fill:'#000'})
    }

    disableBody(hit,disablePart){   //碰撞後決定消失的物件（右邊）
        disablePart.disableBody(true,true)
    }

    hitBomb(player,bomb){
        // bomb.disableBody(true,true)
    }

    collectStar(player,star){
        star.disableBody(true,true)
        // const timerLabel = this.add.text(16, 90, 'timeLabel : ', {fontSize:32,fill:'#000'})
        this.getItemMessage = new ShowMessage(this,this.allJsonData.star.text.content)
        this.getItemMessage.start(this.getItemMessage.stop(),500)//5s
        this.scoreText.addScore(10)
    }

    createPlatform(){
        const platforms = this.physics.add.staticGroup()
        platforms.create(400,568,'ground').setScale(2).refreshBody()
        platforms.create(400,620,'ground').setScale(2).refreshBody()

        return platforms
    }

    createPlayer(){
        const player = this.physics.add.sprite(180,515,'dude')
        player.setCollideWorldBounds(true)
        this.anims.create({
            key: 'goLeft',
            frames: this.anims.generateFrameNumbers('dude',{ start: 0,end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'goRight',
            frames: this.anims.generateFrameNumbers('dude',{ start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'stop',
            frames: [{key:'dude', frame:4}],
            frameRate: 20
        })
        return player
    }

    update(){
        if(this.gameOver == true){
            return
        }

        if(this.cursor.left.isDown){
            this.player.setVelocityX(this.playerMoveSpeed * -1)
            this.player.anims.play('goLeft',true)
        }else if(this.cursor.right.isDown){
            this.player.setVelocityX(this.playerMoveSpeed)
            this.player.anims.play('goRight',true)
        }else if(!this.isMousePress){
            this.player.setVelocityX(0)
            this.player.anims.play('stop',true)
        }

        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-120)
        }

        this.starCoolDown.update()
        this.gameTimer.update()
    }
}



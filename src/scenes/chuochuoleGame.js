import Phaser, { Physics } from "phaser";
import getMouseSpot from "../firstGameSystem/getMouseSpot"
import WordDisappearTimer from '../firstGameSystem/WordDisappearTimer';

export default class chuochuole extends Phaser.Scene{
    constructor(userID){
        super('chuochuole')
        this.userID = userID
    }

    preload(){
        this.load.image('background', 'src/assets/background.png')
        this.load.image('box','src/assets/chuochuobox.png')
        this.load.image('smallBox','src/assets/smallBox.png')
        this.load.image('smallBoxBreak','src/assets/smallBoxBreak.png')
        this.load.image('finger','src/assets/finger.png')
        this.load.image('heart','src/assets/heart.png')

    }

    create(){
        this.add.image(400,320,'background')
        this.add.image(180,400,'box')
        this.add.text(20,70,'選個洞戳戳看有什麼獎品吧！',{fontSize:25,fill:'#fff',backgroundColor:'rgba(0,255,0,0.25)'})


        let smallBoxs = this.physics.add.group()
        for(let y = 300,timesY = 0;timesY<3; y+= 100,timesY++){
            for(let x = 80,timesX = 0;timesX<3; x+= 100,timesX++){
                smallBoxs.create(x,y,'smallBox')
            }
        }

        Phaser.Actions.Call(smallBoxs.getChildren(),function(child){
            child.setInteractive()
            child.on('pointerdown',function(){
                console.log('you distroy ' + child.texture.key)
                this.getItemTimer = new WordDisappearTimer(this,'你獲得了xxx！',child)
                this.getItemTimer.fingerStart(this.getItemTimer.fingerStop(),1000)
                child.disableInteractive()
            },this)
        }, this)



        /* get now mouse spot*/
        // const MouseLabel = this.add.text(10, 578, 'spot : ', {fontSize:16,fill:'#000'})
        // this.MouseSpot = new getMouseSpot(this, MouseLabel)
        // this.input.on('pointermove',function(pointer){
        //     this.MouseSpot.get(pointer)
        // },this)
    }


}
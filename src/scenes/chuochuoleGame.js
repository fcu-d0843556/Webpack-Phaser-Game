import Phaser from "phaser";
import getMouseSpot from "../firstGameSystem/getMouseSpot"
import WordDisappearTimer from '../firstGameSystem/WordDisappearTimer';

export default class chuochuole extends Phaser.Scene{
    constructor(userID,appSpot){
        super('chuochuole')
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot

    }

    preload(){
        this.jsonData = this.cache.json.get('jsonData');
        console.log("find jsonData")
        console.log(this.jsonData)

        this.load.image('box',this.appSpot + 'src/assets/chuochuobox.png')
        this.load.image('smallBox',this.appSpot + 'src/assets/smallBox.png')
        this.load.image('smallBoxBreak',this.appSpot + 'src/assets/smallBoxBreak.png')
        this.load.image('finger',this.appSpot + 'src/assets/finger.png')
        this.load.image('heart',this.appSpot + 'src/assets/heart.png')

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
        this.add.image(this.allJsonData.background.position.x, this.allJsonData.background.position.y ,'background')    
        this.add.image(180,400,'box')
        this.add.text(20,70,'選個洞戳戳看有什麼獎品吧！',{fontSize:25,fill:'#fff',backgroundColor:'rgba(0,255,0,0.25)'})


        let smallBoxs = this.physics.add.group()
        let smallBoxsTimes = 0
        for(let y = 300,timesY = 0;timesY<3; y+= 100,timesY++){
            for(let x = 80,timesX = 0;timesX<3; x+= 100,timesX++){
                let smallBox = this.physics.add.sprite(x,y,'smallBox')
                smallBox.setData('text',this.allJsonData.boxObject.items[smallBoxsTimes].text)
                smallBox.setData('name',this.allJsonData.boxObject.items[smallBoxsTimes].name)
                smallBox.setData('size',this.allJsonData.boxObject.items[smallBoxsTimes].size)
                smallBox.setData('x',this.allJsonData.boxObject.items[smallBoxsTimes].position.x)
                smallBox.setData('y',this.allJsonData.boxObject.items[smallBoxsTimes].position.y)
                smallBoxs.add(smallBox)
                smallBoxsTimes++
            }   
        }

        Phaser.Actions.Call(smallBoxs.getChildren(),function(child){
            child.setInteractive()
            child.on('pointerdown',function(){
                console.log('you distroy ' + child.texture.key)
                this.getItemTimer = new WordDisappearTimer(this,child)
                this.getItemTimer.fingerStart(this.getItemTimer.fingerStop(),1000)
                child.disableInteractive()
            },this)
        }, this)
    }


}
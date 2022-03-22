import Phaser from "phaser"
import maskManSpawner from "../firstGameSystem/maskManSpawner"
import foodSpawner from "../firstGameSystem/foodSpawner"
import GameTimer from "../firstGameSystem/GameTimer"
import Score from "../firstGameSystem/ScoreText"

var zone

export default class CookingGame extends Phaser.Scene{
    constructor(userID,appSpot){
        super('cooking')
        this.userID = userID
        this.appSpot = appSpot

        this.food = undefined
        this.allJsonData = []
        this.scoreText = undefined
        this.gameOver = false
    }

    preload(){
        this.jsonData = this.cache.json.get('jsonData');
        console.log("find jsonData")
        console.log(this.jsonData)

        this.load.image('half',this.appSpot + 'src/assets/halfFood.png')
        this.load.image('flip',this.appSpot + 'src/assets/halfFlipFood.png')
        this.load.image('well',this.appSpot + 'src/assets/wellFood.png')
        this.load.image('panel',this.appSpot + 'src/assets/cookpanel.png')
        this.load.image('blackBlock',this.appSpot + 'src/assets/blackBlock.png')

        this.load.image('cookSpot',this.appSpot + 'src/assets/cookSpot.png')
        this.load.image('maskMan',this.appSpot + 'src/assets/maskMan.png')
        this.load.image('maskManSmile',this.appSpot + 'src/assets/maskManSmile.png')
        this.load.image('maskManAngry',this.appSpot + 'src/assets/maskManAngry.png')

        this.load.image('wantedItem',this.appSpot + 'src/assets/wantedItem.png')

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
        this.add.image(400,480,'panel')
        this.add.image(400,620,'blackBlock')

        this.scoreText = this.createScoreText(16,16,0)
        const timerLabel2 = this.add.text(16, 54, 'Time : ', {fontSize:32,fill:'#000'})
        this.gameTimer = new GameTimer(this,timerLabel2)
        this.gameTimer.start(this.gameover.bind(this),10000)//5s


        this.maskMan = new maskManSpawner(this,'maskMan',this.scoreText)
        this.maskMan.spawn()
        zone = this.add.zone(200,350,50,50)

        this.physics.world.enable(zone)
        zone.body.setAllowGravity(false)
        zone.body.moves = false


        var id = 0
        this.foodGroup = []
        this.cookGroup = this.createFoodSpot()
        this.foodCan = this.physics.add.sprite(this.allJsonData.foodCan.position.x,this.allJsonData.foodCan.position.y,'foodCan').setScale(this.allJsonData.foodCan.size/100)
        this.foodCan.setInteractive().on('pointerdown',function(){
            this.food = new foodSpawner(this, 'rawFood', id, this.allJsonData.rawFood)
            this.foodGroup.push(this.food)
            this.foodGroup[id].spawn()
            id++

        },this)

        this.setInputInteractive()
        
        
    }

    setInputInteractive(){
        // return this.food
        this.input.on('dragover', function (pointer, gameObject, dropZone) {
            if(dropZone.texture.key == "cookSpot"){
                dropZone.setTint(0xffffff);
                console.log('name : ' + gameObject.name)
                var name = parseInt(gameObject.name)
                if(this.foodGroup[name].timer.label){
                    this.foodGroup[name].timer.label.x = gameObject.x
                    this.foodGroup[name].timer.label.y = gameObject.y
                }
                if(this.foodGroup[name].timer.timerEvent){
                    // console.log('wow!!')
                    this.foodGroup[name].timer.keepStart()
                }
            }
            
        },this);

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            
            if(dropZone.texture.key == "cookSpot"){
                dropZone.clearTint();
                var name = parseInt(gameObject.name)
                if(this.foodGroup[name].timer.label){
                    this.foodGroup[name].timer.label.x = gameObject.x
                    this.foodGroup[name].timer.label.y = gameObject.y
                }
                
                if(this.foodGroup[name].timer.timerEvent){
                    // console.log('wow!!')

                    this.foodGroup[name].timer.pause()
                }
            }
            
        },this);    //寫function 時一定要加這裡的 ,this

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

    createFoodSpot(){
        const foodGroup = this.physics.add.group()
        for(let i=1,y=428;i<=2;i++){
            for(let x=200,t=1;t<=5;x+=100,t++){
                foodGroup.create(x,y,'cookSpot')
            }
            y=505
        }

        Phaser.Actions.Call(foodGroup.getChildren(),function(child){
            child.setInteractive({draggable: false,})
                 .on('dragstart', function(pointer, dragX, dragY){
                     // ...
                 })
                 .on('drag', function(pointer, dragX, dragY){
                     child.setPosition(dragX, dragY);
                 })
                 .on('dragend', function(pointer, dragX, dragY, dropped){
                     // ...
                 })
            child.input.dropZone = true

        },this)
        return foodGroup
    }

    update(){
        for(var i= 0 ;i<this.foodGroup.length;i++){
            this.foodGroup[i].timer.update()
        }
        zone.body.debugBodyColor = zone.body.touching.none ? 0x00ffff : 0xffff00
        this.gameTimer.update()

    }
}


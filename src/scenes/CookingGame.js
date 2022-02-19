import Phaser from "phaser"
import foodSpawner from "../firstGameSystem/foodSpawner"

var zone

export default class CookingGame extends Phaser.Scene{
    constructor(userID){
        super('cooking')
        this.userID = userID
        this.food = undefined
    }

    preload(){
        this.jsonData = this.cache.json.get('jsonData');
        console.log("find jsonData")
        console.log(this.jsonData)

        this.load.image('half','src/assets/halfFood.png')
        this.load.image('flip','src/assets/halfFlipFood.png')
        this.load.image('well','src/assets/wellFood.png')
        this.load.image('panel','src/assets/cookpanel.png')
        this.load.image('cookSpot','src/assets/cookSpot.png')
        const items = this.jsonData.items
        console.log("items =")
        console.log(items)

        for(let t=0; t<items.length; t++){
            this.load.image(items[t].name, items[t].src)
        }


    }


    create(){


        this.add.image(400,300,'background')
        this.add.image(400,480,'panel')


        zone = this.add.zone(200,350,50,50)

        this.physics.world.enable(zone)
        zone.body.setAllowGravity(false)
        zone.body.moves = false


        var id = 0
        this.foodGroup = []
        this.cookGroup = this.createFoodSpot()
        this.foodCan = this.physics.add.sprite(130,340,'foodCan')
        this.foodCan.setInteractive().on('pointerdown',function(){
            this.food = new foodSpawner(this,'rawFood',id)
            this.foodGroup.push(this.food)
            this.foodGroup[id].spawn()
            id++

        },this)






        // return this.food
        this.input.on('dragover', function (pointer, gameObject, dropZone) {
            dropZone.setTint(0xffffff);
            console.log('name : ' + gameObject.name)
            var name = parseInt(gameObject.name)

            this.foodGroup[name].timer.label.x = gameObject.x
            this.foodGroup[name].timer.label.y = gameObject.y

            if(this.foodGroup[name].timer.timerEvent){
                // console.log('wow!!')
                this.foodGroup[name].timer.keepStart()
            }
        },this);

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            dropZone.clearTint();
            // console.log('out')
            var name = parseInt(gameObject.name)

            this.foodGroup[name].timer.label.x = gameObject.x
            this.foodGroup[name].timer.label.y = gameObject.y
            if(this.foodGroup[name].timer.timerEvent){
                // console.log('wow!!')

                this.foodGroup[name].timer.pause()
            }
        },this);    //寫function 時一定要加這裡的 ,this

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
    }
}


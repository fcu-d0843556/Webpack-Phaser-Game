import Phaser from "phaser"
import CookingTimer from "./CookingTimer"


export default class foodSpawner{
    constructor(scene, Key = 'rawFood',id,data) {
        this.scene = scene
        this.key = Key
        this.id = id
        this.data = data
        this.foodcountdown = 1
        const cookTimeLabel = this.scene.add.text(200,350,'',{fontSize:32,fill:'#000'})

        this.timer = new CookingTimer(scene,"")

    }

    getTimer(){
        return this.timer
    }
    spawn(){
        this.food = this.scene.add.sprite(this.data.position.x,this.data.position.y,'rawFood')
        this.food.setInteractive()
        this.scene.input.setDraggable(this.food)
        this.food.setName(this.id)
        this.timer.start(this.countEnd.bind(this),2000)
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX
            gameObject.y = dragY
        });
       
    }

    countEnd(){
        switch (this.foodcountdown) {
            case 1:
                this.food.setTexture('half')
                break;
            case 2:
                this.food.setTexture('well')
                break
            default:
                break;
        }
        if(this.foodcountdown==3){
            this.timer.stop()
        }else{
            this.timer.start(this.countEnd.bind(this),2000)
            this.timer.keepStart()
            this.foodcountdown++
        }


    }

}
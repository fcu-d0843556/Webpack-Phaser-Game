import Phaser from "phaser"
import CookingTimer from "./CookingTimer"


export default class foodSpawner{
    constructor(scene, Key = 'raw',id) {
        this.scene = scene
        this.key = Key
        this.id = id
        this.foodcountdown = 1
        const cookTimeLabel = this.scene.add.text(200,350,'',{fontSize:32,fill:'#000'})

        this.timer = new CookingTimer(scene,cookTimeLabel)

    }

    getTimer(){
        return this.timer
    }
    spawn(){
        this.food = this.scene.add.sprite(200,350,'raw')
        this.food.setInteractive()
        this.scene.input.setDraggable(this.food)
        this.food.setName(this.id)
        this.timer.start(this.countEnd.bind(this),2000)
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX
            gameObject.y = dragY
        });
        // // return this.food
        // this.scene.input.on('dragover', function (pointer, gameObject, dropZone) {
        //     dropZone.setTint(0xffffff);
        //     // console.log('in')
        //     this.timer.label.x = gameObject.x
        //     this.timer.label.y = gameObject.y

        //     if(this.timer.timerEvent){
        //         // console.log('wow!!')
        //         this.timer.keepStart()
        //     }
        // },this);

        // this.scene.input.on('dragleave', function (pointer, gameObject, dropZone) {
        //     dropZone.clearTint();
        //     // console.log('out')
        //     this.timer.label.x = gameObject.x
        //     this.timer.label.y = gameObject.y
        //     console.log(gameObject)
        //     if(this.timer.timerEvent){
        //         // console.log('wow!!')

        //         this.timer.pause()
        //     }
        // },this);    //寫function 時一定要加這裡的 ,this
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
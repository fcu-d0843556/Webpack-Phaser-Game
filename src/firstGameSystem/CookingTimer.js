import Phaser from "phaser"

export default class CookingTimer{

    constructor(scene,label){
        this.scene = scene
        this.label = label
    }

    start(callback,duration = 1000){
        this.stop()

        this.duration = duration

        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.stop()
                if(callback){
                    callback()
                }
            },
            paused: true
        })
    }


    pause(){
        this.timerEvent.paused = true
    }

    keepStart(){
        this.timerEvent.paused = false
    }

    stop(){
        if(this.timerEvent){
            this.timerEvent.destroy()
            this.timerEvent = undefined
        }
    }

    update(){
        if(!this.timerEvent || this.duration <= 0){
            return
        }

        const elapsed = this.timerEvent.getElapsed()
        const remaining = this.duration - elapsed
        const seconds = remaining/1000
        // this.label.text = 'cookTime : ' + seconds.toFixed(2)
        this.label.text = seconds.toFixed(2)

    }


}
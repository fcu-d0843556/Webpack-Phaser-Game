export default class ImgControl {
    constructor(scene,type){
        this.scene = scene
        this.img = this.scene.add.image(180,320,type).setVisible(false).setDepth(1)
        this.visibleFunction = this.setImgVisible
    }

    
    setImgVisible(type){
        this.img.setVisible(type)
        if(type){
            this.timerStart(null,1000)
        }
    }

    timerStart(callback,duration){
        
        this.TimerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.timerStop()
                this.setImgVisible(false)
                if(callback){
                    callback()
                }
            }
        })

    }

    timerStop(){
        if(this.TimerEvent){
            this.TimerEvent.destroy()
            this.TimerEvent = undefined
        }
    }

}
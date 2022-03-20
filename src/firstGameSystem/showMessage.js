export default class ShowMessage {
    constructor(scene,text){
        this.scene = scene
        this.text = text
    }

    start(callback,duration){
        this.textTimer = this.scene.add.text(20,130,this.text,{fontSize:25,fill:'#fff',backgroundColor:'rgba(0,255,0,0.25)'})
        this.disapperTimerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.stop()
                if(callback){
                    callback()
                }
            }
        })

    }

    stop(){
        if(this.disapperTimerEvent){
            this.disapperTimerEvent.destroy()
            this.disapperTimerEvent = undefined
            this.textTimer.destroy(true,true)
        }
    }

}
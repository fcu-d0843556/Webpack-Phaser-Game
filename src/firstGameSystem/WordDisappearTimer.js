export default class WordDisappearTimer {
    constructor(scene,text,child){
        this.scene = scene
        this.text = text
        this.child = child
        this.x = child.x
        this.y = child.y
        this.finger = this.scene.physics.add.sprite(this.x,this.y-250,'finger').setScale(0.75,0.75)
    }



    fingerStart(callback,duration){
        this.fingerStop()
        this.finger.setGravity(0,200)
        this.fingerTimerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.fingerStop()
                this.breakStart(this.breakStop(),2000)
                if(callback){
                    callback()
                }
            }
        })
    }

    fingerStop(){
        if(this.fingerTimerEvent){
            this.child.setTexture('smallBoxBreak')
            this.fingerTimerEvent.destroy()
            this.fingerTimerEvent = undefined
            this.finger.destroy(true,true)
        }
    }

    breakStart(callback,duration){
        this.heart = this.scene.physics.add.image(this.x,this.y,'heart')

        this.scene.physics.moveToObject(this.heart, {x:this.x,y:this.y-10}, 50);

        this.textTimer = this.scene.add.text(20,130,this.text,{fontSize:25,fill:'#fff',backgroundColor:'rgba(0,255,0,0.25)'})
        this.BreakTimerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.breakStop()
                if(callback){
                    callback()
                }
            }
        })

    }

    breakStop(){
        if(this.BreakTimerEvent){
            this.BreakTimerEvent.destroy()
            this.heart.destroy()
            this.BreakTimerEvent = undefined
            this.textTimer.destroy(true,true)
        }
    }

}
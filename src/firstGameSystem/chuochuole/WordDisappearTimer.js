export default class WordDisappearTimer {
    constructor(scene,child){
        this.scene = scene
        this.child = child
        this.text = this.child.getData('text')
        this.image = this.child.getData('name')
        this.size = this.child.getData('size')/100
        this.x = child.x
        this.y = child.y
        this.objectX = this.child.getData('x')
        this.objectY = this.child.getData('y')
        console.log(this.child.getData('x'));
        console.log(this.objectY);

    }



    fingerStart(callback,duration){
        this.finger = this.scene.physics.add.sprite(this.x,this.y-250,'finger').setScale(0.75,0.75)

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
        

        this.heart = this.scene.physics.add.image(this.objectX,this.objectY,this.image).setScale(this.size)

        this.scene.physics.moveToObject(this.heart, {x:this.objectX,y:0}, 50);

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
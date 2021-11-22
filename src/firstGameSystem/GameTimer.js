import Phaser from "phaser"


export default class GameTimer {

    /*
        {Phaser.Scene} scene
        {Phaser.GameObjects.Text} label
        {Phaser.Time.TimerEvent} timerEvent
        duration = 0
        {() => void} finishedCallback


        {number} duration
        {() => void} callback
    */


    constructor(scene,label){
        this.scene = scene
        this.label = label
    }

    start(callback, duration = 10000){ //10s 預設值

        this.stop()

        this.finishCallback = callback
        this.duration = duration


        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {       // 時間到了之後執行的事件
                this.label.text = 'time\'s up !'
                this.stop()

                if(callback){
                    callback()
                }
            },
        })

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

        const elapsed = this.timerEvent.getElapsed()  //從0開始，計算過程中跑的時間   碼錶
        const remaining = this.duration - elapsed   //反著來 等於 設定時間 - 經過時間 倒數計時
        const seconds = remaining / 1000            //把 毫秒 換算為 秒
        this.label.text = 'time  : ' + seconds.toFixed(0)        //到小數點 2 位數
    }

}
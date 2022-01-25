import Phaser from "phaser"

let OK = false

const userPath = sessionStorage.getItem("userID");

export default class Loading extends Phaser.Scene{
    constructor(){
        super('loading')
    }

    preload(){
        this.load.json('jsonData',`src/static/upload/${userPath}/userModifyData.json`)
    }

    create(){
        this.add.text(40,250,'Loading...',{fontSize:50,fill:'#fff'})
        setTimeout(this.hello,2000)
    }

    hello(){
        OK = true

    }

    update(){
        if(OK){
            this.scene.start("cooking")
        }
    }
}
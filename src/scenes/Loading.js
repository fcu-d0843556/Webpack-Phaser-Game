import Phaser from "phaser"

let OK = false


export default class Loading extends Phaser.Scene{
    constructor(userID,gameID,appSpot){
        super('loading')
        this.userID = userID
        this.gameID = gameID
        this.appSpot = appSpot
        console.log("loading userID : " + this.userID)
        console.log("loading gameID : " + this.gameID)
        console.log("loading appSpot : " + this.appSpot)



    }

    preload(){

        this.load.json('jsonData', this.appSpot + `src/static/upload/${this.userID}/${this.gameID}/userModifyData.json`)

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
            switch(this.gameID){
                case 'cooking':
                    console.log("start cooking !")
                    this.scene.start("cooking")
                    break
                case 'bangbangShooting':
                    console.log("start Shooting !")
                    this.scene.start("bangbangShooting")
                    break
                case 'catch-fruit':
                    console.log("start catch-fruit !")
                    this.scene.start("catch-fruit")
                    break
                case 'chuochuole':
                    console.log("start chuochuole !")
                    this.scene.start("chuochuole")
                    break
                case 'quiz':
                    console.log("start quiz !")
                    this.scene.start("quiz")
                    break
                case 'test':
                    console.log("start test !")
                    this.scene.start("test")
                    break
                default:
                    console.log("still loading !")
                    this.scene.start("loading")
            }

        }
    }
}
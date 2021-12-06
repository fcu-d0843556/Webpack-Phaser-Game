import Phaser from "phaser"
const userPath = sessionStorage.getItem("userID");
let num = 0;
let OK = false
export default class CookingGame extends Phaser.Scene{
    constructor(){
        super('loading')
    }

    preload(){

        // 'src/assets/sky.png'
        // this.load.image('sky',`../static/upload//view1.png`)
        // this.load.image('raw','src/assets/rawFood.png')
        // this.load.image('half','src/assets/halfFood.png')
        // this.load.image('flip','src/assets/halfFlipFood.png')
        // this.load.image('well','src/assets/wellFood.png')
        // this.load.image('panel','src/assets/cookpanel.png')
        // this.load.image('cookSpot','src/assets/cookSpot.png')
       // this.load.image('foodCan',gameData)
        // this.load.image('foodCan',`src/assets/foodCan.png`)
        //this.load.image('foodCan',`src/static/upload/${userPath}/btn_login_hover.png`)


    }

    create(){

        this.add.text(40,250,'Loading...',{fontSize:50,fill:'#fff'})
        setTimeout(this.hello,2000)
    }

    hello(){
        OK = true

        // if(!userPath){
        //     location.reload()
        // }
        console.log(OK)
    }

    update(){
        console.log(OK)

        if(OK){
            this.scene.start("cooking")
            // this.scene.start("catch-fruit")

        }
    }
}
import Phaser from "phaser"
import getMouseSpot from "../firstGameSystem/getMouseSpot"

export default class ShootingGame extends Phaser.Scene{
    constructor(){
        super("bangbangShooting")
    }


    preload(){
        // this.load.tilemapTiledJSON('b1','tiles/balloonss.json')
        for(var i=1;i<6;i++){
            this.load.image('balloon' + i,'src/assets/balloon' + i + '.png')
        }
        this.load.image('sky','src/assets/sky.png')
        this.load.image('star','src/assets/star.png')
        this.load.image('gun','src/assets/gun.png')
        this.load.image('target','src/assets/targetS.png')
        this.load.image('hitbox','src/assets/targetS.png')
        this.load.spritesheet('dude','src/assets/dude.png',{
            frameWidth: 32, frameHeight:48
        });
    }

    create(){
        this.add.image(400,300,'sky')

        this.cursor = this.input.keyboard.createCursorKeys()
        this.add.image(400,520,'gun').setScale(0.21,0.21)

        var balloon = this.physics.add.group()
        for(var i=1,x=100;i<=5;i++,x+=150){
            for(var j=1,y=200;j<=2;j++,y+=150){
                balloon.create(x,y,'balloon' + i).setScale(0.55,0.55)
            }
        }

        Phaser.Actions.Call(balloon.getChildren(),function(child){
            child.setInteractive()
            child.on('pointerdown',function(){
                console.log('you distroy ' + child.texture.key)
                child.destroy(true,true)
            },this)
        }, this)

        const moveSpotLabel = this.add.text(10,580,'moveSpot: ',{fontSize:12,fill:'#000'})
        const clickSpotLabel = this.add.text(10,550,'clickSpot: ',{fontSize:12,fill:'#000'})

        this.mouseSpot = new getMouseSpot(this,moveSpotLabel)
        this.clickMouseSpot = new getMouseSpot(this,clickSpotLabel)



        this.target = this.physics.add.sprite(400,500,'target').setScale(0.8,0.8)
        this.target.setGravityY(0)

        this.input.on('pointermove',function(pointer){
            this.mouseSpot.get(pointer)
            this.target.x = pointer.x
            this.target.y = pointer.y
        },this)

        this.input.on('pointerdown',function(pointer){
            this.clickMouseSpot.get(pointer)

        },this)


    }

    createBalloon(){

        const balloon = this.add.group();
        balloon.create(400,200,'balloon')
        balloon.create(400,350,'balloon')
        balloon.enableBody = true;
        return balloon
    }

    update(){


    }

}
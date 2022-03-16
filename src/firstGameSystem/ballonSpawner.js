import Phaser from "phaser"

export default class ballonSpawner{
    constructor(scene,score) {
        this.scene = scene
        this.score = score
        this.number = 0
    }

    get group(){
        return this._group
    }
    getNumber(){
        return this.number
    }
    spawn(){
        // this.physics.add.group()
        let x = Phaser.Math.Between(40,300)
        let type = Phaser.Math.Between(1,5)
        let speed = Phaser.Math.Between(-150,-300)
        
        let balloonChild = this.scene.physics.add.sprite(x,700,'balloon'+type ).setScale(0.55,0.55).setGravity(0, speed);
        balloonChild.setInteractive().on('pointerdown',function(){
            // console.log('you distroy ' + balloonChild.texture.key)
            this.score.addScore(10)
            balloonChild.destroy(true,true)
        },this)

        this.number++
    }

}
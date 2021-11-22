import Phaser from "phaser"

export default class StarsSpawner{
    constructor(scene, StarKey = 'star') {
        this.scene = scene
        this.key = StarKey
        this._group = this.scene.physics.add.group()
        this.number = 0
    }

    get group(){
        return this._group
    }
    getNumber(){
        return this.number
    }
    spawn(){
        // const stars = this.physics.add.group({
        //     key: 'star',
        //     repeat: 11,
        //     setXY:{x:12, y:0, stepX: 70}
        // })
        let x = Phaser.Math.Between(100,700)
        const stars = this.group.create(x, 10,this.key)
        this.number++
        return stars
    }
}
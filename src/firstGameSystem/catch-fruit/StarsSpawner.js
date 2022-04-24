import Phaser from "phaser"

export default class StarsSpawner{
    constructor(scene, key ,data) {
        this.scene = scene
        this.key = key
        this.data = data
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
        let x = Phaser.Math.Between(40,300)
        const stars = this.group.create(x, 10,this.key).setGravity(0, 150).setScale(this.data.size/100);
        this.number++
        return stars
    }
}
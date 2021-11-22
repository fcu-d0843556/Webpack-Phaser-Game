import Phaser from "phaser"

export default class getMouseSpot{
    constructor(scene,label){
        this.scene = scene
        this.label = label
        this.line = this.label.text
    }
    get(pointer){
        this.label.text = this.line + pointer.x + ',' + pointer.y
    }
}
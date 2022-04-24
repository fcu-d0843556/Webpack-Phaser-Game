import { format } from "path";
import Phaser from "phaser"

const formatScore = (score,text) => text + score

export default class Score extends Phaser.GameObjects.Text{
    constructor(scene,x,y,text,score,style) {
        super(scene,x,y,score,style)
        this.text = text
        this.score = score
        this.save = this.text
        console.log(this.score);
    }
    setScore(score){
        this.score = score
        this.showScore()
    }

    addScore(points){
        this.score += points
        this.showScore()
    }

    showScore(){
        // console.log(this.text);
        
        
        this.text = this.save + this.score
    }

    getScore(){
        return this.score
    }
}
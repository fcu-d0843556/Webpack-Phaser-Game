import Phaser from "phaser"

const formatScore = (score) => 'Score : ' + score


export default class Score extends Phaser.GameObjects.Text{
    constructor(scene,x,y,score,style) {
        super(scene,x,y,formatScore(score),style)
        this.score = score
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
        this.setText(formatScore(this.score))
    }
}
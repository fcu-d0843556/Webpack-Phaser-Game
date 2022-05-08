import Phaser from "phaser"

const formatScore = (score) => 'Score: ' + score

export default class Score{
    constructor(scene,label,text,score){
        this.scene = scene
        this.label = label
        this.text = text
        this.score = score
    }

    setScore(score){
        this.score = score
        this.showScoreText()
    }

    addScore(score){
        this.score += score
        this.showScoreText()
    }

    add(points){
        this.setScore(this.score + points)

    }

    showScoreText(){
        this.label.text = this.text + " : " + this.score
    }
}
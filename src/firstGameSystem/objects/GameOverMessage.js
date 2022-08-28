export default class GameoverMessage{
    constructor(scene,score){
        this.scene = scene
        this.score = score
    }

    create(){
        this.scene.add.image(180,330,'gameover').setDepth(2);
        let playAgain = this.scene.add.image(180,330,'playAgain').setDepth(2);
        playAgain.setInteractive().on('pointerdown',function(){
            console.log('nigoa')
            this.scene.scene.restart()
        },this)
        this.scene.add.text(125,115,"遊戲結束",{fontSize:'32px', fill:'#000'}).setDepth(2);
        this.scene.add.text(85,155,"你的得分是：" + this.score,{fontSize:'32px', fill:'#000'}).setDepth(2);
    }
} 


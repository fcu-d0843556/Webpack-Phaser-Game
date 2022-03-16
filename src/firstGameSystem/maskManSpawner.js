import Phaser from "phaser"
import CookingTimer from "./CookingTimer"


export default class maskManSpawner{
    constructor(scene, Key, score) {
        this.scene = scene
        this.key = Key
        this.score = score
    }

    spawn(){
        this.hitBox = this.scene.physics.add.sprite(150,180,'wantedItem').setFlipX(true).setScale(0.7);
        this.hitBox.setInteractive()
        this.hitBox.input.dropZone = true

        this.maskMan = this.scene.physics.add.sprite(250,250,this.key).setScale(0.7)

        this.scene.input.on('drop', function (pointer, gameObject, dropZone) {
            if(dropZone.texture.key == "wantedItem"){
                switch(gameObject.texture.key){
                    case 'rawFood':
                        this.maskMan.setTexture('maskManAngry')
                        this.score.addScore(-10)
                        break
                    case 'half':
                        this.maskMan.setTexture('maskMan')
                        this.score.addScore(5)
                        break
                    case 'well':
                        this.maskMan.setTexture('maskManSmile')
                        this.score.addScore(10)
                        break
                }
                gameObject.destroy(true,true)
            }
        },this);
        
        this.scene.physics.add.sprite(150,160,'well');



    }

}
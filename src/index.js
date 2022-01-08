import Phaser from 'phaser';
import config from './config';
import Loading from './scenes/Loading'
import CatchFruitGame from './scenes/CatchFruitGame'
import ShootingGame from './scenes/ShootingGame'
import CookingGame from './scenes/CookingGame'
export let userID

class Game extends Phaser.Game {
  constructor() {
    super(config);
    // this.scene.add('bangbangShooting', new ShootingGame());
    // this.scene.add('catch-fruit', new CatchFruitGame());
    // this.scene.add('loading')
    this.id = userID
    console.log("this.id :" + this.id)
    this.scene.add('loading', new Loading())
    this.scene.add('cooking', new CookingGame());
    this.scene.add('catch-fruit', new CatchFruitGame());

    this.scene.start('loading')

  }

}

const game = new Game(); /* eslint-disable-line */



//addEventListener
window.addEventListener("load",function(){
  let findChangeID = document.getElementById("changeScene")
  let findGoBackID = document.getElementById("goBackSetting")
  let findGetUserID = document.getElementById("getUserId")

  if(findChangeID){

    findChangeID.addEventListener('click',()=>{
      counting();
      changeScene(gameNum);
    })
  }

  if(findChangeID){
    findGoBackID.addEventListener('click',()=>{
        goBackSetting();
    })
  }

  if(findGetUserID){
    userID = findGetUserID.value
    sessionStorage.setItem('userID',userID);
    const userPath = sessionStorage.getItem("userID");
    console.log("userID is : " + userPath)

  }
})



const changeScene = function(gameNum){
  // switch(gameNum){
  //   case 1:
  //     game.scene.stop('catch-fruit');
  //     game.scene.start('cooking')
  //     break
  //   case 2:
  //     game.scene.stop('cooking');
  //     game.scene.start('bangbangShooting')
  //     break
  //   case 3:
  //     game.scene.stop('bangbangShooting');
  //     game.scene.start('catch-fruit')

  //     break
  // }
  console.log(gameNum)
}

const goBackSetting = function(){
    location.href = "/upload"
}


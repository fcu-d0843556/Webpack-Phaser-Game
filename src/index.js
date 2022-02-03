import Phaser from 'phaser';
import config from './config';
import ShootingGame from './scenes/ShootingGame'
import Loading from './scenes/Loading'
// import CatchFruitGame from './scenes/CatchFruitGame'
import CookingGame from './scenes/CookingGame'

window.addEventListener("load",function(){
  let findGetUserID = document.getElementById("getUserID")
  let findGameID = document.getElementById("getGameID")

  let userID
  let gameID

  if(findGetUserID){
    userID = findGetUserID.value
  }

  if(findGameID){
    gameID = findGameID.value
  }
   /* eslint-disable-line */


  let game = new Game();
  game.scene.add('loading', new Loading(userID,gameID));
  game.scene.add('bangbangShooting',new ShootingGame(userID))
  game.scene.add('cooking',new CookingGame(userID))

  game.scene.start('loading')
})





class Game extends Phaser.Game {
  constructor() {
    super(config);
  }

}
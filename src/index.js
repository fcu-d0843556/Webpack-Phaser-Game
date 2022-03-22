import Phaser from 'phaser';
import config from './config';
import ShootingGame from './scenes/ShootingGame'
import Loading from './scenes/Loading'
import CatchFruitGame from './scenes/CatchFruitGame'
import CookingGame from './scenes/CookingGame'
import chuochuoleGame from './scenes/chuochuoleGame'

window.addEventListener("load",function(){
  let findGetUserID = document.getElementById("getUserID")
  let findGameID = document.getElementById("getGameID")
  let findPassword = document.getElementById("password")
  let userID
  let gameID
  let password
  let appSpot
  if(findGetUserID){
    userID = findGetUserID.value
  }

  if(findGameID){
    gameID = findGameID.value
  }

  if(findPassword){
    password = findPassword.value
    if(password){
      appSpot = `../../`
    }else{
      appSpot = ``
    }
  }
   /* eslint-disable-line */


  let game = new Game();
  game.scene.add('loading', new Loading(userID,gameID,appSpot));
  game.scene.add('cooking',new CookingGame(userID,appSpot))
  game.scene.add('catch-fruit',new CatchFruitGame(userID,appSpot))
  game.scene.add('bangbangShooting',new ShootingGame(userID,appSpot))
  game.scene.add('chuochuole',new chuochuoleGame(userID,appSpot))

  game.scene.start('loading')
})





class Game extends Phaser.Game {
  constructor() {
    super(config);
  }

}
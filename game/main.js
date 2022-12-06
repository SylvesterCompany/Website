import MenuScene from "./scenes/menu.js";
import GameScene from "./scenes/game.js";

const canvas = document.getElementById('game');
console.log(canvas)

const config = {
    type: Phaser.WEBGL,
    width: 320, // 20 tiles
    height: 208, // 13 tiles
    canvas: canvas,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [MenuScene, GameScene]
};

const game = new Phaser.Game(config);



/*
const boot = function (game) {
boot.prototype =  {


}
}
*/


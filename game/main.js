import MenuScene from "./scenes/menu";
import GameScene from "./scenes/menu";


const config = {
    type: Phaser.AUTO,
    width: 320, // 20 tiles
    height: 208, // 13 tiles

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene]
};

const game = new Phaser.Game(config);


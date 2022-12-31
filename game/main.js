import getZoomFactor from "./utils/getZoomFactor.js";

import MenuScene from "./scenes/Menu.js";
import GameScene from "./scenes/Game.js";
import LoaderScene from "./scenes/Loader.js";
import GameOverScene from "./scenes/GameOver.js";
import OverlayScene from "./scenes/Overlay.js";
import onClickOutside from "./utils/onClickOutside.js";
import handler from "./utils/handler.js";

// Constants

const TILE_SIZE = 16;
const TILE_X = 20;
const TILE_Y = 13;
const GRAVITY = 1000;
const ZOOM_FACTOR = getZoomFactor(TILE_SIZE * TILE_Y);
const CANVAS_WIDTH = TILE_SIZE * TILE_X * ZOOM_FACTOR;
const CANVAS_HEIGHT = TILE_SIZE * TILE_Y * ZOOM_FACTOR;

const DEBUG_MODE = false;

// Global variables

let game = null;

const canvas = document.getElementById('game');

// Game configuration

const config = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    canvas: canvas,
    canvasStyle: 'width: 960; height: 624;',
    scale: {
        mode: Phaser.Scale.FIT,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        //resizeInterval: 99000,
        //expandParent: false
    },
    //zoom: ZOOM_FACTOR,
    roundPixels: true,
    pixelArt: true,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: GRAVITY},
            debug: DEBUG_MODE
        }
    },
    scene: [LoaderScene, GameScene, OverlayScene, GameOverScene, MenuScene]
};

/**
 * Starts the game (can be imported).
 */
export function startGame(callback) {
    if (!game) {
        game = new Phaser.Game(config);
        game.registry.set({TILE_SIZE, TILE_Y});
    }
    game.scale.once('resize', () => {
        //game.scale.scaleMode = Phaser.Scale.NONE;

        if (game.scene.isPaused('GameScene')) {
            game.scene.getScene('GameScene').scene.resume();
            //game.scale.setGameSize(3000, 1000);
            //game.scale.setZoom(2);
            console.log(game.scale.width)
        }

        handler.on('clickedoutside', () => {
            game.scene.getScene('GameScene').scene.pause();
        });

        onClickOutside(canvas, callback);
    });
}
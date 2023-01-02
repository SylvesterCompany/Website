import getZoomFactor from "./utils/getZoomFactor.js";
import onClickOutside from "./utils/onClickOutside.js";

import GameScene from "./scenes/Game.js";
import LoaderScene from "./scenes/Loader.js";
import GameOverScene from "./scenes/GameOver.js";
import OverlayScene from "./scenes/Overlay.js";


// Constants

const TILE_SIZE = 16;
const TILE_X = 20;
const TILE_Y = 13;
const GRAVITY = 1000;
const CANVAS_WIDTH = TILE_SIZE * TILE_X;
const CANVAS_HEIGHT = TILE_SIZE * TILE_Y;
const ZOOM_FACTOR = getZoomFactor(CANVAS_HEIGHT);
const DEBUG_MODE = false;

// Global variables

let game = null;

const canvas = document.getElementById('game');

// Game configuration

const config = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    canvas: canvas,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    zoom: ZOOM_FACTOR,
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
    scene: [LoaderScene, GameScene, GameOverScene, OverlayScene]
};

/**
 * Starts the game (can be imported).
 */
export function startGame(callback) {
    if (!game) {
        game = new Phaser.Game(config);
        game.registry.set({TILE_SIZE, callback});
    }
    game.scale.once('resize', () => {
        const gameScene = game.scene.getScene('GameScene');
        if (game.scene.isPaused('GameScene')) {
            gameScene.scene.resume();
            gameScene.sound.resumeAll();
        }
        onClickOutside(document.getElementById(game.config.parent));
    });
}
import getZoomFactor from "./utils/getZoomFactor.js";

import MenuScene from "./scenes/Menu.js";
import GameScene from "./scenes/Game.js";
import LoaderScene from "./scenes/Loader.js";
import GameOverScene from "./scenes/GameOver.js";
import OverlayScene from "./scenes/Overlay.js";

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

const canvas = document.getElementById('game');
let game = null;

// Game configuration

const config = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    canvas: canvas,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        width: CANVAS_WIDTH, // 20 tiles
        height: CANVAS_HEIGHT, // 13 tiles
    },
    //zoom: ZOOM_FACTOR,
    roundPixels: true,
    pixelArt: true,
    antialias: false,
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
export function startGame() {
    game = new Phaser.Game(config);
}
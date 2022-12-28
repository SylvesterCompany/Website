import getZoomFactor from "./utils/getResolution.js";

import MenuScene from "./scenes/menu.js";
import GameScene from "./scenes/game.js";
import PreloaderScene from "./scenes/preloader.js";

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

const canvas = document.getElementById('game');
let game = null;

// Game configuration

const config = {
    type: Phaser.WEBGL,
    width: CANVAS_WIDTH, // 20 tiles
    height: CANVAS_HEIGHT, // 13 tiles
    canvas: canvas,
    zoom: ZOOM_FACTOR,
    roundPixels: true,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: GRAVITY},
            debug: DEBUG_MODE
        }
    },
    scene: [PreloaderScene, GameScene, MenuScene]
};

/**
 * Starts the game (can be imported).
 */
export function startGame() {
    game = new Phaser.Game(config);
}
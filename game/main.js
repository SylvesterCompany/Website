import MenuScene from "./scenes/menu.js";
import GameScene from "./scenes/game.js";

// Constants

const TILE_SIZE = 16;
const TILE_X = 20;
const TILE_Y = 13;
const ZOOM_FACTOR = 3;
const CANVAS_WIDTH = TILE_SIZE * TILE_X;
const CANVAS_HEIGHT = TILE_SIZE * TILE_Y;

// Global variables

const canvas = document.getElementById('game');
let game = null;

// Game configuration

const config = {
    type: Phaser.WEBGL,
    width: CANVAS_WIDTH, // 20 tiles
    height: CANVAS_HEIGHT, // 1 tiles
    canvas: canvas,
    zoom: ZOOM_FACTOR,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [GameScene, MenuScene]
};

/**
 * Starts the game (can be imported).
 */
export function startGame() {
    game = new Phaser.Game(config);
}
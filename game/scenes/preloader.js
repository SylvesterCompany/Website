import Player from "../classes/Player.js";

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super("PreloaderScene");
    }

    preload() {
        // Sylvester's cave Theme
        this.load.audio('cave', ['/game/music/cave.mp3']);

        // Player's textures
        this.load.spritesheet("player-idle", "/game/sprites/sylvester_idle.png", {
            frameWidth: Player.SPRITE_WIDTH,
            frameHeight: Player.SPRITE_HEIGHT,
        });
        this.load.spritesheet("player-run", "/game/sprites/sylvester_run.png", {
            frameWidth: Player.SPRITE_WIDTH,
            frameHeight: Player.SPRITE_HEIGHT
        });
        this.load.spritesheet("player-jump", "/game/sprites/sylvester_jump.png", {
            frameWidth: Player.SPRITE_WIDTH,
            frameHeight: Player.SPRITE_HEIGHT
        });

        // Load the music
        this.load.audio('adventure', ['/game/music/adventure.mp3']);

        // Fire texture
        this.load.spritesheet('fire', '/game/sprites/fire_spritesheet.png', {
            frameWidth: 20,
            frameHeight: 21,
            margin: 1,
            spacing: 1
        });

        // Map's textures
        this.load.image('tileset_forest', '/game/tiles/tileset_forest.png');
        this.load.image("front_rocks", "/game/tiles/front_rocks.png");
        this.load.image('background', '/game/tiles/light_sky.png');
        this.load.image('checkpoint', '/game/sprites/checkpoint.png');

        // Restart button
        this.load.image('Restart', '/static/img/PLACEHOLDER.png');

        // Load the JSON file
        this.load.tilemapTiledJSON('tilemap_forest', '/game/tiles/tilemap_forest.json')

        // Fire dataPositionLoad
        this.load.json('fireData', '/game/levelDataFire.json');

        // Archive data
        this.load.json('archives', `/lang/${LANG}/game_archives.json`);
    }

    create() {
        this.scene.start("GameScene");
    }
}
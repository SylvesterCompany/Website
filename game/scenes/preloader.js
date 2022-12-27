import Player from "../classes/Player.js";

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super("PreloaderScene");
    }

    preload() {
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
        this.load.image('flag', '/game/sprites/flag.png');
        // Restart button
        this.load.image('Restart', '/static/img/PLACEHOLDER.png');

        // Load the JSON file
        this.load.tilemapTiledJSON('tilemap_forest', '/game/tiles/tilemap_forest.json')

        //fire dataPositionLoad
        this.load.json('fireData', '/game/levelDataFire.json');
    }

    create() {
        this.scene.start("GameScene");
    }
}
import Player from "../classes/Player.js";
import SodaCan from "../classes/SodaCan.js";
import Checkpoint from "../classes/Checkpoint.js";

export default class LoaderScene extends Phaser.Scene {
    constructor() {
        super("LoaderScene");
    }

    preload() {
        let width = this.cameras.main.centerX;
        let height = this.cameras.main.centerY;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.6);
        progressBox.fillRect(width - 25, height - 2.5, 50, 5);

        let loadingText = this.add.text(width, height - 10, 'Loading...').setFontSize(10).setOrigin(0.5);
        let percentText = this.add.text(width, height + 10, '0%').setFontSize(10).setOrigin(0.5);


        this.load.on('progress', (value) => {
            loadingText.setText('Loading' + '.'
                .repeat((loadingText.text.match(/./g) || []).length % 3))
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00FF00, 1);
            progressBar.fillRect(width - 23, height - 1, 50 * value - 4, 2.5);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

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

        this.load.spritesheet('checkpoint', '/game/sprites/checkpoint.png', {
            frameWidth: Checkpoint.SPRITE_WIDTH,
            frameHeight: Checkpoint.SPRITE_HEIGHT
        });

        this.load.spritesheet('soda_can', '/game/sprites/soda_can.png', {
            frameWidth: SodaCan.SPRITE_WIDTH,
            frameHeight: SodaCan.SPRITE_HEIGHT
        });

        // Dust texture
        this.load.image('dust', '/game/sprites/dust.png');

        // Restart button
        this.load.image('restart', '/game/sprites/restart.png');

        // Load the JSON file
        this.load.tilemapTiledJSON('tilemap_forest', '/game/tiles/tilemap_forest.json');

        // Fire dataPositionLoad
        this.load.json('fireData', '/game/levelDataFire.json');

        // Archive data
        this.load.json('archives', `/lang/${LANG}/game_archives.json`);
    }

    create() {
        this.scene.start("GameScene");
    }
}
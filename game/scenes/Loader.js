import Player from "../classes/Player.js";
import SodaCan from "../classes/SodaCan.js";
import Checkpoint from "../classes/Checkpoint.js";
import Propulsor from "../classes/Propulsor.js";
import TrashBag from "../classes/TrashBag.js";
import Enemy from "../classes/Enemy.js";
import End from "../classes/End.js";


export default class LoaderScene extends Phaser.Scene {
    levels = [
        "tilemap_1_1.json",
        "tilemap_1_2.json",
        "tilemap_1_3.json"
    ];

    constructor() {
        super("LoaderScene");
    }

    /**
     * Main preloading function
     * Load everything we need here with a nice loading bar to get a status
     */
    preload() {
        // Loading bar
        let width = this.cameras.main.centerX;
        let height = this.cameras.main.centerY;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.6);
        progressBox.fillRect(width - 100, height - 10, 200, 20);

        let loadingText = this.add.text(width, height - 20, 'Loading...', {fontFamily: 'Pixel'})
            .setOrigin(0.5)
        let percentText = this.add.text(width, height + 20, '0%', {fontFamily: 'Pixel'})
            .setOrigin(0.5)

        this.load.on('progress', (value) => {
            loadingText.setText('Loading' + '.'
                .repeat((loadingText.text.match(/./g) || []).length % 3))
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00FF00, 1);
            progressBar.fillRect(width - 90, height - 6, 200 * value - 20, 12);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Load the JSON levels
        for (const level of this.levels)
            this.load.tilemapTiledJSON(level.split('.')[0], `/game/tiles/${level}`);

        // Sylvester's Theme
        this.load.audio('theme', ['/game/sounds/theme.mp3']);

        // Death Sound
        this.load.audio('death', ['/game/sounds/death.mp3']);

        // Page Sound
        this.load.audio('page', ['/game/sounds/page.mp3']);

        // Bounce Sound
        this.load.audio('bounce', ['/game/sounds/bounce.mp3']);

        // Bag Sound
        this.load.audio('bag', ['/game/sounds/bag.mp3']);

        // Soda Sound
        this.load.audio('soda', ['/game/sounds/soda.mp3']);

        // Triumph Sound
        this.load.audio('triumph', ['/game/sounds/triumph.mp3']);

        // Player textures
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

        // Trash texture
        this.load.spritesheet("trash", "game/sprites/trash.png", {
            frameWidth: TrashBag.SPRITE_WIDTH,
            frameHeight: TrashBag.SPRITE_HEIGHT
        });

        // Enemy texture
        this.load.spritesheet('enemy', '/game/sprites/enemy.png', {
            frameWidth: Enemy.SPRITE_WIDTH,
            frameHeight: Enemy.SPRITE_HEIGHT
        });

        // Map textures
        this.load.image('tileset_forest', '/game/tiles/tileset_forest.png');
        this.load.image("front_rocks", "/game/tiles/front_rocks.png");
        this.load.image('background', '/game/tiles/light_sky.png');
        this.load.image('last_background', '/game/tiles/last_background.png');
        this.load.image('lights', '/game/tiles/lights.png');

        // Checkpoint textures
        this.load.spritesheet("checkpoint_save", "game/sprites/checkpoint_save.png", {
            frameWidth: Checkpoint.SPRITE_WIDTH,
            frameHeight: Checkpoint.SPRITE_HEIGHT
        });
        this.load.image('checkpoint_off', '/game/sprites/checkpoint_off.png');

        // Soda can texture
        this.load.spritesheet('soda_can', '/game/sprites/soda_can.png', {
            frameWidth: SodaCan.SPRITE_WIDTH,
            frameHeight: SodaCan.SPRITE_HEIGHT
        });

        // Propulsor texture
        this.load.spritesheet('propulsor', '/game/sprites/propulsor.png', {
            frameWidth: Propulsor.SPRITE_WIDTH,
            frameHeight: Propulsor.SPRITE_HEIGHT
        });

        // End texture
        this.load.spritesheet('end', '/game/sprites/end.png', {
            frameWidth: End.SPRITE_WIDTH,
            frameHeight: End.SPRITE_HEIGHT
        });

        // Dust texture
        this.load.image('dust', '/game/sprites/dust.png');

        // Restart button
        this.load.image('restart', '/game/sprites/restart_button.png');

        // JSON translated data
        this.load.json('archives', `/lang/${LANG}/game_archives.json`);
        this.load.json('dialogs', `/lang/${LANG}/dialogs.json`);
    }

    /**
     * Starting the overlay
     */
    create() {
        this.scene.start('OverlayScene');
    }
}
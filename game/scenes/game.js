import Player from "/game/classes/Player.js";

export default class GameScene extends Phaser.Scene {
    player;
    cursors;

    constructor() {
        super('GameScene')
    }

    preload() {
        // Player's textures

        this.load.image("player", "assets/img/player/sylvester_contour.png");
        this.load.image("player-left", "assets/img/player/sylvester_contour_left.png");
        this.load.spritesheet("player-running", "assets/img/player/sylvester_anim.png", { frameWidth: 24, frameHeight: 16 });
        this.load.spritesheet("player-running-left", "assets/img/player/sylvester_anim_left.png", { frameWidth: 24, frameHeight: 16 });

        // --

        this.load.image('Tileset', 'game/tiles/tileset.png')
        this.load.image('backgrounds', 'game/tiles/backgrounds.png')
        // load the JSON file
        this.load.tilemapTiledJSON('map_tiles', 'game/tiles/Map-test.json')
    }

    create() {
        this.player = new Player(this, 50, 100);

        const map = this.add.tilemap('map_tiles')
        const back = map.addTilesetImage('backgrounds')
        const tileset = map.addTilesetImage('Tileset')

        map.createLayer('Calque de Tuiles 1', back)
        map.createLayer('Calque de Tuiles 2', tileset)
        map.createLayer('Calque de Tuiles 3', tileset)
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys(); // Retrieves the keys

        this.player.listenControls(this.cursors);
    }

};


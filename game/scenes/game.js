import Player from "/game/classes/Player.js";

export default class GameScene extends Phaser.Scene {
    player;
    cursors;
    decors;
    background;
    plateformes;

    constructor() {
        super('GameScene')
    }

    preload() {
        // Player's textures

        this.load.image("player", "assets/img/player/sylvester_contour.png");
        this.load.image("player-left", "assets/img/player/sylvester_contour_left.png");
        this.load.spritesheet("player-running", "assets/img/player/sylvester_anim.png", { frameWidth: 24, frameHeight: 16 });

        // --

        this.load.image('tileset', 'game/tiles/tileset.png')
        this.load.image('backgrounds', 'game/tiles/backgrounds.png')

        // Load the JSON file
        this.load.tilemapTiledJSON('map_tiles', 'game/tiles/map-test.json')
    }

    create() {
        this.player = new Player(this, 100, 100);
        this.player.visible = true;

        const map = this.add.tilemap('map_tiles')
        // const back = map.addTilesetImage('backgrounds')
        const tileset = map.addTilesetImage('tileset')

        // this.background = map.createLayer('Background', back)
        this.plateformes = map.createLayer('Plateformes', tileset)
        this.decors = map.createLayer('Decors', tileset)

        this.plateformes.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, this.plateformes);

        // DEBUG

        // this.plateformes.renderDebug(this.add.graphics());

        this.physics.world.setBounds(0,0, 20 * 16,13 * 16);
        this.cameras.main.setBounds(0,0,20 * 16,12 * 16);
        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys(); // Retrieves the keys

        this.player.listenControls(this.cursors);
    }
};


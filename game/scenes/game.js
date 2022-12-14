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
        this.load.image('Tileset', 'game/tiles/tileset.png')
        this.load.image('backgrounds', 'game/tiles/backgrounds.png')
        // load the JSON file
        this.load.tilemapTiledJSON('map_tiles', 'game/tiles/Map-test.json')
    }

    create() {
        const map = this.add.tilemap('map_tiles')
        const back = map.addTilesetImage('backgrounds')
        const tileset = map.addTilesetImage('Tileset')

        this.background = map.createLayer('Background', back)
        this.plateformes = map.createLayer('Plateformes', tileset)
        this.decors = map.createLayer('Decors', tileset)
        this.plateformes.setCollisionByProperty({ estSolide: true });
        // this.physics.add.collider(player, plateformes);
    }

    update() {
    }

};


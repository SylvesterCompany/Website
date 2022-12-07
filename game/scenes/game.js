export default class GameScene extends Phaser.Scene {
    player;
    cursors;

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

        map.createLayer('Calque de Tuiles 1', back)
        map.createLayer('Calque de Tuiles 2', tileset)
        map.createLayer('Calque de Tuiles 3', tileset)
    }

    update() {
    }

};


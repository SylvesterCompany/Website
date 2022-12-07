export default class GameScene extends Phaser.Scene {
    player;
    cursors;

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image('Tilesset', 'game/tiles/tileset.png')
        this.load.image('Background', 'game/tiles/backgrounds.png')
        // load the JSON file
        this.load.tilemapTiledJSON('map_tiles', 'game/tiles/Map-test.json')
    }

    create() {
        const map = this.add.tilemap('map_tiles')
        const back = map.addTilesetImage('background')
        const tileset = map.addTilesetImage('Terrain')

        map.createLayer('Background', back)
        map.createLayer('Calque de Tuiles 1', tileset)
        map.createLayer('Front-props', tileset)
    }

    update() {
    }

};


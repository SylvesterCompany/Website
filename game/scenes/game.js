export default class GameScene extends Phaser.Scene {
    player;
    cursors;

    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image('map_tileset', 'game/tiles/map_tiles.png')
        // load the JSON file
        this.load.tilemapTiledJSON('map_tiles', 'game/tiles/map_tiles.json')
    }

    create() {
        const map = this.add.tilemap('map_tiles')
        const tileset = map.addTilesetImage('map_tileset')
        map.createLayer('Calque de Tuiles 1', tileset)
        map.createLayer('Front-props', tileset)
    }

    update() {
    }

};


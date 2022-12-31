export default class OverlayScene extends Phaser.Scene {
    constructor() {
        super('OverlayScene');
    }

    create() {
        const scoreText = this.add.text(this.cameras.main.width - 70, 10, 'Score: 0', {fontFamily: 'Pixel'});
    }
}
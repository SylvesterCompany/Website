import handler from "../utils/handler.js";

export default class OverlayScene extends Phaser.Scene {
    scoreText;
    constructor() {
        super('OverlayScene');
    }

    create() {
        handler.on('trashbagCollected', this.updateScore, this);
        this.scoreText = this.add.text( 5, 5, 'Score: 0', {fontFamily: 'Pixel'});
    }

    updateScore(score){
        this.scoreText.setText('Score: ' + score);
    }
}
export default class OverlayScene extends Phaser.Scene {
    updateEmitter;
    scoreText;
    constructor() {
        super('OverlayScene');
    }

    create(data) {
        this.updateEmitter = data.emitter;
        this.updateEmitter.on('trashbagCollected', this.updateScore, this);
        this.scoreText = this.add.text( 5, 5, 'Score: 0', {fontFamily: 'Pixel'});
    }

    updateScore(score){
        this.scoreText.setText('Score: ' + score);
    }

}
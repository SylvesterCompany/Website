import handler from "../utils/handler.js";

export default class OverlayScene extends Phaser.Scene {
    timer;
    timerText;
    scoreText;
    constructor() {
        super('OverlayScene');
    }

    create() {
        this.scene.launch('GameScene');
        const gameScene = this.scene.get('GameScene');
        this.elapsedTime = 0;
        this.timer = this.time.addEvent({
            delay: 180000,
        });
        gameScene.events.on('pause', () => { this.timer.paused = !this.timer.paused });
        handler.on('restart', () => { this.timer.paused = !this.timer.paused });
        gameScene.events.on('resume', () => { this.timer.paused = !this.timer.paused });
        this.timerText = this.add.text(this.cameras.main.width - 32, 5, '', {fontFamily: 'Pixel'});
        this.scoreText = this.add.text(5, 5, 'Score: 0', {fontFamily: 'Pixel'});
        handler.on('trashbagcollected', this.updateScore, this);
    }

    updateScore(score){
        this.scoreText.setText(`Score: ${score}`);
    }

    update() {
        // TODO: add reason to playerdeath
        const remainingTime = this.timer.getRemainingSeconds().toFixed(0);
        if (remainingTime) {
            this.timerText.setText(remainingTime);
        } else {
            handler.emit('playerdeath');
        }
    }
}
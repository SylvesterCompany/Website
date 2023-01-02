import handler from "../utils/handler.js";


export default class OverlayScene extends Phaser.Scene {
    timer;
    timerText;
    scoreText;
    score;

    constructor() {
        super('OverlayScene');
    }

    /**
     * Starting the main scene
     * Put and refresh every information to the screen
     */
    create() {
        this.scene.launch('GameScene');
        const gameScene = this.scene.get('GameScene');
        this.score = 0;
        this.timer = this.time.addEvent({
            delay: 180000,
            loop: true,
            callback: () => {
                handler.emit('playerdeath', {resetLevel: true})
            },
            callbackScope: this
        });
        gameScene.events.on('pause', () => { this.timer.paused = !this.timer.paused });
        handler.on('respawn', () => { this.timer.paused = !this.timer.paused });
        gameScene.events.on('resume', () => { this.timer.paused = !this.timer.paused });
        this.timerText = this.add.text(this.cameras.main.width - 32, 5, '', {fontFamily: 'Pixel'});
        this.scoreText = this.add.text(5, 5, 'Score: 0', {fontFamily: 'Pixel'});
        handler.on('trashcollected', this.updateScore, this);
        const savedScore = JSON.parse(localStorage.getItem('Score'));
        if (savedScore)
            this.updateScore(savedScore);
    }

    /**
     * Callback: update to the current score
     *
     * @param score
     */
    updateScore(score) {
        this.score += score;
        localStorage.setItem('Score', JSON.stringify(this.score));
        this.scoreText.setText(`Score: ${this.score}`);
    }

    /**
     * Update the timer every tick
     */
    update() {
        this.timerText.setText(this.timer.getRemainingSeconds().toFixed());
    }
}
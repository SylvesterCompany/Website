export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    back() {
        this.scene.start('GameScene');
    }

    create() {
        this.physics.pause();
        this.anims.pauseAll();

        let gameOverText = this.add.text(this.screenCenterX, this.screenCenterY, 'Game Over', {
            fontSize: '24px',
            backgroundColor: '#543F24'
        });
        gameOverText.setOrigin(0.5);

        let restartButton = this.add.image(this.screenCenterX, this.screenCenterY + 25, 'Restart').setInteractive();
        restartButton.on('pointerdown', this.back, this);
    }
}
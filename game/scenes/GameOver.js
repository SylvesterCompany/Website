export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    /**
     * Things done when Game Over is called
     */
    create() {
        // Pause everything like scene and music
        const gameScene = this.scene.get('GameScene');
        gameScene.scene.pause();
        gameScene.theme.stop();

        let gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', {
            fontSize: '24px',
            backgroundColor: '#543F24'
        });
        gameOverText.setOrigin(0.5);

        let button = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 25, 'restart')
            .setInteractive({useHandCursor: true});

        button.on('pointerdown', () => {
            console.log(gameScene);
            gameScene.scene.restart();
            this.scene.stop();
        }, this);
    }
}
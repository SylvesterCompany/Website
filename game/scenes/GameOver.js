export default class GameOverScene extends Phaser.Scene {
    before;

    constructor() {
        super('GameOverScene');
    }

    back() {
        this.cameras.main.fadeOut(500);
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.before.scene.restart();
            this.scene.stop();
        }, this);
    }

    /**
     * Things done when Game Over is called
     */
    create(data) {
        this.before = data.ctx;

        // Pause everything like scene and music
        this.before.scene.pause();
        this.before.theme.stop();

        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', {
            fontSize: '24px',
            backgroundColor: '#543F24'
        }).setOrigin(0.5);

        const button = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 25, 'restart')
            .setInteractive({useHandCursor: true});

        button.on('pointerdown', this.back, this);
        this.input.keyboard.on('keydown-ENTER', this.back, this);
    }
}
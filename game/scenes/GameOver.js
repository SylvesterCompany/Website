import handler from "../utils/handler.js";

export default class GameOverScene extends Phaser.Scene {
    before;
    resetLevel;

    constructor() {
        super('GameOverScene');
    }

    back() {
        this.input.setDefaultCursor('none');
        this.cameras.main.fadeOut(500);
        this.cameras.main.on('camerafadeoutcomplete', () => {
            handler.emit('respawn');
            if (this.resetLevel)
                this.before.changeLevel(1, 1);
            this.before.scene.restart();
            this.scene.stop();
        }, this);
    }

    /**
     * Things done when Game Over is called
     */
    create(data) {
        const RESTART_RELATIVE_Y = 25;

        this.before = data.ctx;
        this.resetLevel = data.resetLevel;

        // Pause everything like scene and music
        this.before.scene.pause();
        this.before.theme.stop();

        this.input.setDefaultCursor('default');

        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 10, 'Game Over', {
            fontSize: '28px',
            fontFamily: 'Pixel',
            color: '#f9f4df'
        }).setOrigin(0.5);

        const button = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + RESTART_RELATIVE_Y, 'restart')
            .setInteractive({useHandCursor: true});

        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + RESTART_RELATIVE_Y, 'Restart', {
            fontFamily: 'Pixel',
            color: '#460a03',
        }).setOrigin(0.5);

        button.on('pointerdown', this.back, this);
        this.input.keyboard.on('keydown-ENTER', this.back, this);
    }
}
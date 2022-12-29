export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 32;

    constructor(scene, x, y) {
        super(scene, x, y, "checkpoint");

        // Adds the checkpoint to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.allowGravity = false;
        this.visible = true;
        this.depth = 0;

        this.setSize(Checkpoint.SPRITE_WIDTH, Checkpoint.SPRITE_HEIGHT);
        this.setOrigin(0, 1);

        this._registerAnimations();

        this.anims.play("checkpoint-normal");
    };

    _registerAnimations() {
        const normalAnim = this.scene.anims.create({ // Normal
            key: "checkpoint-normal",
            frames: this.anims.generateFrameNumbers("checkpoint", {
                start: 0, end: 7
            }),
            frameRate: 1000 / 75,
            repeat: -1
        });
    }
}
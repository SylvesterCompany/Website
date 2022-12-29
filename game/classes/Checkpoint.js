export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 16;

    constructor(scene, x, y) {
        super(scene, x, y, "checkpoint_off",0);

        // Adds the checkpoint to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.allowGravity = false;
        this.visible = true;
        this.depth = 0;

        this.setSize(Checkpoint.SPRITE_WIDTH, Checkpoint.SPRITE_HEIGHT);
        this.setOrigin(0, 1);
        this.setVelocityX(0);
        this._registerAnimations();
    };

    _registerAnimations() {
        this.scene.anims.create({ // Save
            key: "checkpoint_save",
            frames: this.anims.generateFrameNumbers("checkpoint_save", {
                start: 0, end: 10
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });
    };
}
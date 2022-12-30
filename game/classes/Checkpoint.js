export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 48;
    static SPRITE_HEIGHT = 32;

    id;
    triggered = false;

    constructor(scene, x, y, id) {
        super(scene, x, y, "checkpoint_off", 0);

        this.id = id;

        // Adds the checkpoint to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.allowGravity = false;
        this.visible = true;
        this.depth = 0;

        this.setSize(Checkpoint.SPRITE_WIDTH, Checkpoint.SPRITE_HEIGHT);
        this.setOrigin(0.5, 1);

        this._registerAnimations();
    };

    _registerAnimations() {
        this.scene.anims.create({ // Save
            key: "checkpoint_save",
            frames: this.anims.generateFrameNumbers("checkpoint_save", {
                start: 0, end: 10
            }),
            frameRate: 1000 / 40,
            repeat: 0
        });
    }

    trigger() {
        if (!this.triggered) {
            this.anims.play("checkpoint_save");
            this.triggered = true;
        }
    }
}
export default class TrashBag extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 16;


    constructor(scene, x, y) {
        super(scene, x, y, "trash");

        // Adds the trashbag to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.allowGravity = false;
        this.visible = true;
        this.depth = 0;

        this.setSize(TrashBag.SPRITE_WIDTH, TrashBag.SPRITE_HEIGHT);
        this.setOrigin(0, 1);

        this._registerAnimations();
        this.anims.play("move");
    }

    _registerAnimations() {
        const move = this.scene.anims.create({ // move
            key: "move",
            frames: this.anims.generateFrameNumbers("trash", {
                start: 0, end: 6
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        move.addFrame([
            {
                key: "trash",
                frame: 0,
                duration: 1000
            }
        ]);
    }
}
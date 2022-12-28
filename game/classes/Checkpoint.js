export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 16;


    constructor(scene, x, y) {
        super(scene, x, y, "checkpoint");

        // Adds the checkpoint to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.allowGravity = false;
        this.visible = true;
        this.depth = 0;

        this.setCollideWorldBounds(true);

        this.setSize(Checkpoint.SPRITE_WIDTH, Checkpoint.SPRITE_HEIGHT);
        this.setOrigin(0, 1);
    };
}
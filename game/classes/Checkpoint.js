export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 16;


    constructor(scene, x, y) {
        super(scene, x, y, "flag");

        // Adds the checkpoint to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.setSize(Checkpoint.SPRITE_WIDTH, Checkpoint.SPRITE_HEIGHT);
    };
}
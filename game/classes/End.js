export default class End extends Phaser.Physics.Arcade.Sprite {
    id;
    width;
    height;

    constructor(scene, x, y, width, height) {
        super(scene, x, y, "end");

        this.width = width;
        this.height = height;
        // Adds the end to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.visible = true;
        this.depth = 0;

        // Set the size
        this.body.setSize(End.SPRITE_WIDTH, End.SPRITE_HEIGHT);

        this.body.immovable = true;
        this.body.allowGravity = false;

        this.setOrigin(0, 1);
    }
}
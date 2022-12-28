export default class SodaCan extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 16;
    static SPRITE_HEIGHT = 16;

    archiveId;

    constructor(scene, x, y, archiveId) {
        super(scene, x, y, "soda_can");

        // Adds the soda can to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.archiveId = archiveId;

        this.body.immovable = true;
        this.body.allowGravity = false;
        this.visible = true;
        this.depth = 0;

        this.setSize(SodaCan.SPRITE_WIDTH, SodaCan.SPRITE_HEIGHT);
        this.setOrigin(0, 1);
    }
}
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

        this._registerAnimations();

        this.anims.play("highlight");
    }

    _registerAnimations() {
        const highlightAnim = this.scene.anims.create({ // Highlight
            key: "highlight",
            frames: this.anims.generateFrameNumbers("soda_can", {
                start: 0, end: 9
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        highlightAnim.addFrame([
            {
                key: "soda_can",
                frame: 0,
                duration: 1500
            }
        ]);
    }
}
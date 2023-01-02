export default class End extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 64;
    static SPRITE_HEIGHT = 48;

    constructor(scene, x, y) {
        super(scene, x, y, "end");

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

        //this._registerAnimations();

        //this.anims.play("propulsor-normal");
    }

    _registerAnimations() {
        this.scene.anims.create({ // Highlight
            key: "propulsor-normal",
            frames: this.anims.generateFrameNumbers("propulsor", {
                start: 0, end: 8
            }),
            frameRate: 1000 / 75,
            repeat: -1
        });
    }
}
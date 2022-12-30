export default class Door extends Phaser.Physics.Arcade.Sprite {
    width;
    height;

    id;
    destination;

    constructor(scene, x, y) {
        super(scene, x, y, "propulsor");

        // Adds the soda can to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.immovable = true;
        this.body.allowGravity = false;
        this.visible = true;
        this.depth = 0;

        this.setSize(Propulsor.SPRITE_WIDTH, Propulsor.SPRITE_HEIGHT);
        this.setOrigin(0, 1);

        this._registerAnimations();

        this.anims.play("normal");
    }

    _registerAnimations() {
        const highlightAnim = this.scene.anims.create({ // Highlight
            key: "normal",
            frames: this.anims.generateFrameNumbers("propulsor", {
                start: 0, end: 8
            }),
            frameRate: 1000 / 75,
            repeat: -1
        });
    }
}

class Destination {
    levelId;
    checkpointId;

    constructor(rawDest) {
        rawDest = rawDest.split("_");

        this.levelId = rawDest[0];
        this.checkpointId = rawDest[1];
    }
}
// TODO: À compléter

export default class Player extends Phaser.Physics.Arcade.Sprite {
    BOUNCE = 0.25;

    playerDirection;
    cursors;

    constructor(scene, x, y) {
        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(this.BOUNCE);

        this.playerDirection = "right";

        this._registerAnimations();
    }

    listenControls(cursors) {
        if (cursors.right.isDown) { // Right
            this.playerDirection = "right";
            this.setVelocityX(150);
            this.anims.play("running", true);
        } else if (cursors.left.isDown) { // Left
            this.playerDirection = "left";
            this.setVelocityX(-150);
            this.anims.play("running-left", true);
        } else { // Idle
            this.setVelocityX(0);
            this.anims.play(this.playerDirection === "right" ? "idle-right" : "idle-left", true);
        }
        if (cursors.up.isDown && this.body.touching.down) { // Jump (not finished)
            this.setVelocityY(-450);
        }
    }

    _registerAnimations() {
        this.scene.anims.create({ // Right
            key: "running",
            frames: this.anims.generateFrameNumbers("player-running", {
                start: 0, end: 4
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.scene.anims.create({ // Left
            key: "running-left",
            frames: this.anims.generateFrameNumbers("player-running-left", {
                start: 0, end: 4
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.scene.anims.create({ // Idle right
            key: "idle-right",
            frames: [{ key: "player", frame: 0 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Idle left
            key: "idle-left",
            frames: [{ key: "player-left", frame: 0 }],
            frameRate: 1
        });

        // this.physics.add.collider(this.player, this.platforms)
    }
}
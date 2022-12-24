export default class Player extends Phaser.Physics.Arcade.Sprite {
    BOUNCE = 0;
    SPEED = 125;
    JUMP = 300;

    playerDirection;
    cursors;

    constructor(scene, x, y) {
        super(scene, x, y, "player-right");

        // Adds the player to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Prevents the player from passing through the world's bounds
        this.setCollideWorldBounds(true);

        // Defines the bounce factor
        this.setBounce(this.BOUNCE);

        this.playerDirection = "right";

        this._registerAnimations();
    }

    listenControls(cursors) {
        if (cursors.right.isDown) { // Right

            this.playerDirection = "right";
            this.setVelocityX(this.SPEED);

            if (this.body.onFloor()) {
                this.anims.play("running-right", true);
            }

        } else if (cursors.left.isDown) { // Left

            this.playerDirection = "left";
            this.setVelocityX(-this.SPEED);

            if (this.body.onFloor()) {
                this.anims.play("running-left", true);
            }

        } else { // Idle

            this.setVelocityX(0);

            if (this.body.onFloor()) {
                this.anims.play(this.playerDirection === "right" ? "idle-right" : "idle-left", true);
            }

        }

        if (cursors.up.isDown && this.body.onFloor()) { // Jump

            this.setVelocityY(-this.JUMP);
            this.anims.play(this.playerDirection === "right" ? "jump-up-right" : "jump-up-left", true);

        }

        if (!this.body.onFloor()) { // In midair
            if (this.body.velocity.y > 0) {
                this.anims.play(this.playerDirection === "right" ? "jump-down-right" : "jump-down-left", true);
            }
        }
    }

    _registerAnimations() {
        this.scene.anims.create({ // Right
            key: "running-right",
            frames: this.anims.generateFrameNumbers("player-running", {
                start: 0, end: 4
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.scene.anims.create({ // Left
            key: "running-left",
            frames: this.anims.generateFrameNumbers("player-running", {
                start: 5, end: 9
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.scene.anims.create({ // Idle right
            key: "idle-right",
            frames: [{ key: "player-right", frame: 0 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Idle left
            key: "idle-left",
            frames: [{ key: "player-left", frame: 0 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Jump up
            key: "jump-up-right",
            frames: [{ key: "player-jump", frame: 0 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Jump down
            key: "jump-down-right",
            frames: [{ key: "player-jump", frame: 1 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Jump up
            key: "jump-up-left",
            frames: [{ key: "player-jump", frame: 2 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Jump down
            key: "jump-down-left",
            frames: [{ key: "player-jump", frame: 3 }],
            frameRate: 1
        });
    }
}
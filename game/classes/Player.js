export default class Player extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 36;
    static SPRITE_HEIGHT = 16;
    static BOX_WIDTH = 12;

    static BOUNCE = 0;
    static SPEED = 135;
    static ACCELERATION = 27;
    static JUMP = 270;

    playerDirection;
    cursors;

    constructor(scene, x, y) {
        super(scene, x, y, "player-idle", 0);

        // Adds the player to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Prevents the player from passing through the world's bounds
        this.setCollideWorldBounds(true);

        // Bounding box
        this.setSize(Player.BOX_WIDTH, Player.SPRITE_HEIGHT);

        // Defines the bounce factor
        this.setBounce(Player.BOUNCE);

        this.playerDirection = "right";

        this._registerAnimations();
    }

    listenControls(cursors) {
        if (cursors.right.isDown) { // Right

            this._turnRight();

            this.setVelocityX(this.body.velocity.x < Player.SPEED ? this.body.velocity.x + Player.ACCELERATION : Player.SPEED);

            if (this.body.onFloor()) {
                this.anims.play("run-right", true);
            }

        } else if (cursors.left.isDown) { // Left

            this._turnLeft();

            this.setVelocityX(this.body.velocity.x > -Player.SPEED ? this.body.velocity.x - Player.ACCELERATION : -Player.SPEED);

            if (this.body.onFloor()) {
                this.anims.play("run-left", true);
            }

        } else { // Idle

            this.setVelocityX(0);

            if (this.body.onFloor()) {
                this.anims.play(this.playerDirection === "right" ? "idle-right" : "idle-left", true);
            }

        }

        if (cursors.up.isDown && this.body.onFloor()) { // Jump

            this.setVelocityY(-Player.JUMP);
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
            key: "run-right",
            frames: this.anims.generateFrameNumbers("player-run", {
                start: 0, end: 4
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.scene.anims.create({ // Left
            key: "run-left",
            frames: this.anims.generateFrameNumbers("player-run", {
                start: 5, end: 9
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.scene.anims.create({ // Idle right
            key: "idle-right",
            frames: [{ key: "player-idle", frame: 0 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Idle left
            key: "idle-left",
            frames: [{ key: "player-idle", frame: 1 }],
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

    _turnLeft() {
        if (this.playerDirection !== "left") {
            this.playerDirection = "left";
        }
    }

    _turnRight() {
        if (this.playerDirection !== "right") {
            this.playerDirection = "right";
        }
    }
}
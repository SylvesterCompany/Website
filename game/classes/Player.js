import Propulsor from "./Propulsor.js";

import handler from "../utils/handler.js";


export default class Player extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 36;
    static SPRITE_HEIGHT = 16;
    static BOX_WIDTH = 12;
    static DEPTH = 1;

    static BOUNCE = 0;
    static SPEED = 150;
    static ACCELERATION = 15;
    static JUMP = 270;

    playerDirection;
    cursors;
    upReleased = true;

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

        this.setVisible(true);
        this.depth = Player.DEPTH;

        this.playerDirection = "right";

        this._registerAnimations();
    }

    listenControls(cursors) {
        if (cursors.right.isDown) { // Right

            if (this.playerDirection === "left") {
                this._turnRight();
                this.setVelocityX(0); // Prevents the player from sliding on the floor
            } else {
                this.setVelocityX(this.body.velocity.x < Player.SPEED ? this.body.velocity.x + Player.ACCELERATION : Player.SPEED);
            }

            if (this.body.onFloor()) {
                this.anims.play("run-right", true);
            }

        } else if (cursors.left.isDown) { // Left

            if (this.playerDirection === "right") {
                this._turnLeft();
                this.setVelocityX(0); // Prevents the player from sliding on the floor
            } else {
                this.setVelocityX(this.body.velocity.x > -Player.SPEED ? this.body.velocity.x - Player.ACCELERATION : -Player.SPEED);
            }

            if (this.body.onFloor()) {
                this.anims.play("run-left", true);
            }

        } else { // Idle

            this.setVelocityX(0);

            if (this.body.onFloor()) {
                this.anims.play(this.playerDirection === "right" ? "idle-right" : "idle-left", true);
            }

        }

        if (cursors.up.isUp) {

            this.upReleased = true;

        }

        // if (cursors.up.isDown && this.body.onFloor() && this.upReleased) { // Jump
        if (cursors.up.isDown && this.body.onFloor()) { // Jump
            this.setVelocityY(-Player.JUMP);

            this.anims.play(this.playerDirection === "right" ? "jump-up-right" : "jump-up-left", true);

            this.upReleased = false; // Prevents the player from jumping while maintaining the key down
        }

        if (!this.body.onFloor()) { // In midair

            if (this.body.velocity.y > 0) {
                this.anims.play(this.playerDirection === "right" ? "jump-down-right" : "jump-down-left", true);
            }

        }
    }

    propulse() {
        this.scene.cameras.main.shake(200, 0.005);
        this.setVelocityY(-Player.JUMP - Propulsor.INTENSITY);
    }

    die() {
        this.visible = false;
        handler.emit('playerdeath');
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
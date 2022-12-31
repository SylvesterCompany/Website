export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    static SPRITE_WIDTH = 32;
    static SPRITE_HEIGHT = 32;
    static BOX_WIDTH = 15;
    static BOX_HEIGHT = 21;
    static BOX_OFFSET_X = 9;
    static BOX_OFFSET_Y = 11;
    static DEPTH = 1;

    static BOUNCE = 0.25;
    static SPEED = 100;
    static JUMP = 270;
    static JUMP_DELAY = 1500;

    maxJumps;

    direction;
    jumpAmount = 0;

    constructor(scene, x, y, maxJumps=2) {
        super(scene, x, y, "enemy", 0);

        // Adds the enemy to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.maxJumps = maxJumps > 0 ? maxJumps : 1;

        // Prevents the enemy from passing through the world's bounds
        this.setCollideWorldBounds(true);

        // Bounding box
        this.setSize(Enemy.BOX_WIDTH, Enemy.BOX_HEIGHT);
        this.setOrigin(0.5, 1);
        this.body.setOffset(Enemy.BOX_OFFSET_X, Enemy.BOX_OFFSET_Y);

        // Defines the bounce factor
        this.setBounce(Enemy.BOUNCE);

        this.setVisible(true);
        this.depth = Enemy.DEPTH;

        this.direction = "right";

        this._registerAnimations();

        this.startMovement(); // Automates the enemy's movement
    }

    _registerAnimations() {
        this.scene.anims.create({ // Normal
            key: "enemy-jump",
            frames: this.anims.generateFrameNumbers("enemy", {
                start: 0, end: 4
            }),
            frameRate: 1000 / 100,
            repeat: 0
        });
    }

    startMovement() {
        this.scene.time.addEvent({
            delay: Enemy.JUMP_DELAY,
            callback: this.jump,
            callbackScope: this,
            loop: true
        })
    }

    jump() {
        if (this.jumpAmount >= this.maxJumps) {
            this.direction = this.direction === "right" ? "left" : "right";
            this.jumpAmount = 0;
        }

        let speed = this.direction === "right" ? Enemy.SPEED : -Enemy.SPEED;

        this.body.setVelocity(speed, -Enemy.JUMP);
        this.anims.play("enemy-jump");

        this.on("animationcomplete", () => {
            this.body.setVelocityX(0);
        });

        this.jumpAmount++;
    }
}
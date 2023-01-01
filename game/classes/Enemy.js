export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    static FRAME_AMOUNT = 5;
    static SPRITE_WIDTH = 32;
    static SPRITE_HEIGHT = 32;
    static BOX_WIDTH = 15;
    static BOX_HEIGHT = 21;
    static BOX_OFFSET_X = 9;
    static BOX_OFFSET_Y = 11;
    static DEPTH = 1;

    static BOUNCE = 0.25;
    static JUMP = 270;
    static JUMP_DELAY = 750;
    static JUMP_DURATION = 500;

    speed;


    maxJumps;

    jumpAmount = 0;

    constructor(scene, x, y, maxJumps=2, tileDistancePerJump=4) {
        super(scene, x, y, "enemy", 0);

        const { TILE_SIZE } = this.scene.game.registry.values;

        // Adds the enemy to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.maxJumps = maxJumps > 0 ? maxJumps : 1;
        this.speed = tileDistancePerJump * TILE_SIZE / (Enemy.JUMP_DURATION / 1000);

        // Prevents the enemy from passing through the world's bounds
        this.setCollideWorldBounds(true);

        // Bounding box
        this.setSize(Enemy.BOX_WIDTH, Enemy.BOX_HEIGHT);
        this.setOrigin(0, 1);
        this.body.setOffset(Enemy.BOX_OFFSET_X, Enemy.BOX_OFFSET_Y);

        // Defines the bounce factor
        this.setBounce(Enemy.BOUNCE);

        this.setVisible(true);
        this.depth = Enemy.DEPTH;

        this._registerAnimations();

        this.startMovement(); // Automates the enemy's movement
    }

    _registerAnimations() {
        this.scene.anims.create({ // Normal
            key: "enemy-normal",
            frames: [{ key: "enemy", frame: 0 }],
            frameRate: 1
        });

        this.scene.anims.create({ // Jump
            key: "enemy-jump",
            frames: this.anims.generateFrameNumbers("enemy", {
                start: 0, end: Enemy.FRAME_AMOUNT - 1
            }),
            frameRate: Enemy.FRAME_AMOUNT * 1000 / Enemy.JUMP_DURATION,
            repeat: 0
        });
    }

    startMovement() {
        this.scene.time.addEvent({
            delay: Enemy.JUMP_DURATION + Enemy.JUMP_DELAY,
            callback: this.jump,
            callbackScope: this,
            loop: true
        })
    }

    jump() {
        if (this.jumpAmount >= this.maxJumps) {
            this.setFlipX(!this.flipX);
            this.jumpAmount = 0;
        }

        let speed = !this.flipX ? this.speed : -this.speed;

        this.body.setVelocity(speed, -Enemy.JUMP);
        this.anims.play("enemy-jump");

        this.on("animationcomplete", () => {
            this.body.setVelocityX(0);
            this.anims.play("enemy-normal");
        });

        this.jumpAmount++;
    }
}
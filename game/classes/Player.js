// TODO: À compléter

export default class Player extends Sprite {

}

export default class Game extends Phaser.Scene {
    player;
    playerDirection;
    cursors;
    platforms;

    constructor() {
        super("game");
    }

    preload() {
        this.load.image("player", "assets/sylvester_contour.png");
        this.load.image("player-left", "assets/sylvester_contour_left.png");
        this.load.spritesheet("player-running", "assets/sylvester_anim.png", { frameWidth: 24, frameHeight: 16 });
        this.load.spritesheet("player-running-left", "assets/sylvester_anim_left.png", { frameWidth: 24, frameHeight: 16 });
    }

    create(data) {
        const TILE_SIZE = this.game.registry.get("TILE_SIZE");

        let canvas = this.game.canvas;

        this.player = this.physics.add.sprite(TILE_SIZE * 3, canvas.height - TILE_SIZE * 5, "player");
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.25);

        // Animations

        this.playerDirection = "right";

        this.anims.create({ // Right
            key: "running",
            frames: this.anims.generateFrameNumbers("player-running", {
                start: 0, end: 4
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.anims.create({ // Left
            key: "running-left",
            frames: this.anims.generateFrameNumbers("player-running-left", {
                start: 0, end: 4
            }),
            frameRate: 1000 / 50,
            repeat: -1
        });

        this.anims.create({ // Idle right
            key: "idle-right",
            frames: [{ key: "player", frame: 0 }],
            frameRate: 1
        });

        this.anims.create({ // Idle left
            key: "idle-left",
            frames: [{ key: "player-left", frame: 0 }],
            frameRate: 1
        });

        this.generatePlatforms();

        this.physics.add.collider(this.player, this.platforms);
    }

    update() {
        this.listenControls();
    }

    generatePlatforms() {
        const TILE_SIZE = this.game.registry.get("TILE_SIZE");
        const CANVAS_HEIGHT = this.game.registry.get("CANVAS_HEIGHT");
        const TILE_X = this.game.registry.get("TILE_X");

        const baseRect = new Phaser.GameObjects.Graphics(this);
        baseRect.fillStyle(0xffffff, 1);
        baseRect.beginPath();
        baseRect.fillRect(0, 0, 16, 16);
        baseRect.closePath();
        baseRect.generateTexture("platform", TILE_SIZE, TILE_SIZE);

        const p1 = this.add.sprite(TILE_SIZE * 5, CANVAS_HEIGHT - TILE_SIZE * 3.5, "platform");
        p1.setOrigin(0, 0).setScale(3, 0.5)

        const p2 = this.add.sprite(TILE_SIZE * 10, CANVAS_HEIGHT - TILE_SIZE * 5.5, "platform");
        p2.setOrigin(0, 0).setScale(5, 0.5);

        const wall = this.add.sprite(TILE_SIZE * 13, CANVAS_HEIGHT - TILE_SIZE * 3, "platform");
        wall.setOrigin(0, 0).setScale(2, 2);

        const floor = this.add.sprite(0, CANVAS_HEIGHT - TILE_SIZE, "platform");
        floor.setOrigin(0, 0).setScale(TILE_X, 1);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.add(p1);
        this.platforms.add(p2);
        this.platforms.add(wall);
        this.platforms.add(floor);
    }

    listenControls() {
        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.cursors.right.isDown) { // Right
            this.playerDirection = "right";
            this.player.setVelocityX(150);
            this.player.anims.play("running", true);
        } else if (this.cursors.left.isDown) { // Left
            this.playerDirection = "left";
            this.player.setVelocityX(-150);
            this.player.anims.play("running-left", true);
        } else { // Idle
            this.player.setVelocityX(0);
            this.player.anims.play(this.playerDirection === "right" ? "idle-right" : "idle-left", true);
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) { // Jump (not finished)
            this.player.setVelocityY(-450);
        }
    }
}

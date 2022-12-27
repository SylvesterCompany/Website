import Player from "/game/classes/Player.js";

export default class GameScene extends Phaser.Scene {
    player;
    cursors;
    decors;
    front;
    background;
    plateformes;
    checkpoint;
    checkLap;
    gameoverText;
    screenCenterX;
    screenCenterY;
    restartButton;

    constructor() {
        super('GameScene');
    }

    create() {
        this.createWorld();
        this.createPlayer();
        this.createCamera();
        this.createFire();
        //ALWAYS AT THE END OF CREATE
        this.loadCheckpoint();

        // Collisions
        this.physics.add.collider(this.player, this.plateformes);

        // Overlap
        this.physics.add.overlap(this.player, this.fires, this.gameoverScreen, null, this);
        // this.physics.add.overlap(this.player, this.checkpoints, this.save);

        // Make the camera follow the player
        this.cameras.main.startFollow(this.player,true);


    };

    createPlayer() {
        this.player = new Player(this, 100, 100);
        this.player.visible = true;
        this.player.depth = 0;
    };

    createWorld() {
        // Add Tiles set
        const map = this.add.tilemap('tilemap_forest');
        const back = map.addTilesetImage('background');
        const tileset_forest = map.addTilesetImage('tileset_forest');
        const tileset_rocks = map.addTilesetImage('front_rocks');
        const flag = map.addTilesetImage('Flag');

        // Create Layers

        this.background = map.createLayer('background', back);
        this.background.scrollFactorX = 0.3;
        this.background.depth = -1;

        this.plateformes = map.createLayer('plateformes', tileset_forest);
        this.plateformes.setCollisionByProperty({estSolide: true});
        this.plateformes.depth = 0;

        // this.checkpoints = map.createLayer('checkpoints', flag);
        // this.checkpoints.depth = 0;

        this.decors = map.createLayer('decors', tileset_forest);
        this.decors.depth = 0;

        this.front = map.createLayer("front", tileset_rocks);
        // TODO: Dynamically set scrollFactor (from Tiled info)
        this.front.scrollFactorX = 1.2;
        this.front.depth = 2;
    };

    createCamera() {
        // Add camera
        this.physics.world.setBounds(0, 0, 40 * 16, 13 * 16);
        this.cameras.main.setBounds(0, 0, 40 * 16, 13 * 16, true);
    };

    createFire() {
        // Load json data
        this.levelData = this.cache.json.get('fireData');

        // create all the fires
        this.fires = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        for (let i = 0; i < this.levelData.fires.length; i++) {
            let curr = this.levelData.fires[i];

            let newObj = this.add.sprite(curr.x, curr.y, 'fire').setOrigin(0);
            if (!this.anims.get('burning')) {
                // fire animation
                this.anims.create({
                    key: 'burning',
                    frames: this.anims.generateFrameNames('fire', {
                        frames: [0, 1]
                    }),
                    frameRate: 4,
                    repeat: -1
                });
            }
            // play fire animation
            newObj.anims.play('burning');
            this.fires.add(newObj);
        }
    };

    save(){
        localStorage.setItem('hero_checkpoint', JSON.stringify({
            x: hero.x,
            y: hero.y,
        }));
    };

    loadCheckpoint(){
        const lastCheckpoint = localStorage.getItem('Player_position');
        if (lastCheckpoint) {
            const position = JSON.parse(lastCheckpoint);
            this.player.setX(position.x);
            this.player.setY(position.y);
        }

        localStorage.removeItem('Player_position');
    };

    gameoverScreen() {
        this.physics.pause();
        this.gameoverText = this.add.text(this.screenCenterX, this.screenCenterY, 'Game Over', {
            fontSize: '24px',
            backgroundColor: '#543F24'
        });
        this.gameoverText.setOrigin(0.5);

        this.restartButton = this.add.image(this.screenCenterX, this.screenCenterY + 25, 'Restart').setInteractive();
        this.restartButton.on('pointerdown', this.restartGame, this);
    };

// restart game (game over + you won!) // source and target sprite for further interactions
// camera and effect for use to move camera and use a frame from sprite
    restartGame() {
        // fade out
        this.restartButton.visible = false;
        this.gameoverText.visible = false;
        this.cameras.main.fadeOut(500);

        // when fade out completes, restart scene
        this.cameras.main.on('camerafadeoutcomplete', function () {
            // restart the scene
            this.scene.restart();
        }, this);
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys(); // Retrieves the keys
        this.player.listenControls(this.cursors);

        // Center of the Game screen
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }
};
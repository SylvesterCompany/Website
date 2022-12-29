import Player from "/game/classes/Player.js";
import Checkpoint from "../classes/Checkpoint.js";
import ArchiveCollection from "../classes/ArchiveCollection.js";
import openArchive from "../utils/openArchive.js";
import SodaCan from "../classes/SodaCan.js";

export default class GameScene extends Phaser.Scene {
    player;
    map;
    cursors;
    decors;
    front;
    background;
    plateformes;
    sodacans = [];
    checkpoints = [];
    checkLap;
    gameoverText;
    screenCenterX;
    screenCenterY;
    restartButton;
    archiveCollection;
    theme;
    dustEmitter;

    constructor() {
        super('GameScene');
    }

    create() {
        this.archiveCollection = new ArchiveCollection(this.game.cache.json.get("archives"));

        this.theme = this.sound.add('cave', {
            volume: 0.2,
            loop: true
        });
        this.theme.play();

        this.createPlayer();
        this.createWorld();
        this.createSodaCans();
        this.createCheckpoints();
        this.createCamera();
        this.createDustEmitters();
        // this.createFire();

        // Méthode avec classe

        // Collisions
        this.physics.add.collider(this.player, this.plateformes);

        // Overlap
        this.physics.add.overlap(this.player, this.fires, () => {
            // Starts the scene in parallel
            this.scene.launch('GameOverScene');
        }, null, this);

        // Make the camera follow the player
        this.cameras.main.startFollow(this.player,true);

        // ALWAYS AT THE END OF CREATE
        this.loadCheckpoint();
    };

    createPlayer() {
        this.player = new Player(this, 80, 145);
        this.player.visible = true;
        this.player.depth = 1;
    };

    createSodaCans() {
        // Create soda cans (but not those whose that were previously collected!)

        const sodacans = this.map.objects.find(object => object.name === "sodacans").objects;

        for (const sc of sodacans) {
            const archiveId = sc.properties.find(property => property.name === "archiveId").value;

            if (!this.archiveCollection.getCollectedIds().includes(archiveId)) {
                const newSodacan = new SodaCan(this, sc.x, sc.y, archiveId);

                this.physics.add.overlap(this.player, newSodacan, this.collectArchive, null, this);

                this.sodacans = [...this.sodacans, newSodacan];
            }
        }
    }

    createCheckpoints() {
        // Create checkpoints

        const checkpoints = this.map.objects.find(object => object.name === "checkpoints").objects;

        for (const cp of checkpoints) {
            const newCheckpoint = new Checkpoint(this, cp.x, cp.y);

            this.physics.add.overlap(this.player, newCheckpoint, this.save, null, this);

            this.checkpoints = [...this.checkpoints, newCheckpoint];
        }
    }

    createWorld() {
        // Add Tiles set

        const map = this.add.tilemap('tilemap_forest');
        this.map = map;

        const back = map.addTilesetImage('background');
        const tileset_forest = map.addTilesetImage('tileset_forest');
        const tileset_rocks = map.addTilesetImage('front_rocks');

        // Create Layers

        this.background = map.createLayer('background', back);
        this.background.scrollFactorX = 0.3;
        this.background.depth = -1;

        this.plateformes = map.createLayer('plateformes', tileset_forest);
        this.plateformes.setCollisionByProperty({estSolide: true});
        this.plateformes.depth = 0;

        this.decors = map.createLayer('decors', tileset_forest);
        this.decors.depth = -1;

        this.front = map.createLayer("front", tileset_rocks);
        // TODO: Dynamically set scrollFactor (from Tiled info)
        this.front.scrollFactorX = 1.2;
        this.front.depth = 2;

        // Make dangerous tiles... dangerous

        const dangerousTiles = this.plateformes.filterTiles(tile => tile.properties.estDangereux);
        const processedIndexes = new Set();

        dangerousTiles.forEach(dangerousTile => {
            const index = dangerousTile.index;

            if (!processedIndexes.has(index)) {
                processedIndexes.add(index);
                this.plateformes.setTileIndexCallback(index, () => { this.player.die() }, this);
            }
        });
    };

    createDustEmitters() {
        const MIN_SPEED = 1;
        const MAX_SPEED = 5;

        const dustParticles = this.add.particles("dust");
        this.dustEmitter = dustParticles.createEmitter();
        this.dustEmitter.deathCallback = this._relocateDust.bind(this);

        this.dustEmitter.setPosition(0, 0);
        this.dustEmitter.setSpeed({ min: MIN_SPEED, max: MAX_SPEED});
        this.dustEmitter.setFrequency(50);
        this.dustEmitter.setAngle(0);
        this.dustEmitter.setLifespan(4000);
        this.dustEmitter.setQuantity(1);
        this.dustEmitter.setBlendMode(Phaser.BlendModes.ADD);
    }

    _relocateDust() {
        const MIN_GRAVITY = 1;
        const MAX_GRAVITY = 5;
        const AMPLITUDE = 2;

        this.dustEmitter.setPosition(
            this.player.x + Math.random() * this.game.canvas.width * AMPLITUDE - (this.game.canvas.width * AMPLITUDE) / 2,
            0 + Math.random() * this.game.canvas.height
        );
        this.dustEmitter.setGravityY(Math.random() * (MIN_GRAVITY + MAX_GRAVITY) - MIN_GRAVITY);
        this.dustEmitter.setAlpha(Math.cos(this.game.getTime() / 500) / 10 + 0.2);
    }

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

    collectArchive(player, sodacan) {
        sodacan.destroy();

        this.archiveCollection.collect(sodacan.archiveId);

        this.physics.pause();

        openArchive(this.archiveCollection.getArchive(sodacan.archiveId), () => {
            this.physics.resume();
        });
    }

    save(){
        localStorage.setItem('Player_position', JSON.stringify({
            x: this.player.x,
            y: this.player.y,
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

    update() {
        this.cursors = this.input.keyboard.createCursorKeys(); // Retrieves the keys
        this.player.listenControls(this.cursors);

        // Center of the Game screen
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }
};
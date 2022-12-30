import Player from "/game/classes/Player.js";
import Checkpoint from "../classes/Checkpoint.js";
import ArchiveCollection from "../classes/ArchiveCollection.js";
import openArchive from "../utils/openArchive.js";
import SodaCan from "../classes/SodaCan.js";
import Propulsor from "../classes/Propulsor.js";

export default class GameScene extends Phaser.Scene {
    player;
    map;
    cursors;

    checkLap;
    gameoverText;
    screenCenterX;
    screenCenterY;
    restartButton;
    archiveCollection;
    theme;
    dustEmitters = [];

    // Layers

    front;
    sodaCans = [];
    checkpoints = [];
    propulsors = [];
    plateformes;
    decors;
    lights;
    background;
    lastBackground;

    constructor() {
        super('GameScene');
    }

    create() {
        this.scene.launch('OverlayScene');
        this.scale.resize(16 * 20, 16 * 13);
        this.cameras.main.fadeIn(500);

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
        this.createPropulsors();
        this.createCamera();
        this.createDustEmitters();
        // this.createFire();

        // Méthode avec classe

        // Collisions
        this.physics.add.collider(this.player, this.plateformes);

        // Overlap
        this.physics.add.overlap(this.player, this.fires, () => {
            // Starts the scene in parallel
            //this.scene.launch('GameOverScene');
        }, null, this);

        // Make the camera follow the player
        this.cameras.main.startFollow(this.player, true);

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

        let sodacans = this.map.objects.find(object => object.name === "sodacans");

        if (sodacans) {
            sodacans = sodacans.objects;

            for (const sc of sodacans) {
                const archiveId = sc.properties.find(property => property.name === "archiveId").value;

                if (!this.archiveCollection.getCollectedIds().includes(archiveId)) {
                    const newSodacan = new SodaCan(this, sc.x, sc.y, archiveId);

                    this.physics.add.overlap(this.player, newSodacan, this.collectArchive, null, this);

                    this.sodaCans = [...this.sodaCans, newSodacan];
                }
            }
        }
    }

    createPropulsors() {
        // Create soda cans (but not those whose that were previously collected!)

        let propulsors = this.map.objects.find(object => object.name === "propulsors");

        if (propulsors) {
            propulsors = propulsors.objects;

            for (const prop of propulsors) {
                const newPropulsor = new Propulsor(this, prop.x, prop.y);

                this.physics.add.overlap(this.player, newPropulsor, () => { this.player.propulse() }, null, this);

                this.propulsors = [...this.propulsors, newPropulsor];
            }
        }
    }

    createCheckpoints() {
        // Create checkpoints

        let checkpoints = this.map.objects.find(object => object.name === "checkpoints");

        if (checkpoints) {
            checkpoints = checkpoints.objects;

            for (const cp of checkpoints) {
                const newCheckpoint = new Checkpoint(this, cp.x, cp.y);

                newCheckpoint.depth = -2;

                this.physics.add.overlap(this.player, newCheckpoint, this.save, null, this);

                this.checkpoints = [...this.checkpoints, newCheckpoint];
            }
        }
    }

    createWorld() {
        // Add Tiles set

        const map = this.add.tilemap('tilemap_forest');
        this.map = map;

        const last_back = map.addTilesetImage('last_background');
        const back = map.addTilesetImage('background');
        const tileset_forest = map.addTilesetImage('tileset_forest');
        const tileset_rocks = map.addTilesetImage('front_rocks');
        const tileset_lights = map.addTilesetImage("lights");

        // Create Layers

        this.lastBackground = map.createLayer('last_background', last_back);
        this.lastBackground.scrollFactorX = 0.1;
        this.lastBackground.depth = -4;

        this.background = map.createLayer('background', back);
        this.background.scrollFactorX = 0.3;
        this.background.depth = -3;

        this.lights = map.createLayer("lights", tileset_lights);
        this.lights.scrollFactorX = 0.4;
        this.lights.depth = -2;

        this.plateformes = map.createLayer('plateformes', tileset_forest);
        this.plateformes.setCollisionByProperty({estSolide: true});
        this.plateformes.depth = 0;

        // // TODO: Temporary
        // const debugGraphics = this.add.graphics();
        // this.plateformes.renderDebug(debugGraphics);

        this.decors = map.createLayer('decors', tileset_forest);
        this.decors.depth = -1;

        this.front = map.createLayer("front", tileset_rocks);
        // TODO: Dynamically set scrollFactor (from Tiled info)
        this.front.scrollFactorX = 1.4;
        this.front.scrollFactorY = 1.4;
        this.front.depth = 2;

        // Make dangerous tiles... dangerous

        const dangerousTiles = this.plateformes.filterTiles(tile => tile.properties.estDangereux);
        const processedIndexes = new Set();

        dangerousTiles.forEach(dangerousTile => {
            const index = dangerousTile.index;

            if (!processedIndexes.has(index)) {
                processedIndexes.add(index);

                this.plateformes.setTileIndexCallback(index, this.player.die, this);
            }
        });
    };

    createDustEmitters() {
        const MIN_SPEED = 1;
        const MAX_SPEED = 5;
        const LIFESPAN = 3000;

        const dustParticles = this.add.particles("dust");

        const addEmitter = (scrollFactorX, depth) => {
            const newEmitter = dustParticles.createEmitter();

            newEmitter.deathCallback = this._relocateDust.bind(this);

            newEmitter.setPosition(0, 0);
            newEmitter.setSpeed({min: MIN_SPEED, max: MAX_SPEED});
            newEmitter.setFrequency(100);
            newEmitter.setAngle(0);
            newEmitter.setLifespan(LIFESPAN);
            newEmitter.setQuantity(1);
            newEmitter.setBlendMode(Phaser.BlendModes.ADD);

            newEmitter.scrollFactorX = scrollFactorX;
            newEmitter.depth = depth;

            this.dustEmitters = [...this.dustEmitters, newEmitter];
        }

        addEmitter(1.1, 1);
        addEmitter(1.3, 1);
    }

    _relocateDust() {
        // TODO: Improve later

        const MIN_GRAVITY = 1;
        const MAX_GRAVITY = 5;
        const AMPLITUDE = 2;

        this.dustEmitters.forEach(emitter => {
            emitter.setPosition(
                this.player.x + Math.random() * this.game.canvas.width * AMPLITUDE - (this.game.canvas.width * AMPLITUDE) / 2,
                Math.random() * this.game.canvas.height
            );
            emitter.setGravityY(Math.random() * (MIN_GRAVITY + MAX_GRAVITY) - MIN_GRAVITY);
            emitter.setAlpha(Math.cos(this.game.getTime() / 500) / 20 + 0.25);
        });
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

    save(player, checkpoint) {
        checkpoint.save();

        localStorage.setItem('Player_position', JSON.stringify({
            x: this.player.x,
            y: this.player.y,
        }));
    };

    loadCheckpoint() {
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
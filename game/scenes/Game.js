import Player from "/game/classes/Player.js";
import Checkpoint from "../classes/Checkpoint.js";
import ArchiveCollection from "../classes/ArchiveCollection.js";
import SodaCan from "../classes/SodaCan.js";
import TrashBag from "../classes/TrashBag.js";
import Propulsor from "../classes/Propulsor.js";
import Door from "../classes/Door.js";
import Enemy from "../classes/Enemy.js";
import End from "../classes/End.js";

import openArchive from "../utils/openArchive.js";
import openDialog from "../utils/openDialog.js";
import handler from "../utils/handler.js";


export default class GameScene extends Phaser.Scene {
    static FADE_DURATION = 1000;

    player;
    map;
    archiveCollection;

    // Sounds

    theme;
    triumph;
    deathSound;
    pageSound;
    bounceSound;
    bagSound;
    sodaSound;

    // Layers

    front;
    sodaCans = [];
    doors = [];
    enemies = [];
    checkpoints = [];
    propulsors = [];
    dustEmitters = [];
    plateformes;
    decors;
    lights;
    background;
    lastBackground;

    /**
     * Constructor: Everything we need to retrieve in the cache
     */
    constructor() {
        super('GameScene');

        // Retrieves the potential save
        const save = JSON.parse(localStorage.getItem("Level"));

        if (save && save.levelId && save.checkpointId) { // If there is one, set the current level value to that
            this.currentLevel = save.levelId;
        } else { // If not, set up a new save (first level, first checkpoint)
            this.save(this.currentLevel = 1, 1);
        }
    }

    /**
     * Callback: Free to get back on the main page
     */
    back() {
        const { callback } = this.game.registry.values;
        this.sound.pauseAll();
        this.scene.pause();
        callback();
    }

    /**
     * Call everything we need here
     */
    create() {
        const { TILE_SIZE } = this.game.registry.values;

        this.cameras.main.fadeIn(GameScene.FADE_DURATION);

        this.archiveCollection = new ArchiveCollection(this.game.cache.json.get("archives"));

        this.player = new Player(this, 0, 0);

        this.listener();
        this.createSounds();
        this.createWorld();
        this.createCheckpoints();
        this.createEnemies();
        this.createTrashBag();
        this.createSodaCans();
        this.createDoors();
        this.createPropulsors();
        this.createDustEmitters();
        this.createEnd();

        // Make the camera follow the player
        this.cameras.main.setBounds(0, 0, this.map.width * TILE_SIZE, this.map.height * TILE_SIZE, true);
        this.cameras.main.startFollow(this.player, true);

        // Depends on the checkpoints
        this.spawn();
    };

    /**
     * Listen to some events
     */
    listener() {
        handler.on('clickedoutside', this.back, this);
        this.input.keyboard.on('keyup-ESC', this.back, this);
        handler.on('playerdeath', (resetLevel) => {
            const SHAKE_DURATION = 100;
            const SHAKE_INTENSITY = 0.03;
            this.cameras.main.shake(SHAKE_DURATION, SHAKE_INTENSITY);
            this.time.addEvent({
                delay: SHAKE_DURATION,
                callback: () => { this.scene.launch("GameOverScene", {ctx: this, resetLevel}) },
            });
            this.deathSound.play();
        });
    }

    /**
     * Create all the sounds
     */
    createSounds() {
        this.theme = this.sound.add('theme', {
            volume: 0.2,
            loop: true
        });
        this.theme.play();
        this.deathSound = this.sound.add('death', {
            volume: 0.2,
            rate: 1.5
        });
        this.pageSound = this.sound.add('page');
        this.bounceSound = this.sound.add('bounce', {
            volume: 0.3
        });
        this.bagSound = this.sound.add('bag');
        this.sodaSound = this.sound.add('soda', {
            volume: 0.2
        });
        this.triumph = this.sound.add('triumph', {
            volume: 0.5
        });
    }

    /**
     * Create all the tiles and draw them on the map
     */
    createWorld() {
        const { TILE_SIZE } = this.game.registry.values;

        // Map
        const map = this.add.tilemap(`tilemap_1_${this.currentLevel}`);
        this.map = map;

        // Tilesets
        const last_back = map.addTilesetImage('last_background');
        const back = map.addTilesetImage('background');
        const tileset_forest = map.addTilesetImage('tileset_forest');
        const tileset_rocks = map.addTilesetImage('front_rocks');
        const tileset_lights = map.addTilesetImage("lights");

        // Create layers

        // Last background
        this.lastBackground = map.createLayer('last_background', last_back);
        this.lastBackground.scrollFactorX = 0.1;
        this.lastBackground.scrollFactorY = 0;
        this.lastBackground.depth = -4;

        // First background
        this.background = map.createLayer('background', back);
        this.background.scrollFactorX = 0.2;
        this.background.scrollFactorY = 0;
        this.background.depth = -3;

        // Lights
        this.lights = map.createLayer("lights", tileset_lights);
        this.lights.scrollFactorX = 0.3;
        this.lights.scrollFactorY = 0;
        this.lights.depth = -2;

        // Platforms
        this.plateformes = map.createLayer('plateformes', tileset_forest);
        this.plateformes.setCollisionByProperty({estSolide: true});
        this.plateformes.depth = 0;

        // Props
        this.decors = map.createLayer('decors', tileset_forest);
        this.decors.depth = -1;

        // Front rocks
        this.front = map.createLayer("front", tileset_rocks);
        this.front.scrollFactorX = 1.4;
        this.front.scrollFactorY = 1.4;
        this.front.depth = 2;

        // Collisions
        this.physics.add.collider(this.player, this.plateformes);
        this.physics.world.setBounds(0, 0, map.width * TILE_SIZE, map.height * TILE_SIZE);

        // Make dangerous tiles... dangerous

        const dangerousTiles = this.plateformes.filterTiles(tile => tile.properties.estDangereux);
        const processedIndexes = new Set();

        dangerousTiles.forEach(dangerousTile => {
            const index = dangerousTile.index;

            if (!processedIndexes.has(index)) {
                processedIndexes.add(index);

                this.plateformes.setTileIndexCallback(index, (sprite) => {
                    if (sprite instanceof Player) {
                        this.killPlayer();
                    }
                }, this);
            }
        });
    };

    /**
     * Create some enemies and make them hostiles to the player
     */
    createEnemies() {
        this.enemies = [];

        let enemies = this.map.objects.find(object => object.name === "enemies");

        if (enemies) {
            enemies = enemies.objects;
            for (const enemy of enemies) {
                const newEnemy = new Enemy(this, enemy.x, enemy.y);

                this.physics.add.overlap(this.player, newEnemy, this.killPlayer, null, this);

                this.enemies = [...this.enemies, newEnemy];
            }
        }

        // TODO: Refactor later...
        this.physics.add.collider(this.enemies, this.plateformes);
    }

    /**
     * Create only soda cans that were not found
     */
    createSodaCans() {
        this.sodaCans = [];

        let sodacans = this.map.objects.find(object => object.name === "sodacans");

        if (sodacans) {
            sodacans = sodacans.objects;

            for (const sc of sodacans) {
                const archiveId = sc.properties.find(property => property.name === "archiveId").value;

                if (!this.archiveCollection.getCollectedIds().includes(archiveId)) {
                    const newSodacan = new SodaCan(this, sc.x, sc.y, archiveId);

                    this.physics.add.overlap(this.player, newSodacan, () => {
                        this.collectArchive(this.player, newSodacan);
                        this.sodaSound.play();
                        handler.emit('trashcollected', 15);
                    }, null, this);

                    this.sodaCans = [...this.sodaCans, newSodacan];
                }
            }
        }
    }

    /**
     * Create some doors on the extremities of the level and make them like a portal
     */
    createDoors() {
        this.doors = [];

        let doors = this.map.objects.find(object => object.name === "doors");

        if (doors) {
            doors = doors.objects;
            for (const door of doors) {
                const doorId = door.properties.find(property => property.name === "doorId").value;
                const destination = door.properties.find(property => property.name === "destination").value;

                const newDoor = new Door(this, door.x, door.y, door.width, door.height, doorId, destination);

                this.physics.add.overlap(this.player, newDoor, (player, doorObj) => {
                    this.changeLevel(doorObj.destination.levelId, doorObj.destination.checkpointId);
                    this.scene.restart();
                });

                this.doors = [...this.doors, newDoor];
            }
        }
    }

    /**
     * Create end object and a little celebration
     */
    createEnd() {
        let end = this.map.objects.find(object => object.name === "end");
        if (end) {
            [end] = end.objects;
            const newEnd = new End(this, end.x, end.y);

            this.physics.add.overlap(this.player, newEnd, () => {
                this.triumph.play();
                this.changeLevel(1, 1);
                const overlay = this.scene.get('OverlayScene');
                const score = overlay.score;
                localStorage.clear();

                openDialog([`GG You have ${score}`], () => {
                    this.scene.restart();
                });
            });
        }
    }

    /**
     * Create propulsors and make the player jumping while being on them
     */
    createPropulsors() {
        this.propulsors = [];

        let propulsors = this.map.objects.find(object => object.name === "propulsors");

        if (propulsors) {
            propulsors = propulsors.objects;
            for (const prop of propulsors) {
                const newPropulsor = new Propulsor(this, prop.x, prop.y);

                this.physics.add.overlap(this.player, newPropulsor, () => {
                    this.player.propulse();
                    this.bounceSound.play();
                }, (player) => {
                    return !player.body.onFloor();
                }, this);

                this.propulsors = [...this.propulsors, newPropulsor];
            }
        }
    }

    /**
     * Create some checkpoints depending on the level and make them trigger-able
     */
    createCheckpoints() {
        this.checkpoints = [];

        let checkpoints = this.map.objects.find(object => object.name === "checkpoints");

        if (checkpoints) {
            checkpoints = checkpoints.objects;

            for (const cp of checkpoints) {
                const checkpointId = cp.properties.find(property => property.name === "checkpointId").value;
                const newCheckpoint = new Checkpoint(this, cp.x, cp.y, checkpointId);

                newCheckpoint.depth = -1;

                this.physics.add.overlap(this.player, newCheckpoint, (player, checkpoint) => {
                    checkpoint.trigger();
                    this.save(this.currentLevel, checkpoint.id);
                }, null, this);

                this.checkpoints = [...this.checkpoints, newCheckpoint];
            }
        }
    }

    createTrashBag() {
        let trashbags = this.map.objects.find(object => object.name === "trash");

        if (trashbags) {
            trashbags = trashbags.objects;
            for (const tb of trashbags) {
                const newTrashBag = new TrashBag(this, tb.x, tb.y);

                this.physics.add.overlap(this.player, newTrashBag, (player, trashbag) => {
                    trashbag.disableBody(true,true);
                    this.bagSound.play();
                    handler.emit('trashcollected', 10);
                }, null, this);
            }
        }
    }

    /**
     * Set current level and checkpoint positions
     *
     * @param levelId
     * @param checkpointId
     */
    changeLevel(levelId, checkpointId) {
        this.currentLevel = levelId;

        this.save(levelId, checkpointId);
    }

    /**
     * Display some dust particles in the background
     */
    createDustEmitters() {
        this.dustEmitters = [];

        const MIN_SPEED = 1;
        const MAX_SPEED = 5;
        const LIFESPAN = 3000;
        const FREQUENCY = 30;

        const dustParticles = this.add.particles("dust");

        const addEmitter = (scrollFactorX, depth) => {
            const newEmitter = dustParticles.createEmitter();

            newEmitter.deathCallback = this._relocateDust.bind(this);

            newEmitter.setPosition(0, 0);
            newEmitter.setSpeed({min: MIN_SPEED, max: MAX_SPEED});
            newEmitter.setFrequency(FREQUENCY);
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
        const MIN_GRAVITY = 1;
        const MAX_GRAVITY = 5;
        const AMPLITUDE = 2;

        const camera = this.cameras.main;
        const currentMid = camera.getWorldPoint(camera.x + camera.displayWidth / 2, camera.y + camera.displayHeight / 2);

        this.dustEmitters.forEach(emitter => {
            emitter.setPosition(
                currentMid.x + Math.random() * this.game.canvas.width * AMPLITUDE - (this.game.canvas.width * AMPLITUDE) / 2,
                currentMid.y + Math.random() * this.game.canvas.height * AMPLITUDE - (this.game.canvas.width * AMPLITUDE) / 2
            );
            emitter.setGravityY(Math.random() * (MIN_GRAVITY + MAX_GRAVITY) - MIN_GRAVITY);
            emitter.setAlpha(Math.cos(this.game.getTime() / 500) / 20 + 0.25);
        });
    }

    /**
     * On archive collecting
     *
     * @param player
     * @param sodacan
     */
    collectArchive(player, sodacan) {
        sodacan.destroy();

        this.archiveCollection.collect(sodacan.archiveId);

        this.physics.pause();

        openArchive(this.archiveCollection.getArchive(sodacan.archiveId), () => {
            this.physics.resume();
            this.pageSound.play();
        });
    }

    killPlayer() {
        this.player.die();
    }

    /**
     * Save current level and checkpoint positions to the local storage
     *
     * @param levelId
     * @param checkpointId
     */
    save(levelId, checkpointId) {
        localStorage.removeItem('Level');
        localStorage.setItem('Level', JSON.stringify({
            levelId: levelId,
            checkpointId: checkpointId
        }));
    };

    /**
     * Player spawning
     */
    spawn() {
        const { checkpointId } = JSON.parse(localStorage.getItem('Level'));

        const checkpoint = this.checkpoints.find(cp => cp.id === checkpointId);

        this.player.setPosition(checkpoint.x, checkpoint.y);
    };

    /**
     * Update every tick
     */
    update() {
        // Retrieves the controls
        const cursors = this.input.keyboard.createCursorKeys();
        this.player.listenControls(cursors);

        // Checks if the player touches the world's bottom
        if (this.player.body.bottom === this.physics.world.bounds.bottom)
            this.killPlayer();
    }
};
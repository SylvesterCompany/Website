import Player from "/game/classes/Player.js";

export default class GameScene extends Phaser.Scene {
    player;
    cursors;
    decors;
    background;
    plateformes;
    gameoverText;

    camera;

    constructor() {
        super('GameScene')
    }

    preload() {
        // Player's textures
        this.load.image("player", "assets/img/player/sylvester_contour.png");
        this.load.image("player-left", "assets/img/player/sylvester_contour_left.png");
        this.load.spritesheet("player-running", "assets/img/player/sylvester_anim.png", { frameWidth: 24, frameHeight: 16 });
        this.load.spritesheet("player-running-left", "assets/img/player/sylvester_anim_left.png", { frameWidth: 24, frameHeight: 16 });

        // Fire texture
        this.load.spritesheet('fire', 'assets/img/player/fire_spritesheet.png', {
            frameWidth: 20,
            frameHeight: 21,
            margin: 1,
            spacing: 1
        });


        // Map's textures
        this.load.image('tileset', 'game/tiles/tileset.png')
        this.load.image('backgrounds', 'game/tiles/backgrounds.png')

        // Load the JSON file
        this.load.tilemapTiledJSON('map_tiles', 'game/tiles/map-test.json')

        //fire dataPositionLoad
        this.load.json('fireData', 'game/levelDataFire.json');




    }

    create() {
        this.createWorld();
        this.createPlayer();
        this.createCamera();
        this.physics.add.collider(this.player, this.plateformes);


        this.gameoverText = this.add.text(20*16,6*16,"GameOver"); //TODO::Afficher le message toujours au milieu.
        this.gameoverText.setOrigin(0.5);
        this.gameoverText.visible = false;

        // DEBUG
        // this.plateformes.renderDebug(this.add.graphics());

         // fireee

        if(!this.anims.get('burning')) {
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

        this.setupFire();



        // overlap with fires

        this.physics.add.overlap(this.player, this.fires, this.restartGame, null, this);

        // to know where to position fires

        this.input.on('pointerdown', function(pointer){
            console.log(pointer.x, pointer.y)
        });

    };

    createPlayer(){
        this.player = new Player(this, 100, 100);
        this.player.visible = true;
    };

    createWorld(){
        //Add Tiles set
        const map = this.add.tilemap('map_tiles')
        const back = map.addTilesetImage('backgrounds')
        const tileset = map.addTilesetImage('tileset')

        //Create Layers
        this.background = map.createLayer('Background', back)
        this.plateformes = map.createLayer('Plateformes', tileset)
        this.decors = map.createLayer('Decors', tileset)

        //Add physics
        this.plateformes.setCollisionByProperty({ estSolide: true });
    };
     createCamera(){
         //Add camera
         this.physics.world.setBounds(0,0,40*16,13*16);
         this.cameras.main.setBounds(0,0,40 * 16,13 * 16);
         this.cameras.main.startFollow(this.player, true);
     };

     gameoverScreen(){
        this.physics.pause();
        this.gameoverText.visible=true;
     };

    update() {
        this.cursors = this.input.keyboard.createCursorKeys(); // Retrieves the keys
        this.player.listenControls(this.cursors);
    }

    // fires gestion

    setupFire(){

        // Load json data
        this.levelData = this.cache.json.get('fireData');

        // create all the fires
        this.fires = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        for (let i = 0; i <this.levelData.fires.length; i++) {
            let curr = this.levelData.fires[i];

            let newObj = this.add.sprite(curr.x, curr.y, 'fire').setOrigin(0);

            // play fire animation
            newObj.anims.play('burning');
            this.fires.add(newObj);
            // console.log(newObj); // testing in console properties

            // make fires dragable (TESTING PURPOSE)
            newObj.setInteractive();
            this.input.setDraggable(newObj);


        }
        // for level creation and gestion fire position
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            console.log(dragX, dragY);
        });

    };





// restart game (game over + you won!) // source and target sprite for further interactions
    // camera and effect for use to move camera and use an frame from sprite

    restartGame (sourceSprite, targetSprite) {
        // fade out
        this.cameras.main.fade(500);

        // when fade out completes, restart scene
        this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
            // restart the scene
            this.scene.restart();
        }, this);
    }




};


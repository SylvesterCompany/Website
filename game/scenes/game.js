import Player from "/game/classes/Player.js";

export default class GameScene extends Phaser.Scene {
    player;
    cursors;
    decors;
    background;
    plateformes;
    gameoverText;
    screenCenterX;
    screenCenterY;
    restartButton;


    constructor() {
        super('GameScene')
    }

    preload() {
        // Player's textures
        this.load.image("player", "assets/img/player/sylvester_contour.png");
        this.load.image("player-left", "assets/img/player/sylvester_contour_left.png");
        this.load.spritesheet("player-running", "assets/img/player/sylvester_anim.png", { frameWidth: 24, frameHeight: 16 });
        this.load.spritesheet("player-running-left", "assets/img/player/sylvester_anim_left.png", { frameWidth: 24, frameHeight: 16 });
        this.load.image('Restart',"assets/img/PLACEHOLDER.png");

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
        this.setupFire();
        //Collisions
        this.physics.add.collider(this.player, this.plateformes);

        //Overlap
        this.physics.add.overlap(this.player, this.fires, this.gameoverScreen, null, this);
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
         this.cameras.main.setBounds(0,0,40*16,13*16,true);
         this.cameras.main.startFollow(this.player, true);
     };

     gameoverScreen(){
        this.physics.pause();
        this.gameoverText = this.add.text(this.screenCenterX,this.screenCenterY,'GameOver',{fontSize:'24px', backgroundColor:'#543F24'});
        this.gameoverText.setOrigin(0.5);

        this.restartButton = this.add.sprite(this.screenCenterX,this.screenCenterY+25,'Restart').setInteractive();
        this.restartButton.on('pointerdown', this.restartGame, this);
     };
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
            // play fire animation
            newObj.anims.play('burning');
            this.fires.add(newObj);
        }
    };

// restart game (game over + you won!) // source and target sprite for further interactions
// camera and effect for use to move camera and use a frame from sprite
    restartGame () {
        // fade out
        this.restartButton.visible=false;
        this.gameoverText.visible=false;
        this.cameras.main.fadeOut(500);

        // when fade out completes, restart scene
        this.cameras.main.on('camerafadeoutcomplete', function(){
            // restart the scene
            this.scene.restart();
        }, this);
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys(); // Retrieves the keys
        this.player.listenControls(this.cursors);

        //Center of the Game screen
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }
};


export default class Door extends Phaser.Physics.Arcade.Sprite {
    id;
    width;
    height;
    destination;

    constructor(scene, x, y, width, height, id, destination) {
        super(scene, x, y, "");

        this.id = id;
        this.width = width;
        this.height = height;
        this.destination = new Destination(destination);

        // Adds the soda can to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.visible = false;
        this.depth = 0;

        // Set the size
        this.body.setSize(width, height);

        this.body.immovable = true;
        this.body.allowGravity = false;

        this.setOrigin(0);
    }
}

class Destination {
    levelId;
    checkpointId;

    constructor(rawDest) {
        rawDest = rawDest.split("_");

        this.levelId = parseInt(rawDest[0]);
        this.checkpointId = parseInt(rawDest[1]);
    }
}
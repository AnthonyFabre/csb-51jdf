class Enemi extends Phaser.Physics.Arcade.Sprite {
  constructor(cordX, cordY, sprite, bounce, scene) {
    super(scene, cordX, cordY, sprite);
    this.cordX = cordX;
    this.cordY = cordY;
    this.sprite = sprite;
    this.bounce = bounce;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.scene.physics.add.collider(this, this.scene.platforms);
    this.scene.physics.add.collider(player, this, this.hitenemi, null, this);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });
  }
  deplacementEnemi(player) {
    var playerx = player.x;
    var playery = player.y;
    var enemix = this.x;
    var enemiy = this.y;
    if (enemix - playerx < 0) {
      this.setVelocityX(80);
      this.anims.play("right", true);
    } else if (enemix - playerx > 0) {
      this.setVelocityX(-80);
      this.anims.play("left", true);
    } else if (enemix - playerx == 0) {
      this.setVelocityX(0);
      this.anims.play("turn");
    }
  }
  hitenemi(player) {
    this.scene.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameOver = true;
  }
  sautEnemi() {
    this.setVelocityY(-330);
  }
}

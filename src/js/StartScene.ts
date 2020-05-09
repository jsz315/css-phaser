import * as Phaser from 'phaser';
import listener from "./listener.js";

export class StartScene extends Phaser.Scene {
  gameTime: number;
  stageWidth: number = 750;
  stageHeight: number = 1280;
  constructor() {
    super({
      key: 'StartScene'
    })
    this.gameTime = 0;
  }

  init(params: any): void {
    console.log(params, 'init');
    console.log(this, 'this');
  }

  preload(): void {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create(): void {
    var x = this.game.renderer.width / 2 - this.stageWidth / 2;
    var y = this.game.renderer.height / 2 - this.stageHeight / 2;
    var bg = this.add.graphics({ x: x, y: y });
    bg.fillStyle(0xff9900);
    bg.fillRect(0, 0, this.stageWidth, this.stageHeight);

    // var group = this.add.group();
    // group.add(bg);

    

    var sky = this.add.sprite(400, 300, 'sky');
    sky.scale = 0.3;
    
    console.log(sky);
    var red = this.add.image(100, 100, 'red');
    console.log(red);
    var logo = this.add.image(400, 100, 'logo');
    // logo.anchor
    logo.setOrigin(0, 0);
    console.log(logo);


    // this.textures.addBase64('bg', blueSrc);
    console.log(this.textures, "this.textures");

    var style = { font: "36px PingFangSC-Semibold", fill: "#FFDF00", align: "center" };
    var text = this.add.text(this.stageWidth / 2, this.stageWidth / 2, '中国', style)
    // text1.anchor.set(0.5)
    // text1.resolution = 3; //设置分辨率

    this.dragObj(sky);
    this.dragObj(red);
    this.dragObj(logo);
    this.dragObj(text);
    // this.dragObj(bg);

    var container = this.add.container(0, 0);
    container.add(sky);
    container.add(bg);
    container.add(red);
    container.add(logo);
    container.add(text);
    // container.scale = 0.5;
    this.addCamera();
  }

  addCamera(){
    this.cameras.main.setBounds(0, 0, 1024, 1024);
    this.cameras.main.setZoom(0.4);
    this.cameras.main.centerOn(0, 0);
    this.cameras.main.setPosition(100, 300)
  }

  addGrid(){
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0x00ff00, 1);

    graphics.beginPath();

    graphics.moveTo(200, 0);
    graphics.lineTo(200, 600);

    graphics.moveTo(400, 0);
    graphics.lineTo(400, 600);

    graphics.moveTo(600, 0);
    graphics.lineTo(600, 600);

    graphics.strokePath();

    graphics.closePath();
  }

  update(time: any): void {
    // console.log(time);
    this.gameTime = time;
  }

  dragObj(obj: any): void {
    obj.setInteractive()
    this.input.setDraggable(obj);
    this.input.on('drag', (pointer: any, gameObject: any, dragX: any, dragY: any) => {
      // console.log(pointer)
      gameObject.x = dragX;
      gameObject.y = dragY;
      listener.emit("view", gameObject);
    })

    // scene.input.on('click')
  }

}
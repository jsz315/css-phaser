import * as Phaser from 'phaser';
import listener from "./listener.js";
import {ViewFactory} from './ViewFactory'
import Tooler from './tooler';

export class StartScene extends Phaser.Scene {
  gameTime: number;
  stage: Phaser.GameObjects.Polygon;
  stageWidth: number;
  stageHeight: number;
  stageColor: number = 0xffffff;
  container: Phaser.GameObjects.Container;
  curView: any;
  sx:number = 0;
  sy:number = 0;
  hole: Phaser.GameObjects.Graphics;

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

  fastTest(){
    var red = ViewFactory.makeImage(this, 'red');
    var logo = ViewFactory.makeImage(this, 'logo');
    var rect = ViewFactory.makeRect(this, 0x99ff33, 100, 100);
    var text = ViewFactory.makeText(this, '世界');
    
    this.dragObj(red);
    this.dragObj(logo);
    this.dragObj(text);
    this.dragObj(rect);
    

    this.container.add(red);
    this.container.add(logo);
    this.container.add(text);
    this.container.add(rect);
  }

  create(): void {
    this.container = this.add.container(0, 0);
    this.hole = this.add.graphics();

    this.stageWidth = Number(this.game.config.width);
    this.stageHeight = Number(this.game.config.height);
    
    this.resetStage();
    // this.fastTest();
    this.addEvent();
  }

  resetStage(){
    if(this.stage){
      this.stage.destroy(true);
    }
    this.stage = ViewFactory.makeRect(this, this.stageColor, this.stageWidth, this.stageHeight);
    this.stage.setInteractive();
    this.input.setDraggable(this.stage);
    this.stage.on("dragstart", (pointer: any)=>{
      this.sx = pointer.x;
      this.sy = pointer.y;
    })
    this.stage.on("drag", (pointer: any, dragX: any, dragY: any)=>{
      this.container.x += pointer.x - this.sx;
      this.container.y += pointer.y - this.sy;
      this.sx = pointer.x;
      this.sy = pointer.y;
    });
    this.container.addAt(this.stage, 0);
    this.container.width = this.stageWidth;
    this.container.height = this.stageHeight;
    // this.container.scale = 1;

    this.resetHole();
  }

  addEvent(){
    window.addEventListener("mousewheel", (e:any) => {
      var oldX = this.container.scale * this.stageWidth;
      var oldY = this.container.scale * this.stageHeight;
      if(e.deltaY > 0){
        this.container.scale *= 0.9;
      }
      else{
        this.container.scale *= 1.1;
      }
      var newX = this.container.scale * this.stageWidth;
      var newY = this.container.scale * this.stageHeight;

      this.container.x -= (newX - oldX) / 2;
      this.container.y -= (newY - oldY) / 2;

      console.log(this.container, "width");
    })

    listener.on("attr_view", (attr:string, num:any)=>{
      if(!this.curView){
        return;
      }
      var ratio = this.curView.getData('ratio');
      if(attr == 'width'){
        if(ratio){
          this.curView.scale = num / this.curView.width;
        }
        else{
          this.curView.scaleX = num / this.curView.width;
        }
      }
      else if(attr == 'height'){
        if(ratio){
          this.curView.scale = num / this.curView.height;
        }
        else{
          this.curView.scaleY = num / this.curView.height;
        }
      }
      else if(attr == 'x'){
        this.curView.x = num;
      }
      else if(attr == 'y'){
        this.curView.y = num;
      }
      else if(attr == 'enabled'){
        this.curView.input.enabled = !!num;
      }
      else if(attr == 'ratio'){
        this.curView.setData(attr, num);
      }
      else if(attr == 'color'){
        this.curView.setData(attr, num);
        if(this.curView.text){
          this.curView.setStyle({color: num});
        }
        else{
          this.curView.fillColor = Tooler.toColorNumber(num);
        }
      }
      else if(attr == 'word'){
        this.curView.setData(attr, num);
        this.curView.text = num;
      }
      else if(attr == 'size'){
        this.curView.setData(attr, num);
        this.curView.setStyle({fontSize: num + "px"});
      }
    })

    listener.on("attr_stage", (attr:string, num:any)=>{
        if(attr == 'width'){
            this.stageWidth = num;
        }
        else if(attr == 'height'){
            this.stageHeight = num;
        }
        else if(attr == 'color'){
          this.stageColor = Tooler.toColorNumber(num);
      }
        this.resetStage();
    })
    

    listener.on("file", (asset:any) => {
        console.log(this.textures, "textures");
        var list:any = this.textures.list;
        if(!list[asset.name]){
          this.textures.addBase64(asset.name, asset.img);
        }
        setTimeout(() => {
          var view = ViewFactory.makeImage(this, asset.name);
          this.dragObj(view);
          this.container.add(view);
        }, 300);
    })

    listener.on("block", ()=>{
      var rect = ViewFactory.makeRect(this, 0x99ff33, 100, 100);
      this.dragObj(rect);
      this.container.add(rect);
    })

    listener.on("text", ()=>{
      var text = ViewFactory.makeText(this, '文本');
      this.dragObj(text);
      this.container.add(text);
    })
    
  }

  addCamera(){
    this.cameras.main.setBounds(0, 0, this.stageWidth, this.stageHeight);
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(0, 0);
    this.cameras.main.pan(100, 200, 3000)
  }

  resetHole(){
    var {x, y, scale} = this.container;
    this.hole.clear();
    this.hole.fillStyle(0x020202, 0.8)
    this.hole.beginPath();

    this.hole.moveTo(0, 0);
    this.hole.lineTo(0, this.stageHeight);
    this.hole.lineTo(this.stageWidth, this.stageHeight);
    this.hole.lineTo(this.stageWidth, 0);
    this.hole.closePath();

    this.hole.moveTo(x, y);
    this.hole.lineTo(x + this.stageWidth * scale, y);
    this.hole.lineTo(x + this.stageWidth * scale, y + this.stageHeight * scale);
    this.hole.lineTo(x, y + this.stageHeight * scale);
    this.hole.closePath();

    this.hole.fill();
  }

  update(time: any): void {
    // var {scale} = this.container;
    // this.container.x = this.stageWidth / 2 - this.stageWidth * scale / 2;
    this.resetHole();
  }

  dragObj(obj: any): void {
    obj.setInteractive()
    this.input.setDraggable(obj);
    obj.on("drag", (pointer: any,dragX: any, dragY: any)=>{
      obj.x = dragX;
      obj.y = dragY;
      listener.emit("view", obj);
    });
    obj.on('dragstart', (pointer:any)=>{
      this.curView = obj;
    });
    obj.on('dragend', (pointer:any)=>{
      // obj.clearTint();
      console.log(obj);
    });
  }

}
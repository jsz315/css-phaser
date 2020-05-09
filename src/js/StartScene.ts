import * as Phaser from 'phaser';
import listener from "./listener.js";

export class StartScene extends Phaser.Scene {
    gameTime: Number;
    constructor() {
        super({
            key: 'StartScene'
        })
        this.gameTime = 0;
    }

    init(params: any): void {
        console.log(params, 'init');
    }

    preload(): void {
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create(): void {
        var sky = this.add.sprite(400, 300, 'sky');
        console.log(sky);
        var red = this.add.image(100, 700, 'red');
        console.log(red);
        var logo = this.add.image(400, 100, 'logo');
        console.log(logo);

        // this.textures.addBase64('bg', blueSrc);
        console.log(this.textures, "this.textures");
    
       
        // sky.setInteractive()
        console.log(this, "this")
        // this.input.setDraggable(sky);
        // this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        //     console.log(pointer)
        //     gameObject.x = dragX
        //     gameObject.y = dragY
        // })

        this.dragObj(sky);
        this.dragObj(red);
        this.dragObj(logo);
    }

    update(time: any): void {
        // console.log(time);
        this.gameTime = time;
    }

    dragObj(obj:any): void{
        obj.setInteractive()
        this.input.setDraggable(obj);
        this.input.on('drag', (pointer:any, gameObject:any, dragX:any, dragY:any) => {
            // console.log(pointer)
            gameObject.x = dragX;
            gameObject.y = dragY;
            listener.emit("view", gameObject);
        })

        // scene.input.on('click')
    }

}
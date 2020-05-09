import Phaser from 'phaser'
import listener from "./listener.js";

import Tooler from './tooler.ts'
var tooler = new Tooler();
tooler.test();

function init(canvas){
    
    var config = {
        type: Phaser.CANVAS,
        // width: 800,
        // height: 600,
        canvas: canvas,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);
    console.log(game, 'game');

    listener.on("file", (img) => {
        console.log(this, "file");
        console.log(img, "img");
        var scene = game.scene.scenes[0];
        console.log(scene.textures, "textures");
        scene.textures.addBase64('bg', img);
        setTimeout(() => {
            scene.add.image(100, 400, 'bg');
        }, 3000);
    })

    listener.on("attr", (attr, num) => {
        console.log(attr, num);
    });

    function preload ()
    {
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    function create (){
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

        dragObj(sky, this);
        dragObj(red, this);
        dragObj(logo, this);

    }

    function dragObj(obj, scene){
        obj.setInteractive()
        scene.input.setDraggable(obj);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // console.log(pointer)
            gameObject.x = dragX;
            gameObject.y = dragY;
            listener.emit("view", gameObject);
        })

        // scene.input.on('click')
    }

    // function create0 ()
    // {
    //     this.add.image(400, 300, 'sky');

    //     var particles = this.add.particles('red');

    //     var emitter = particles.createEmitter({
    //         speed: 100,
    //         scale: { start: 1, end: 0 },
    //         blendMode: 'ADD'
    //     });

    //     var logo = this.physics.add.image(400, 100, 'logo');

    //     logo.setVelocity(100, 200);
    //     logo.setBounce(1, 1);
    //     logo.setCollideWorldBounds(true);

    //     emitter.startFollow(logo);
    // }
}


export default {
    init
}
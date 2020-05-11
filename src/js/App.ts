import * as Phaser from 'phaser'
import {StartScene} from './StartScene'

function init(canvas:HTMLCanvasElement){
    const config:Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        scene: [StartScene],
        canvas: canvas,
        backgroundColor: 0xffffff,
        width: 750,
        height: Math.floor(window.innerHeight * 0.84)
    }
    new Phaser.Game(config);
}

export default {init};

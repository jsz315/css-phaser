import * as Phaser from 'phaser'
import {StartScene} from './StartScene.ts'

function init(canvas:HTMLCanvasElement){
    const config:Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        scene: [StartScene],
        canvas: canvas,
        backgroundColor: 0xf0f0f0,
        width: 750,
        height: 600
    }
    new Phaser.Game(config);
}

export default {init};

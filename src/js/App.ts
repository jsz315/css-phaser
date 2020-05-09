import * as Phaser from 'phaser'
import {StartScene} from './StartScene.ts'

function init(canvas:HTMLCanvasElement){
    const config:Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        scene: [StartScene],
        canvas: canvas
    }
    new Phaser.Game(config);
}

export default {init};

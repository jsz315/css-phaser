import * as Phaser from 'phaser';
export class ViewFactory{

    static normal(obj:Phaser.GameObjects.Image | Phaser.GameObjects.Polygon | Phaser.GameObjects.Text){
        obj.setOrigin(0, 0);
        obj.setData("ratio", 1);
        // obj.setData("id", "id_" + Date.now());
        obj.name = "id_" + Date.now();
    }

    static makeImage(scene:Phaser.Scene, key:string):Phaser.GameObjects.Image{
        var img = scene.add.image(0, 0, key);
        ViewFactory.normal(img);
        img.setData("name", key);
        return img;
    }

    static makeStage(scene:Phaser.Scene, color:string, width:number, height:number):Phaser.GameObjects.Image{
        var key = 'stage_' + Date.now();
        var canvas = scene.textures.createCanvas(key, width, height);
        canvas.context.fillStyle = color;
        canvas.context.fillRect(0, 0, width, height);
        canvas.refresh();

        var background = scene.add.image(0, 0, key);
        ViewFactory.normal(background);
        return background;
    }

    static makeText(scene:Phaser.Scene, word:string, color:string = '#999999', size:number = 24, align:string = 'center'):Phaser.GameObjects.Text{
        var style = { font: size + "px PingFangSC-Semibold", fill: color, align: align };
        var text = scene.add.text(0, 0, word, style);
        ViewFactory.normal(text);
        text.setData("word", word);
        text.setData("color", color);
        text.setData("size", size);
        return text;
    }

    static makeRect(scene:Phaser.Scene, color:number, width:number, height:number):Phaser.GameObjects.Polygon{
        var points:any = [0,0, width,0, width,height, 0,height];
        var rect = scene.add.polygon(0, 0, points, color);
        ViewFactory.normal(rect);
        rect.setData("color", color);
        return rect;
    }
}
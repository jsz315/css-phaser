import * as Phaser from 'phaser';
export default class Tooler{
    static toColorNumber(num:string):number{
        return Number("0x" + num.replace("#", '000000').substr(-6));
    }

    static toColorString(num:number):string{
        return "#" + ("000000" + num.toString(16)).substr(-6);
    }

    static warpStyle(str:string):string{
      str = str.replace('}', '');
      str = str + '\n}';
      var list = str.split("\n");
      var start = false;
      for(var i = 1; i < list.length - 1; i++){
        list[i] = list[i].replace(/^\s/, "");
        if(list[i].match(/^\s*\./)){
          start = true;
        }
        if(start){
          list[i] = "  " + list[i];
        }
      }
      return list.join("\n");
    }

    static warpHtml(str:string):string{
      str = str.replace('</div>', '');
      str = str + '\n</div>';
      var list = str.split("\n");
      var start = false;
      for(var i = 1; i < list.length - 1; i++){
        list[i] = list[i].replace(/^\s/, "");
        if(list[i].match(/^\s*</)){
          start = true;
        }
        if(start){
          list[i] = "  " + list[i];
        }
      }
      return list.join("\n");
    }

    static getStyle(item:any):string{
      var space = "    ";
      var list = [];
      list.push(`.${item.name}{`);
      list.push(`${space}width: ${item.width * item.scaleX}px;`);
      list.push(`${space}height: ${item.height * item.scaleY}px;`);
      list.push(`${space}left: ${item.x}px;`);
      list.push(`${space}top: ${item.y}px;`);
      list.push(`${space}position: absolute;`);
      if(item.type == 'Polygon'){
        list.push(`${space}background: ${Tooler.toColorString(item.getData('color'))};`);
      }
      else if(item.type == 'Text'){
        list.push(`${space}color: ${Tooler.toColorString(item.getData('color'))};`);
        list.push(`${space}font-size: ${item.getData('size')}px;`);
      }
      else if(item.type == 'Image'){
        list.push(`${space}background: url(${item.name}) no-repeat center;`);
        list.push(`${space}background-size: contain;`);
      }
      list.push(`}`);
      return list.join("\n");
    }

    static getHtml(item:any):string{
      var list = [];
      list.push(`<div class=".${item.name}">`);
      if(item.type == 'Text'){
        list.push(`${item.getData('word')}`);
      }
      list.push(`</div>`);
      return list.join("");
    }
}



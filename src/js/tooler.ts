export default class Tooler{
    static toColorNumber(num:string):number{
        return Number("0x" + num.replace("#", '000000').substr(-6));
    }

    static toColorString(num:number):string{
        return "#" + ("000000" + num.toString(16)).substr(-6);
    }
}
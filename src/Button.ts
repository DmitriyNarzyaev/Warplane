import { TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Button extends Container {
    private readonly _callback:()=>void;
    private _buttonWidth:number = 170;
    private _buttonHeight:number = 60;

    constructor(buttonName:string, callback:()=>void = null) {
        super();
        this._callback = callback;
        this.initialButton(buttonName, callback);
    }

    private initialButton(buttonName:string, callback:any):void {       //FIXME: CALLBACK
        const button:PIXI.Graphics = new PIXI.Graphics;
        button.buttonMode = true;
        button.interactive = true;
        button
            .beginFill(0xfcdfc9, 1)
            .lineStyle(4, 0x58aec9)
            .drawRect(0, 0, this._buttonWidth, this._buttonHeight)

        this.addChild(button);

        let textStyle:TextStyle = new PIXI.TextStyle ({
            fontFamily: 'Arial',
            fontSize: 42,
            fontWeight: 'bold',
            fill: ['#58aec9'],
            lineHeight: 40,
        });

        const buttonText:PIXI.Text = new PIXI.Text (buttonName, textStyle);
        buttonText.x = (button.width - buttonText.width)/2;
        buttonText.y = (button.height - buttonText.height)/2;
        button.addChild(buttonText);

        if (callback) {
            button.addListener('pointertap', this.pointerTabHandler, this);
        }
    }

    private pointerTabHandler():void {
        this._callback();
    }
}

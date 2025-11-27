import { Sprite, TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Score_Menu extends Container {
    private _background: PIXI.Sprite;
    private _livesText:PIXI.Text;
    private _scoreText:PIXI.Text;
    private _textStyle:TextStyle = new PIXI.TextStyle ({
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        fill: ['#ffffff'],
        lineHeight: 40,
    });

    constructor(score:number) {
        super();
        this.initialBackground();
        this.livesPoint();
        this.scorePoint(score);
    }

    private initialBackground():void {
        this._background = Sprite.from("score-menu");
        this._background.x = 0;
        this._background.y = 0;
        this.addChild(this._background);
    }

    private livesPoint():void {
        this._livesText = new PIXI.Text (
            "Warplane                             ♥ ♥ ♥ ♥ ♥",
            this._textStyle
        );
        this._livesText.x = 15;
        this._livesText.y = 6;
        this.addChild(this._livesText);
    }

    private scorePoint(score:number):void {
        this._scoreText = new PIXI.Text (
            "SCORE:  " + score as any as string,
            this._textStyle
        );
        this._scoreText.x = 15;
        this._scoreText.y = 48;
        this.addChild(this._scoreText);
    }
}

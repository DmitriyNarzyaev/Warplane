import { Sprite, TextStyle } from "pixi.js";
import Container = PIXI.Container;

export default class Score_Menu extends Container {
    private _background: PIXI.Sprite;
    private _textStyle:TextStyle = new PIXI.TextStyle ({
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        fill: ['#ffffff'],
        lineHeight: 40,
    });

    constructor() {
        super();
        this.initialBackground();
        this.livesPointText();
        this.scoreText();
    }

    private initialBackground():void {
        this._background = Sprite.from("score-menu");
        this._background.x = 0;
        this._background.y = 0;
        this.addChild(this._background);
    }

    private livesPointText():void {
        const livesText:PIXI.Text = new PIXI.Text (
            "Warplane                             ♥ ♥ ♥ ♥ ♥",
            this._textStyle
        );
        livesText.x = 15;
        livesText.y = 6;
        this.addChild(livesText);
    }

    private scoreText():void {
        const scoreText:PIXI.Text = new PIXI.Text (
            "Score: 0",
            this._textStyle
        );
        scoreText.x = 15;
        scoreText.y = 48;
        this.addChild(scoreText);
    }
}

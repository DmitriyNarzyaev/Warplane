import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Start_Menu extends Container {
    public _background: PIXI.Sprite;

    constructor() {
        super();
        this.initialBackground();
    }

    private initialBackground():void {
        this._background = Sprite.from("title");
        this.addChild(this._background);
    }
}

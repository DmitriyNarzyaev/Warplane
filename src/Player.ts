import { Sprite } from "pixi.js";
import Container = PIXI.Container;

export default class Player extends Container {
    private _player: PIXI.Sprite;

    constructor() {
        super();
        this.initialPlayer();
    }

    private initialPlayer():void {
        this._player = Sprite.from("player");
        this._player.x = 0;
        this._player.y = 0;
        this.addChild(this._player);
    }
}

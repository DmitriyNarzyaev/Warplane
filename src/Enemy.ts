import Container = PIXI.Container;
import Main_Container from "./Main_Container";

export default class Enemy extends Container {
    public _enemyContainer:PIXI.Container;
    private _enemy: PIXI.Sprite;

    constructor(mapX:number, mapY:number, MapWidth:number, mapHeight:number) {
        super();
        this._enemyContainer = new PIXI.Container;
        this.addChild(this._enemyContainer);
        this.initialEnemy(mapX, mapY, MapWidth, mapHeight);
    }

    private initialEnemy(mapX:number, mapY:number, MapWidth:number, mapHeight:number):void {
        let enemyTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        enemyTexture.frame = new PIXI.Rectangle(mapX, mapY, MapWidth, mapHeight);
        this._enemy = new PIXI.Sprite(enemyTexture);
        this._enemy.anchor.set(0.5);
        this._enemy.x = 0;
        this._enemy.y = 0;
        this._enemyContainer.addChild(this._enemy);
        Main_Container._enemyArray.push(this._enemy);
        this._enemyContainer.x = this._enemy.width/2;
        this._enemyContainer.y = this._enemy.height/2;
    }
}

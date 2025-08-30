import Container = PIXI.Container;

export default class Enemy extends Container {
    public _anchorContainer:PIXI.Container;
    private readonly _enemy: PIXI.Sprite;
    public directionOfFlight:number = -.5 + Math.random();

    constructor(mapX:number, mapY:number, MapWidth:number, mapHeight:number) {
        super();

        this._anchorContainer = new PIXI.Container;
        this.addChild(this._anchorContainer);

        let enemyTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        enemyTexture.frame = new PIXI.Rectangle(mapX, mapY, MapWidth, mapHeight);
        this._enemy = new PIXI.Sprite(enemyTexture);
        this._enemy.anchor.set(0.5);
        this._enemy.x = 0;
        this._enemy.y = 0;
        this._anchorContainer.addChild(this._enemy);
        this._anchorContainer.x = this._enemy.width/2;
        this._anchorContainer.y = this._enemy.height/2;
    }
}

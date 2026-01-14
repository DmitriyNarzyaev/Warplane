import Container = PIXI.Container;

export default class Enemy extends Container {
    public _anchorContainer:PIXI.Container;
    private readonly _enemy: PIXI.Sprite;
    public directionOfFlight:number = -.25 + (Math.random()/2);

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

        let hitbox:PIXI.Graphics = new PIXI.Graphics;
        hitbox.beginFill(0xff0000, .0);
        hitbox.lineStyle(2, 0x000000);
        hitbox.drawRect(-MapWidth/2, -mapHeight/2, MapWidth, mapHeight);
        this._anchorContainer.addChild(hitbox);
    }
}

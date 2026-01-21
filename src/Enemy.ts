import Container = PIXI.Container;

export default class Enemy extends Container {
    public _anchorContainer:PIXI.Container;
    public directionOfFlight:number = -.25 + (Math.random()/2);
    public rocketFlame:PIXI.Sprite;
    public enemyType:string;
    private _enemy:PIXI.Sprite;
    private _mapX:number;
    private _mapY:number;
    private _mapWidth:number;
    private _mapHeight:number;

    constructor(type:string) {
        super();

        this._anchorContainer = new PIXI.Container;
        this.addChild(this._anchorContainer);

        this.initialMapCoordinates(type);
        this.initialEnemyTexture(type);

        if (type == "rocket") {
            this.enemyType = "rocket"
        }
    }

    private initialMapCoordinates(type:string):void {
        if (type == "plane"){
            this._mapX = 0;
            this._mapY = 251;
            this._mapWidth = 161;
            this._mapHeight = 200;
        } else if (type == "rocket"){
            this._mapX = 221;
            this._mapY = 251;
            this._mapWidth = 30;
            this._mapHeight = 62;
        }
    }

    private initialEnemyTexture(type:string):void {
        let enemyTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        enemyTexture.frame = new PIXI.Rectangle(this._mapX, this._mapY, this._mapWidth, this._mapHeight);
        this._enemy = new PIXI.Sprite(enemyTexture);
        this._enemy.anchor.set(0.5);
        this._enemy.x = 0;
        this._enemy.y = 0;
        this._anchorContainer.addChild(this._enemy);
        this._anchorContainer.x = this._enemy.width/2;
        this._anchorContainer.y = this._enemy.height/2;

        let hitbox:PIXI.Graphics = new PIXI.Graphics;
        hitbox.beginFill(0xff0000, 0);
        //hitbox.lineStyle(2, 0x000000);
        hitbox.drawRect(-this._mapWidth/2, -this._mapHeight/2, this._mapWidth, this._mapHeight);
        this._anchorContainer.addChild(hitbox);

        if (type == "rocket") {
            this.initialRocketFlame();
        }
    }

    private initialRocketFlame():void {
        let flameTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        flameTexture.frame = new PIXI.Rectangle(177, 250, 29, 80);
        this.rocketFlame = new PIXI.Sprite(flameTexture);
        this.rocketFlame.anchor.set(0, 1);
        this.rocketFlame.x = -14;
        this.rocketFlame.y = -40;
        this._anchorContainer.addChild(this.rocketFlame);
    }
}

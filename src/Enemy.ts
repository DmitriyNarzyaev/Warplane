import Container = PIXI.Container;

export default class Enemy extends Container {
    public directionOfFlight:number = -.25 + (Math.random()/2);
    public rocketFlame:PIXI.Sprite;
    public enemyType:string;
    public hitboxArray:PIXI.Graphics[] = [];
    private readonly _anchorContainer:PIXI.Container;
    private _enemy:PIXI.Sprite;
    private _mapX:number;
    private _mapY:number;
    private _mapWidth:number;
    private _mapHeight:number;

    constructor(type:string) {
        super();
        this.enemyType = type;

        this._anchorContainer = new PIXI.Container;
        this.addChild(this._anchorContainer);

        this.initialMapCoordinates(type);
        this.initialEnemyTexture(type);
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

        if (type == "rocket") {
            this.initialHitbox(0, 0, this._mapWidth, this._mapHeight);
            this.initialRocketFlame();
        }
        if (type == "plane") {
            this.initialHitbox(this._mapWidth/3, 0, this._mapWidth/3, this._mapHeight);
            this.initialHitbox(0, this._mapHeight/5, this._mapWidth/3, this._mapHeight/3);
            this.initialHitbox(this._mapWidth/1.5, this._mapHeight/5, this._mapWidth/3, this._mapHeight/3);
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

    private initialHitbox(hitX:number, hitY:number, hitWidth:number, hitHeight:number):void {
        let hitbox:PIXI.Graphics = new PIXI.Graphics;
        hitbox.beginFill(0xff0000, 0);
        hitbox.lineStyle(2, 0x000000);
        hitbox.drawRect(hitX, hitY, hitWidth, hitHeight);
        this.addChild(hitbox);
    }
}

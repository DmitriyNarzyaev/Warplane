import Container = PIXI.Container;

export default class Player extends Container {
    public playerContainer:PIXI.Container;
    public playerSpeed:number = 5;
    public hitboxArray:PIXI.Graphics[] = [];
    private static _player: PIXI.Sprite;
    private static _playerTexture:any;

    constructor() {
        super();
        this.playerContainer = new PIXI.Container;
        this.addChild(this.playerContainer);
        this.initialPlayer();
    }

    private initialPlayer():void {
        Player._playerTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        Player.straightMove();

        Player._player.anchor.set(0.5);
        Player._player.x = 0;
        Player._player.y = 0;
        this.playerContainer.addChild(Player._player);
        this.playerContainer.x = Player._player.width/2;
        this.playerContainer.y = Player._player.height/2;

        this.initialHitbox(Player._player.width/3, 0, Player._player.width/3, Player._player.height);
        this.initialHitbox(0, Player._player.height/1.8, Player._player.width/3, Player._player.height/4);
        this.initialHitbox(Player._player.width/1.5, Player._player.height/1.8, Player._player.width/3, Player._player.height/4);
    }

    private initialHitbox(hitX:number, hitY:number, hitWidth:number, hitHeight:number):void {
        let hitbox:PIXI.Graphics = new PIXI.Graphics;
        hitbox.beginFill(0xff0000, 0);
        hitbox.lineStyle(2, 0x000000);
        hitbox.drawRect(hitX, hitY, hitWidth, hitHeight);
        this.addChild(hitbox);
        this.hitboxArray.push(hitbox);
    }

    public static straightMove():void {
        Player._playerTexture.frame = new PIXI.Rectangle(0, 0, 159, 239);
        Player._player = new PIXI.Sprite(Player._playerTexture);
    }

    public static leftMove():void {
        this._playerTexture.frame = new PIXI.Rectangle(320, 0, 159, 239);
        this._player = new PIXI.Sprite(this._playerTexture);
    }

    public static rightMove():void {
        this._playerTexture.frame = new PIXI.Rectangle(160, 0, 159, 239);
        this._player = new PIXI.Sprite(this._playerTexture);
    }
}

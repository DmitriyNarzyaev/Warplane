import Container = PIXI.Container;

export default class Player extends Container {
    public _playerContainer:PIXI.Container;
    private static _player: PIXI.Sprite;
    private static _playerTexture:any;
    public _playerSpeed:number = 5;

    constructor() {
        super();

        this._playerContainer = new PIXI.Container;
        this.addChild(this._playerContainer);
        this.initialPlayer();
    }

    private initialPlayer():void {
        Player._playerTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        Player.straightMove();

        Player._player.anchor.set(0.5);
        Player._player.x = 0;
        Player._player.y = 0;
        this._playerContainer.addChild(Player._player);
        this._playerContainer.x = Player._player.width/2;
        this._playerContainer.y = Player._player.height/2;

        let hitbox:PIXI.Graphics = new PIXI.Graphics;
        hitbox.beginFill(0xff0000, 0);
        hitbox.lineStyle(2, 0x000000);
        hitbox.drawRect(-Player._player.width/2, -Player._player.height/2, Player._player.width, Player._player.height);
        this._playerContainer.addChild(hitbox);
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

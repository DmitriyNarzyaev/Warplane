import Container = PIXI.Container;

export default class Player extends Container {
    public _playerContainer:PIXI.Container;
    private static _player: PIXI.Sprite;
    private static _playerTexture:any;
    public static _propeller: PIXI.Sprite;
    public static _propellerTexture:any;
    public _playerSpeed:number = 3;

    constructor() {
        super();

        this._playerContainer = new PIXI.Container;
        this.addChild(this._playerContainer);

        this.initialPropeller();
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
    }

    public static straightMove():void {
        Player._playerTexture.frame = new PIXI.Rectangle(258, 0, 258, 239);
        Player._player = new PIXI.Sprite(Player._playerTexture);
        Player._propeller.x = 0;
        Player._propeller.rotation = 0;
    }

    public static leftMove():void {
        this._playerTexture.frame = new PIXI.Rectangle(516, 0, 258, 239);
        this._player = new PIXI.Sprite(this._playerTexture);
        Player._propeller.x = -10;
        Player._propeller.rotation = -.05;
    }

    public static rightMove():void {
        this._playerTexture.frame = new PIXI.Rectangle(0, 0, 258, 239);
        this._player = new PIXI.Sprite(this._playerTexture);
        Player._propeller.x = 10;
        Player._propeller.rotation = .05;
    }

    private initialPropeller():void {
        Player._propellerTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        Player._propellerTexture.frame = new PIXI.Rectangle(0, 240, 84, 5);
        Player._propeller = new PIXI.Sprite(Player._propellerTexture);
        Player._propeller.anchor.set(0.5, 1);
        Player._propeller.y -= 117;
        this._playerContainer.addChild(Player._propeller);
    }
}

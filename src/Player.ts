import Container = PIXI.Container;

export default class Player extends Container {
    public _playerContainer:PIXI.Container;
    public _player: PIXI.Sprite;
    public _playerTexture:any;
    public _playerSpeed:number = 3;

    constructor() {
        super();
        this.initialPlayer();
    }

    private initialPlayer():void {
        this._playerContainer = new PIXI.Container;
        this.addChild(this._playerContainer);

        this._playerTexture = new PIXI.Texture(PIXI.utils.TextureCache["player"]);
        this._playerTexture.frame = new PIXI.Rectangle(258, 0, 258, 240);
        this._player = new PIXI.Sprite(this._playerTexture);

        this._player.anchor.set(0.5);
        this._player.x = 0;
        this._player.y = 0;
        this._playerContainer.addChild(this._player);
        this._playerContainer.x = this._player.width/2;
        this._playerContainer.y = this._player.height/2;
    }
}

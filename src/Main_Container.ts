import Container = PIXI.Container;
import Start_Menu from "./Start_Menu";
import Button from "./Button";
import Score_Menu from "./Score_Menu";
import Player from "./Player";


export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = 1920;
	public static readonly WINDOW_HEIGHT:number = 1080;
	private readonly _startMenuContainer:PIXI.Container;
	private _startMenu:Start_Menu;
	private _button:Button;
	private _scoreMenu:Score_Menu;
	private _player:Player

	constructor() {
		super();
		this.pictureLoader();

		this._startMenuContainer = new PIXI.Container;
		this.addChild(this._startMenuContainer);
	}

	private pictureLoader():void {
		const picLoader:PIXI.Loader = new PIXI.Loader();
		picLoader
			.add("title", "title.jpg")
			.add("player", "player.png")
			.add("score-menu", "score-menu.png")

		picLoader.load(()=> {
			this.initialStartMenu("START");
		});
	}

	private initialStartMenu(buttonName:string):void {
		this._startMenu = new Start_Menu();
		this._startMenuContainer.addChild(this._startMenu);

		this._button = new Button(buttonName, () => {this.startProject();});
		this._button.x = (Main_Container.WINDOW_WIDTH - this._button.width)/2;
		this._button.y = Main_Container.WINDOW_HEIGHT/1.3;
		this._startMenuContainer.addChild(this._button);
	}

	private startProject():void {
		this.removeChild(this._startMenuContainer);
		this.initialBackground();
	}

	private initialBackground():void {
		let background:PIXI.Graphics = new PIXI.Graphics;
		background.beginFill(0x42AAFF);
		background.drawRect(0, 0, Main_Container.WINDOW_WIDTH, Main_Container.WINDOW_HEIGHT);
		background.interactive = true;
		this.addChild(background);

		this.initialScoreMenu();
		this.initialPlayer();
	}

	private initialScoreMenu():void {
		this._scoreMenu = new Score_Menu();
		this._scoreMenu.x = 20;
		this._scoreMenu.y = 10;
		this.addChild(this._scoreMenu);
	}

    private initialPlayer():void {
        this._player = new Player();
        this._player.x = (Main_Container.WINDOW_WIDTH - this._player.width)/2;
        this._player.y = Main_Container.WINDOW_HEIGHT / 1.2;
        this.addChild(this._player);
    }
}

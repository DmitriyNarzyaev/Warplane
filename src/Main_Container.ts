import Container = PIXI.Container;
import Start_Menu from "./Start_Menu";
import Button from "./Button";
import Score_Menu from "./Score_Menu";
import Player from "./Player";
import Enemy from "./Enemy";
import Key_Handler from "./Key_Handler";
import {Main} from "./Main";
import {Sprite} from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = 1920;
	public static readonly WINDOW_HEIGHT:number = 1080;
	public static jsonLoader:XMLHttpRequest;
	public static _enemyArray:Sprite[] = [];
	private readonly _startMenuContainer:PIXI.Container;
	private _startMenu:Start_Menu;
	private _button:Button;
	private _scoreMenu:Score_Menu;
	private _player:Player
	private _frameIterator:number = 0;
	private _level:ILevel;

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
			this.jsonLoader();
		});
	}

	private jsonLoader():void {
		Main_Container.jsonLoader = new XMLHttpRequest();
		Main_Container.jsonLoader.responseType = "json";

		Main_Container.jsonLoader.open("GET", "level1.json", true);
		Main_Container.jsonLoader.onreadystatechange = () => {
			this.initialStartMenu("START");
		};
		Main_Container.jsonLoader.send();
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
		this._level = Main_Container.jsonLoader.response;
		this.removeChild(this._startMenuContainer);
		this.initialBackground();
		this.initialScoreMenu();
		this.initialPlayer();

		window.addEventListener("keydown",
			(e:KeyboardEvent) => {
				Key_Handler.keyDownHandler(e);
			},);
		window.addEventListener("keyup",
			(e:KeyboardEvent) => {
				Key_Handler.keyUpHandler(e);
				Player.straightMove();
			},);
		Main.pixiApp.ticker.add(this.ticker, this);
	}

	private initialBackground():void {
		let background:PIXI.Graphics = new PIXI.Graphics;
		background.beginFill(0x42AAFF);
		background.drawRect(0, 0, Main_Container.WINDOW_WIDTH, Main_Container.WINDOW_HEIGHT);
		background.interactive = true;
		this.addChild(background);
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
        this._player.y = Main_Container.WINDOW_HEIGHT / 1.4;
        this.addChild(this._player);
    }

	private initialEnemy(mapX:number, mapY:number, MapWidth:number, mapHeight:number):void {
		let enemy:Enemy = new Enemy(mapX, mapY, MapWidth, mapHeight);
		enemy.x = 100;
		enemy.y = 100;
		this.addChild(enemy);
	}

	private ticker():void {
		if (Key_Handler.BUTTON_LEFT == true && Key_Handler.BUTTON_UP == false && Key_Handler.BUTTON_RIGHT == false && Key_Handler.BUTTON_DOWN == false) {
			this.leftMove(false);
		}else if (Key_Handler.BUTTON_UP == true && Key_Handler.BUTTON_RIGHT == false && Key_Handler.BUTTON_DOWN == false && Key_Handler.BUTTON_LEFT == false) {
			this.upMove(false);
		}else if (Key_Handler.BUTTON_RIGHT == true && Key_Handler.BUTTON_DOWN == false && Key_Handler.BUTTON_LEFT == false && Key_Handler.BUTTON_UP == false) {
			this.rightMove(false);
		}else if (Key_Handler.BUTTON_DOWN == true && Key_Handler.BUTTON_LEFT == false && Key_Handler.BUTTON_UP == false && Key_Handler.BUTTON_RIGHT == false) {
			this.downMove(false);
		}

		if (Key_Handler.BUTTON_LEFT == true && Key_Handler.BUTTON_UP == true && Key_Handler.BUTTON_RIGHT == false && Key_Handler.BUTTON_DOWN == false) {
			this.upMove(true);
			this.leftMove(true);
		}
		if (Key_Handler.BUTTON_UP == true && Key_Handler.BUTTON_RIGHT == true && Key_Handler.BUTTON_DOWN == false && Key_Handler.BUTTON_LEFT == false) {
			this.upMove(true);
			this.rightMove(true);
		}
		if (Key_Handler.BUTTON_DOWN == true && Key_Handler.BUTTON_LEFT == true && Key_Handler.BUTTON_UP == false && Key_Handler.BUTTON_RIGHT == false) {
			this.downMove(true);
			this.leftMove(true);
		}
		if (Key_Handler.BUTTON_RIGHT == true && Key_Handler.BUTTON_DOWN == true && Key_Handler.BUTTON_LEFT == false && Key_Handler.BUTTON_UP == false) {
			this.downMove(true);
			this.rightMove(true);
		}
		Player._propeller.alpha = Math.random();

		this._frameIterator ++;

		this._level.items.forEach((enemy)=> {
			if (this._frameIterator == enemy.time) {
				this.initialEnemy(
					enemy.mapX,
					enemy.mapY,
					enemy.mapWidth,
					enemy.mapHeight,
				);
			}
			for (let iterator:number = 0; iterator < Main_Container._enemyArray.length; iterator++) {
				let enemy:Sprite = Main_Container._enemyArray[iterator];
				enemy.y += this._level.items[iterator].speed;
			}
		});
	}

	private leftMove(diag:boolean):void{
		if (diag) {
			this._player.x -= this._player._playerSpeed / Math.sqrt(2);
		} else {
			this._player.x -= this._player._playerSpeed;
		}
		Player.leftMove();
	}

	private upMove(diag:boolean):void{
		if (diag) {
			this._player.y -= this._player._playerSpeed / Math.sqrt(2);
		} else {
			this._player.y -= this._player._playerSpeed;
		}
	}

	private rightMove(diag:boolean):void{
		if (diag) {
			this._player.x += this._player._playerSpeed / Math.sqrt(2);
		} else {
			this._player.x += this._player._playerSpeed;
		}
		Player.rightMove();
	}

	private downMove(diag:boolean):void{
		if (diag) {
			this._player.y += this._player._playerSpeed / Math.sqrt(2);
		} else {
			this._player.y += this._player._playerSpeed;
		}
	}
}

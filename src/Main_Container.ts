import Container = PIXI.Container;
import Start_Menu from "./Start_Menu";
import Button from "./Button";
import Score_Menu from "./Score_Menu";
import Player from "./Player";
import Enemy from "./Enemy";
import Key_Handler from "./Key_Handler";
import Global from "./Global";
import Collision_Checking from "./Collision_Checking";
import NoiseFilter = PIXI.filters.NoiseFilter;
import Background from "./Background";

export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = 1920;
	public static readonly WINDOW_HEIGHT:number = 1080;
	public static JSON_LOADER:XMLHttpRequest;
	private _enemyArray:Enemy[] = [];
	private _enemyContainer:PIXI.Container;
	private _startMenuContainer:PIXI.Container;
	private _startMenu:Start_Menu;
	private _button:Button;
	private _background:Background;
	private _scoreMenu:Score_Menu;
	private _player:Player
	private _frameIterator:number = 0;
	private _level:ILevel;
	private _scoreIterator:number = 0;
	private _score:number = 0;
	private pictureLoaderChecking:number = 0;
	private picLoader:PIXI.Loader

	constructor() {
		super();
		this.pictureLoader();
	}

	private pictureLoader():void {
		this.picLoader = new PIXI.Loader();
		this.picLoader
			.add("title", "title.jpg")
			.add("player", "player.png")
			.add("score-menu", "score-menu.png")
			.add("backgroundImg", "bg.jpeg")

		this.picLoader.load(()=> {
			this.jsonLoader();
		});
	}

	private jsonLoader():void {
		Main_Container.JSON_LOADER = new XMLHttpRequest();
		Main_Container.JSON_LOADER.responseType = "json";

		Main_Container.JSON_LOADER.open("GET", "level1.json", true);
		Main_Container.JSON_LOADER.onreadystatechange = () => {
			this.pictureLoaderChecking++;
			console.log(this.pictureLoaderChecking)
			if (this.pictureLoaderChecking == 3) {																//FIXME
				this.initialStartMenu("START");
			}
		};
		Main_Container.JSON_LOADER.send();
	}

	private initialStartMenu(buttonName:string):void {
		console.log("start menu");

		this._startMenuContainer = new PIXI.Container;
		this.addChild(this._startMenuContainer);
		this._startMenu = new Start_Menu();
		this._startMenuContainer.addChild(this._startMenu);

		this._button = new Button(buttonName, () => {this.startProject();});
		this._button.x = (Main_Container.WINDOW_WIDTH - this._button.width)/2;
		this._button.y = Main_Container.WINDOW_HEIGHT/1.3;
		this._startMenuContainer.addChild(this._button);
	}

	private startProject():void {
		this._level = Main_Container.JSON_LOADER.response;
		this.removeChild(this._startMenuContainer);
		this.startAll();
	}

	private startAll():void {
		this.initialBackground();
		this.initialScoreMenu();
		this.initialPlayer();
		this._enemyContainer = new PIXI.Container;
		this.addChild(this._enemyContainer);

		window.addEventListener("keydown",
			(e:KeyboardEvent) => {
				Key_Handler.keyDownHandler(e);
			},);
		window.addEventListener("keyup",
			(e:KeyboardEvent) => {
				Key_Handler.keyUpHandler(e);
				Player.straightMove();
			},);
		Global.PIXI_APP.ticker.add(this.ticker, this);
	}

	private removeProject():void {
		this._frameIterator = 0;
		this._scoreIterator = 0;
		this._score = 0;

		this.removeChild(this._player);
		this.removeChild(this._enemyContainer);
		this._enemyArray = [];
		this.removeChild(this._scoreMenu);
		this._scoreMenu = null;

		window.removeEventListener("keydown",
			(e:KeyboardEvent) => {
				Key_Handler.keyDownHandler(e);
			},);
		window.removeEventListener("keyup",
			(e:KeyboardEvent) => {
				Key_Handler.keyUpHandler(e);
				Player.straightMove();
			},);
		Global.PIXI_APP.ticker.remove(this.ticker, this);
	}

	private initialBackground():void {
		this._background = new Background(Main_Container.WINDOW_WIDTH, Main_Container.WINDOW_HEIGHT);
		this.addChild(this._background);
	}

	private initialScoreMenu():void {
		this._scoreMenu = new Score_Menu(this._score);
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

	private initialEnemy(mapX:number, mapY:number, MapWidth:number, mapHeight:number, appearanceX:number):void {
		let enemy:Enemy = new Enemy(mapX, mapY, MapWidth, mapHeight);
		enemy.x = appearanceX;
		enemy.y -= enemy.height;
		this._enemyContainer.addChild(enemy);
		this._enemyArray.push(enemy);
		console.log("000")
	}

	private ticker():void {
		this._background.y += .1

		if (Key_Handler.BUTTON_LEFT == true && Key_Handler.BUTTON_UP == false && Key_Handler.BUTTON_RIGHT == false && Key_Handler.BUTTON_DOWN == false
			&& this._player.x >= 0) {
			this.leftMove(false);
		}else if (Key_Handler.BUTTON_UP == true && Key_Handler.BUTTON_RIGHT == false && Key_Handler.BUTTON_DOWN == false && Key_Handler.BUTTON_LEFT == false
			&& this._player.y >= 0) {
			this.upMove(false);
		}else if (Key_Handler.BUTTON_RIGHT == true && Key_Handler.BUTTON_DOWN == false && Key_Handler.BUTTON_LEFT == false && Key_Handler.BUTTON_UP == false
			&& this._player.x <= Main_Container.WINDOW_WIDTH - this._player.width) {
			this.rightMove(false);
		}else if (Key_Handler.BUTTON_DOWN == true && Key_Handler.BUTTON_LEFT == false && Key_Handler.BUTTON_UP == false && Key_Handler.BUTTON_RIGHT == false
			&& this._player.y <= Main_Container.WINDOW_HEIGHT - this._player.height) {
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
					enemy.appearanceX,
				);
			}

			for (let iterator:number = 0; iterator < this._enemyArray.length; iterator++) {
				let arrayEnemy:Enemy = this._enemyArray[iterator];
				arrayEnemy.y += this._level.items[iterator].speed;
				arrayEnemy.x += arrayEnemy.directionOfFlight;
			}
		});

		this._enemyArray.forEach((enemy)=> {
			if (enemy.y >= Main_Container.WINDOW_HEIGHT-enemy.height/3) {								//удаление enemy
				this._enemyContainer.removeChild(enemy);
			}

			if (
				Collision_Checking.horizontal(this._player, enemy) &&
				Collision_Checking.vertical(this._player, enemy)
			){
				this.removeProject();
				this.initialStartMenu("RESTART");
			}
		});

		this._scoreIterator += 1;
		if (this._scoreIterator % 60 === 0) {
			this._score += 1;
			this.removeChild(this._scoreMenu);
			this.initialScoreMenu();
		}
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

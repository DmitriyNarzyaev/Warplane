import Container = PIXI.Container;
import Start_Menu from "./Start_Menu";
import Button from "./Button";
import Score_Menu from "./Score_Menu";
import Player from "./Player";
import Enemy from "./Enemy";
import Key_Handler from "./Key_Handler";
import Global from "./Global";
import Collision_Checking from "./Collision_Checking";
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
	private _displacementSprite:PIXI.Sprite;
	//private _displacementFilter:PIXI.filters.DisplacementFilter;
	private _scoreMenu:Score_Menu;
	private _player:Player
	private _frameIterator:number = 0;
	private _level:ILevel;
	private _score:number = 0;
	private pictureLoaderChecking:number = 0;
	private picLoader:PIXI.Loader
    private _objectSizeDecreaser:number = 1.5;

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
			//.add("displacement", "displacement.jpeg")

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
		//this.initialFilters();

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
		this._score = 0;
		this.removeChild(this._player);
		this.removeChild(this._displacementSprite);
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

	// private initialFilters():void {
	// 	this._displacementSprite = PIXI.Sprite.from("displacement.jpg");
	// 	this. _displacementFilter = new PIXI.filters.DisplacementFilter(this._displacementSprite);
	// 	this._displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	// 	this.addChild(this._displacementSprite);
	// }

	private initialScoreMenu():void {
		this._scoreMenu = new Score_Menu(this._score);
		this._scoreMenu.x = 20;
		this._scoreMenu.y = 10;
		this.addChild(this._scoreMenu);
	}

    private initialPlayer():void {
        this._player = new Player();
        this._player.width /= this._objectSizeDecreaser;
        this._player.height /= this._objectSizeDecreaser;
        this._player.x = (Main_Container.WINDOW_WIDTH - this._player.width)/2;
        this._player.y = Main_Container.WINDOW_HEIGHT / 1.4;
        this.addChild(this._player);
    }

	private initialEnemy(type:string, appearanceX:number):void {
		let enemy:Enemy = new Enemy(type);
		enemy.width /= this._objectSizeDecreaser;
		enemy.height /= this._objectSizeDecreaser;
		enemy.x = appearanceX;
		enemy.y -= enemy.height;
		this._enemyContainer.addChild(enemy);
		this._enemyArray.push(enemy);

		// if (type == "rocket") {
		// 	enemy.rocketFlame.filters = [this._displacementFilter];
		// }
	}
	private _test:number = 0
	private ticker():void {
		this._frameIterator ++;

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

		this._level.items.forEach((enemy)=> {
			if (this._frameIterator == enemy.time) {
				this.initialEnemy(
					enemy.type,
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
			if (enemy.enemyType == "rocket") {
				enemy.rocketFlame.height += Math.sin(this._frameIterator)*10;
			}

			if (enemy.y >= Main_Container.WINDOW_HEIGHT-enemy.height/3) {								//удаление enemy
				this._enemyContainer.removeChild(enemy);
			}

			// if (this._test == 0 &&
			// 	Collision_Checking.horizontal(this._player.hitbox, enemy.hitbox) &&
			// 	Collision_Checking.vertical(this._player.hitbox, enemy.hitbox)
			// ){
			// 	console.log("player hitbox x = " + this._player.hitbox.x)
			// 	console.log("player hitbox y = " + this._player.hitbox.y)
			// 	console.log("enemy hitbox x = " + enemy.hitbox.x)
			// 	console.log("enemy hitbox y = " + enemy.hitbox.y)
			// 	console.log("player hitbox width = " + this._player.hitbox.width)
			// 	console.log("player hitbox height = " + this._player.hitbox.height)
			// 	console.log("enemy hitbox width = " + enemy.hitbox.width)
			// 	console.log("enemy hitbox height = " + enemy.hitbox.height)
			// 	this._test = 1;
			// 	// this.removeProject();
			// 	// this.initialStartMenu("RESTART");
			// }
		});

		if (this._frameIterator % 60 === 0) {
			this._score += 1;
			this.removeChild(this._scoreMenu);
			this.initialScoreMenu();
		}
	}

	private leftMove(diag:boolean):void{
		if (this._player.x >= 0) {
			if (diag) {
				this._player.x -= this._player.playerSpeed / Math.sqrt(2);
			} else {
				this._player.x -= this._player.playerSpeed;
			}
			Player.leftMove();
		}
	}

	private upMove(diag:boolean):void{
		if (this._player.y >= 0) {
			if (diag) {
				this._player.y -= this._player.playerSpeed / Math.sqrt(2);
			} else {
				this._player.y -= this._player.playerSpeed;
			}
		}
	}

	private rightMove(diag:boolean):void{
		if (this._player.x <= Main_Container.WINDOW_WIDTH - this._player.width) {
			if (diag) {
				this._player.x += this._player.playerSpeed / Math.sqrt(2);
			} else {
				this._player.x += this._player.playerSpeed;
			}
			Player.rightMove();
		}
	}

	private downMove(diag:boolean):void{
		if (this._player.y <= Main_Container.WINDOW_HEIGHT - this._player.height) {
			if (diag) {
				this._player.y += this._player.playerSpeed / Math.sqrt(2);
			} else {
				this._player.y += this._player.playerSpeed;
			}
		}
	}
}

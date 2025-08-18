import Container = PIXI.Container;
import { Graphics } from "pixi.js";


export default class Main_Container extends Container {
	public static readonly WINDOW_WIDTH:number = window.innerWidth;
	public static readonly WINDOW_HEIGHT:number = window.innerHeight;

	constructor() {
		super();
		this.initialBackground();
	}

	private initialBackground():void {
		let background:PIXI.Graphics = new PIXI.Graphics;
		background.beginFill(0x42AAFF);
		background.drawRect(0, 0, Main_Container.WINDOW_WIDTH, Main_Container.WINDOW_HEIGHT);
		background.interactive = true;
		this.addChild(background);
	}
}

import { } from "pixi.js";
import Container = PIXI.Container;

export default class Key_Handler extends Container {
    public static BUTTON_LEFT:boolean = false;
    public static BUTTON_RIGHT:boolean = false;
    public static BUTTON_UP:boolean = false;
    public static BUTTON_DOWN:boolean = false;

    constructor() {
        super();
    }

    public static keyDownHandler(e:KeyboardEvent):void {
        if (e.code == "ArrowLeft") {
            Key_Handler.BUTTON_LEFT = true;
        }
        if (e.code == "ArrowRight") {
            this.BUTTON_RIGHT = true;
        }
        if (e.code == "ArrowUp") {
            this.BUTTON_UP = true;
        }
        if (e.code == "ArrowDown") {
            this.BUTTON_DOWN = true;
        }
    }

    public static keyUpHandler(e:KeyboardEvent):void {
        if (e.code == "ArrowLeft") {
            this.BUTTON_LEFT = false;
        }
        if (e.code == "ArrowRight") {
            this.BUTTON_RIGHT = false;
        }
        if (e.code == "ArrowUp") {
            this.BUTTON_UP = false;
        }
        if (e.code == "ArrowDown") {
            this.BUTTON_DOWN = false;
        }
    }
}

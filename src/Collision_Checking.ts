import { Container, IPoint, Point } from "pixi.js";

export default class Collision_Checking {

    public static horizontal(obj1:Container, obj2:Container):boolean {
        const obj1Left:number =  obj1.x;
        const obj1Right:number = obj1.x + obj1.width;
        const obj2Left:number = obj2.x;
        const obj2Right:number = obj2.x + obj2.width;
        return !(
            obj1Right <= obj2Left ||
            obj1Left >= obj2Right
        );
    }

    public static vertical(obj1:Container, obj2:Container):boolean {
        const obj1Top:number = obj1.y;
        const obj1Bottom:number = obj1.y + obj1.height;
        const obj2Top:number = obj2.y;
        const obj2Bottom:number = obj2.y + obj2.height;
        return !(
            obj1Bottom <= obj2Top ||
            obj1Top >= obj2Bottom
        );
    }
}

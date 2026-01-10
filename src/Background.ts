import Container = PIXI.Container;
import NoiseFilter = PIXI.filters.NoiseFilter;

export default class Background extends Container {
    private readonly _background:PIXI.Graphics;
    private readonly _noiseFilter:NoiseFilter;

    constructor(width:number, height:number) {
        super();

        this._background = new PIXI.Graphics;
        this._background.beginFill(0x04ade2);
        this._background.drawRect(0, 0, width, height);
        this.addChild(this._background);

        this._noiseFilter = new PIXI.filters.NoiseFilter(.2);
        this._background.filters = [this._noiseFilter];
        this._noiseFilter.noise = (.1);
    }
}

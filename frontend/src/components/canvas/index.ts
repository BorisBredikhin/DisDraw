export class DrawingCanvas {
    public readonly cnv: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(cnv: HTMLCanvasElement) {
        this.cnv = cnv
        cnv.height = cnv.clientHeight
        cnv.width  = cnv.clientWidth
        this.ctx = this.cnv.getContext('2d')!
    }

    public initiali1ze() {
        
    }
}
import { Cursor } from "../cursor"

export class DrawingCanvas {
    public readonly cnv: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private cursor: Cursor

    constructor(cnv: HTMLCanvasElement) {
        this.cnv = cnv
        cnv.height = cnv.clientHeight
        cnv.width  = cnv.clientWidth
        this.ctx = this.cnv.getContext('2d')!

        this.cursor = new Cursor(this.cnv.parentElement!)
    }

    public initiali1ze() {
        
    }
}
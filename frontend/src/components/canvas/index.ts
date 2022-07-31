import { Cursor } from "../cursor"
import { CursorMode, EightDirectionMode } from "../cursor/modes"

export class DrawingCanvas {
    public readonly cnv: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private cursor: Cursor
    private cursorMode: CursorMode

    constructor(cnv: HTMLCanvasElement) {
        this.cnv = cnv
        cnv.height = cnv.clientHeight
        cnv.width  = cnv.clientWidth

        this.ctx = this.cnv.getContext('2d')!
        this.ctx.strokeStyle = 'black'

        this.cursor = new Cursor(this.cnv.parentElement!, this.ctx)
        this.cursor.createElement()
        
        this.cursorMode = new EightDirectionMode(this.cursor)
        this.cursorMode.setup()
    }

    public initiali1ze() {
        
    }
}
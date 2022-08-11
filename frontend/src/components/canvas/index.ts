import { Cursor } from "../cursor"
import { CursorMode, EightDirectionMode, TurtleMode } from "../cursor/modes"
import { StatusBar } from "../status-bar"

export class DrawingCanvas {
    public readonly cnv: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private cursor: Cursor
    private cursorMode: CursorMode
    public readonly statusbar: StatusBar

    constructor(cnv: HTMLCanvasElement, statusbar: StatusBar) {
        this.cnv = cnv
        cnv.height = cnv.clientHeight
        cnv.width  = cnv.clientWidth

        this.ctx = this.cnv.getContext('2d')!
        this.ctx.strokeStyle = 'black'

        this.statusbar = statusbar
        this.cursor = new Cursor(this.cnv.parentElement!, this.ctx, this.statusbar)
        this.cursor.createElement()
        
        this.cursorMode = new EightDirectionMode(this.cursor, this.statusbar)
        this.cursorMode.setup()

        setInterval(()=>this.cursorMode.tick(), 200)
    }

    public initiali1ze() {
        
    }
}
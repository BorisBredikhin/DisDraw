import { Cursor } from "../cursor"
import { CursorMode, EightDirectionMode, TurtleMode } from "../cursor/modes"
import { StatusBar } from "../status-bar"

export class DrawingCanvas {
    public readonly cnv: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private cursor: Cursor
    private cursorMode: CursorMode
    public readonly statusbar: StatusBar
    private status: HTMLDivElement

    constructor(cnv: HTMLCanvasElement, statusbar: StatusBar) {
        this.cnv = cnv
        cnv.height = cnv.clientHeight
        cnv.width  = cnv.clientWidth

        this.ctx = this.cnv.getContext('2d')!
        this.ctx.strokeStyle = 'black'

        this.statusbar = statusbar
        this.status=this.statusbar.add()
        this.status.innerHTML =`
        <div id='color'></div>
        <button id='save'>Сохранить</button>
        `
        this.cursor = new Cursor(this.cnv.parentElement!, this.ctx, this.statusbar)
        this.cursor.createElement()
        
        this.cursorMode = new EightDirectionMode(this.cursor, this.statusbar)
        this.cursorMode.setup()

        let btnSave = document.getElementById('save') as HTMLButtonElement
        btnSave.addEventListener('click', (ev)=>{
            let link = document.createElement('a')
            link.download='canvas.png'
            link.href = this.cnv.toDataURL()
            link.click()
        })

        setInterval(()=>this.cursorMode.tick(), 200)
    }

    public initiali1ze() {
        
    }
}
import { StatusBar } from ".."
import { Point } from "../../geometry"

export class Cursor {
    private container: HTMLElement
    private element: HTMLDivElement | null = null
    private ctx: CanvasRenderingContext2D
    private position: Point = new Point(0, 0)
    private _down = false
    private statusElement: HTMLDivElement

    
    public get down() : boolean {
        return this._down;
    }
    public set down(v : boolean) {
        this.statusElement.innerHTML = v?"Опущено":"Поднято"
        this._down = v;
    }
    

    public readonly statusbar: StatusBar
    
    constructor(
        container: HTMLElement,
        ctx: CanvasRenderingContext2D, 
        statusbar: StatusBar
    ) {
        this.container = container
        this.ctx = ctx
        this.statusbar = statusbar
        this.statusElement = this.statusbar.add()
    }

    createElement() {
        this.element = document.createElement('div')
        this.element.classList.add('cursor')
        this.container.appendChild(this.element)

        this.toCenter()
    }

    toCenter() {
        this.moveTo(
            this.container.clientWidth / 2,
            this.container.scrollHeight / 2
        )
    }

    moveTo(x: number, y: number) {
        this.element!.style.setProperty('--x', `${x-5}px`)
        this.element!.style.setProperty('--y', `${y-5}px`);
        
        if (this.down) {
            this.ctx.beginPath()
            this.ctx.moveTo(this.position.x, this.position.y)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }

        this.position.x = x
        this.position.y = y
    }

    moveDelta(dx: number, dy: number) {
        this.moveTo(this.position.x + dx, this.position.y + dy)
    }

    rotate(angle: number){
        this.element?.style.setProperty('--angle', `${angle}rad`)
    }
}

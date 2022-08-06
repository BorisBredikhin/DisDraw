import { Cursor } from "."
import { StatusBar } from ".."

export abstract class CursorMode {
    protected cursor: Cursor
    private _listener: any
    public readonly statusbar: StatusBar
    protected _statusBarElement: HTMLDivElement

    constructor(cursor: Cursor, statusbar: StatusBar) {
        this.cursor = cursor
        this.statusbar = statusbar
        this._statusBarElement = statusbar.add()
    }

    public setup() {
        this._listener = (ev: KeyboardEvent)=>this.listener(ev)
        document.addEventListener('keydown', this._listener)
    }

    public remove() {
        document.removeEventListener('keydown', this._listener)
    }

    public abstract listener(ev: KeyboardEvent): void

    public tick() {}
}

export class EightDirectionMode extends CursorMode {
    public speed: number = 1

    public listener(ev: KeyboardEvent): void {
        switch (ev.code) {
            case 'Numpad1':
                this.cursor!.moveDelta(-this.speed,this.speed)
                break;
            case 'Numpad2':
                this.cursor!.moveDelta(0,this.speed)
                break;
            case 'Numpad3':
                this.cursor!.moveDelta(this.speed,this.speed)
                break;
            case 'Numpad4':
                this.cursor!.moveDelta(-this.speed,0)
                break;
            case 'Numpad5':
                this.cursor.down = !this.cursor.down
                break
            case 'Numpad6':
                this.cursor!.moveDelta(this.speed,0)
                break;
            case 'Numpad7':
                this.cursor!.moveDelta(-this.speed,-this.speed)
                break;
            case 'Numpad8':
                this.cursor!.moveDelta(0,-this.speed)
                break;
            case 'Numpad9':
                this.cursor!.moveDelta(this.speed,-this.speed)
                break;
            case 'NumpadAdd':
                ++this.speed
                break
            case 'NumpadSubtract':
                --this.speed
                break
            default:
                break;
        }
    }
}

export class TurtleMode extends CursorMode {
    public speedX: number = 0
    public speedY: number = 0
    public angle: number = 0
    public acclrX: number = 0
    public acclrY: number = 0
    public acclrAngle: number = 0

    public tick(): void {
        this.cursor.moveDelta(this.speedX*Math.cos(this.angle), this.speedY*Math.sin(this.angle))
        this.speedX += this.acclrX
        this.speedY += this.acclrY
        this.angle += this.acclrAngle
        this._statusBarElement.innerHTML = `Скорость: (${this.speedX}, ${this.speedY})<br>
        Ускорение: (${this.acclrX}, ${this.acclrY}), ${this.acclrAngle} rad<br>
        Угол: ${this.angle}`
    }

    public listener(ev: KeyboardEvent): void {
        switch (ev.code) {
            case 'Numpad2':
                this.speedX--
                this.speedY--
                break;
            case 'Numpad4':
                this.angle--
                break;
            case 'Numpad5':
                this.cursor.down = !this.cursor.down
                break
            case 'Numpad6':
                this.angle++
                break;
            case 'Numpad8':
                this.speedX++
                this.speedY++
                break
            case 'Numpad1':
                this.acclrAngle+=0.1
                break
            case 'Numpad3':
                this.acclrAngle-=0.1
                break
            case 'ArrowUp':
                this.acclrY++
                break
            case 'ArrowDown':
                this.acclrY--
                break
            case 'ArrowRight':
                this.acclrX++
                break
            case 'ArrowLeft':
                this.acclrX--
                break
            default:
                break;
        }
    }
}

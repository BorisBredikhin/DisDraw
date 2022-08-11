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
    private _speed: number = 1
    public get speed(): number {
        return this._speed
    }
    public set speed(value: number) {
        this._speed = value
        this._statusBarElement.innerHTML  = `Скорость: ${this.speed}`
    }

    constructor(cursor: Cursor, statusbar: StatusBar) {
        super(cursor, statusbar)

        this._statusBarElement.innerHTML = `Скорость: ${this.speed}`
    }

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
    public speedX: number = 1
    public speedY: number = 0
    public angle: number = 0
    public acclrX: number = 0
    public acclrY: number = 0
    public acclrAngle: number = 0

    public tick(): void {
        // return
        // this.cursor.moveDelta(this.speedX*Math.cos(this.angle), this.speedY*Math.sin(this.angle))
        // this.speedX += this.acclrX/100
        // this.speedY += this.acclrY/100
        // this.angle += this.acclrAngle
        this._statusBarElement.innerHTML = `Скорость: ${this.speedX}<br>
        Угол: ${this.angle}`
        this.cursor.rotate(this.angle)
    }

    public listener(ev: KeyboardEvent): void {
        switch (ev.code) {
            case 'Numpad2':
                this.cursor.moveDelta(-this.speedX*Math.cos(this.angle), -this.speedX*Math.sin(this.angle))
                break;
            case 'Numpad4':
                this.angle-=0.1
                break;
            case 'Numpad5':
                this.cursor.down = !this.cursor.down
                break
            case 'Numpad6':
                this.angle+=0.1
                break;
            case 'Numpad8':
                this.cursor.moveDelta(this.speedX*Math.cos(this.angle), this.speedX*Math.sin(this.angle))
                break
            default:
                break;
        }
    }
}

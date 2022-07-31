import { Cursor } from "."

export abstract class CursorMode {
    protected cursor: Cursor
    private _listener: any

    constructor(cursor: Cursor) {
        this.cursor = cursor
    }

    public setup() {
        this._listener = (ev: KeyboardEvent)=>this.listener(ev)
        document.addEventListener('keydown', this._listener)
    }

    public remoove() {
        document.removeEventListener('keydown', this._listener)
    }

    public abstract listener(ev: KeyboardEvent): void
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

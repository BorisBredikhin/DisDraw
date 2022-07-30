export class Cursor {
    private container: HTMLElement
    private element: HTMLDivElement | null = null

    constructor(container: HTMLElement) {
        this.container = container
        
        this.createElement()
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
        this.element!.style.setProperty('--x', `${x}px`)
        this.element!.style.setProperty('--y', `${y}px`)
    }
}

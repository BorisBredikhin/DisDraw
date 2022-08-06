export class StatusBar {
    public element: HTMLDivElement

    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add("status-bar")
    }

    public add() {
        let ne = document.createElement('div')
        this.element.appendChild(ne)
        return ne
    }
}
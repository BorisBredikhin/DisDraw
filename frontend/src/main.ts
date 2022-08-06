import { DrawingCanvas, StatusBar } from './components'
import './style.css'

const appRoot = document.querySelector<HTMLDivElement>('#app')!

const cnv = document.createElement('canvas')

appRoot.appendChild(cnv)

const statusBar = new StatusBar()
appRoot.appendChild(statusBar.element)

const drawingCanvas = new DrawingCanvas(cnv, statusBar)
drawingCanvas.initiali1ze()

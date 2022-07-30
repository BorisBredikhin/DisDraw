import { DrawingCanvas } from './components'
import './style.css'

const appRoot = document.querySelector<HTMLDivElement>('#app')!

const cnv = document.createElement('canvas')

appRoot.appendChild(cnv)

const drawingCanvas = new DrawingCanvas(cnv)
drawingCanvas.initiali1ze()

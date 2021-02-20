import React from 'react'
import useCanvas from './CanvasHook'


const Canvas = props => {
  const { draw } = props
  const canvas = useCanvas(draw)

  return (
    <canvas id="canvas" width='600' height='300' />
  )
}

export default Canvas
import { useEffect } from 'react'

const useCanvas = (draw) => {

  let canvas;
  

  useEffect(() => {

    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    
    
    const render = ctx => {
      
      
      draw(ctx);
      
      
      
    }
    render(context)

    
  })

  return canvas
}

export default useCanvas
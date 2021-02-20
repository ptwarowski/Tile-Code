import React from 'react'
import useCanvas from './useCanvas'

export const Canvas = props => {  
  
  const { draw, ...rest } = props
  const canvasRef = useCanvas(draw)
  
  return <canvas ref={canvasRef} {...rest}/>
}




// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import Canvas from './Canvas'

// export const drawPlan = () => {

//     const [x, setX] = useState(0);    
//     const [y, setY] = useState(0); 

//     function handleClick(){
//         setX = document.getElementById("x").value;
//         setY = document.getElementById("y").value;
//         context.beginPath();
//         context.strokeStyle="#FF0000";
//         context.lineTo(x,y);
//         context.moveTo(x,y);
//         context.stroke();
//     }
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');
// return (
// <>    

// <Canvas width="1300" height="800" id="myCanvas"></Canvas>

// <input type="number" id="x" onChange={()=>handleClick(x)}>Podaj X</input>
// <input type="number" id="y" onChange={()=>handleClick(y)}>Podaj Y</input>


// <h1>Draw a Line</h1>


// </>
// )
// }
// ReactDOM.render(<drawPlan/>, document.getElementById("app"));
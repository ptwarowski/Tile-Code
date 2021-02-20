import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import Canvas from "./canvas";

let xCount = 0;
let yCount =0;
let xOffset = 0;
let yOffset =0;

function App() {
  const [plan, setPlan] = useState('M0 0');
  const [co_ordinates, setCo_ordinates] = useState([]);

  const handleChange = () => {
    const $wallLenght = document.getElementById("wallLenght");
    
    if (event.target.name==="buttonUp") {event.preventDefault(); yCount -= parseInt($wallLenght.value)}
    if (event.target.name==="buttonDown") {event.preventDefault(); yCount += parseInt($wallLenght.value)}
    if (event.target.name==="buttonLeft") {event.preventDefault(); xCount -= parseInt($wallLenght.value)}
    if (event.target.name==="buttonRight") {event.preventDefault(); xCount += parseInt($wallLenght.value)};
    if (xOffset > xCount) {xOffset=xCount};
    if (yOffset > yCount) {yOffset=yCount};
    setPlan((prevState)=>prevState + ` L${xCount} ${yCount}`)
    
  }
  
  const handleUndo = () => {
    let lastIndex = plan.lastIndexOf('L');
    console.log(lastIndex);
    setPlan((prevState)=>prevState.slice(-lastIndex));
  };

  const handleDone = () => {
    setPlan((prevState)=>prevState + ` Z`)
  };

  console.log(plan);

  const draw = (ctx) => {
    ctx.save();
    ctx.translate(30,30);
    let floorPath= new Path2D(plan);
    ctx.strokeStyle = 'black';
    ctx.fillStyle="gainsboro";
    floorPath.lineWidth = 5;
    ctx.stroke(floorPath);
    ctx.restore();
    // ctx.fill() 
  }
  
  return (
    <>
    
    <svg className="planSVG" viewBox={`${xOffset-10} ${yOffset-10} 800 400`} style={{padding:20, width:800}} ><path  d={plan}  stroke="black"
    strokeWidth="3" fill="none" /></svg>
    <br></br>
    <button type="submit" name= "buttonUp" className = "upPlanButton" onClick={handleChange}>{"^"}</button>
    <br></br>
    <button type="submit" name= "buttonLeft" className = "leftPlanButton" onClick={handleChange}>{"<"}</button>
    <input id="wallLenght" type="number" placeholder="podaj długość"></input>
    <button type="submit" name= "buttonRight" className = "rightPlanButton" onClick={handleChange}>{">"}</button>
    <br></br>
    <button type="submit" name= "buttonDown" className = "downPlanButton" onClick={handleChange}>{"v"}</button>
    <br></br>
    <button type="submit" name= "undo" className = "undoButton" onClick={()=>handleUndo}>undo</button>
    <button name= "closePlan" className = "closePlanButton" onClick={handleDone}>done</button>
    </>)
}

ReactDom.render (<App/>, document.getElementById("root"))
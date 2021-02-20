import React, { useState } from "react";
import ReactDom from "react-dom";


let xCount = 0;
let yCount =0;
let xOffset = 0;
let yOffset =0;
let svgFill = 'none';
let svgStroke = 1;

function App() {
  const [plan, setPlan] = useState(['M 0 0']);
  const svgViewBox=`${xOffset-10} ${yOffset-10} 800 400`;
  
  
  const handleChange = () => {
    const $wallLenght = document.getElementById("wallLenght");
    
    if (event.target.name==="buttonUp") {event.preventDefault(); yCount -= parseInt($wallLenght.value)}
    if (event.target.name==="buttonDown") {event.preventDefault(); yCount += parseInt($wallLenght.value)}
    if (event.target.name==="buttonLeft") {event.preventDefault(); xCount -= parseInt($wallLenght.value)}
    if (event.target.name==="buttonRight") {event.preventDefault(); xCount += parseInt($wallLenght.value)};
    if (xOffset > xCount) {xOffset=xCount};
    if (yOffset > yCount) {yOffset=yCount};
    setPlan((prevState)=>[...prevState, ` L ${xCount} ${yCount}`])
    
  }
  
  const handleUndo = () => {
    plan.pop();
    let lastItem = plan[plan.length-1];
    xCount=parseInt(lastItem.split(' ')[2]);
    yCount=parseInt(lastItem.split(' ')[3]);
    setPlan((prevState)=>[...prevState]);
  };

  const handleDone = () => {
    setPlan((prevState)=>prevState + ` Z`);
    svgFill = "gainsboro";
    svgStroke = 3;
  };

  console.log(plan);
  
  return (
    <>
    
    <svg className="planSVG" viewBox={svgViewBox} style={{padding:20, width:800}} >
      <path  d={plan}  stroke="black" strokeWidth={svgStroke} fill={svgFill} />
    </svg>
    <br></br>
    <button type="submit" name= "buttonUp" className = "upPlanButton" onClick={handleChange}>
      {"^"}
    </button>
    <br></br>
    <button type="submit" name= "buttonLeft" className = "leftPlanButton" onClick={handleChange}>
      {"<"}
    </button>
    <input id="wallLenght" type="number" placeholder="podaj długość"></input>
    <button type="submit" name= "buttonRight" className = "rightPlanButton" onClick={handleChange}>
      {">"}
    </button>
    <br></br>
    <button type="submit" name= "buttonDown" className = "downPlanButton" onClick={handleChange}>
      {"v"}
    </button>
    <br></br>
    <button type="submit" name= "undo" className = "undoButton" onClick={handleUndo}>
      undo
    </button>
    <button name= "closePlan" className = "closePlanButton" onClick={handleDone}>
      done
    </button>
    </>)
}

ReactDom.render (<App/>, document.getElementById("root"))
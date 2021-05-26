import "../scss/app.scss";

import ReactDOM from "react-dom";
import React, { useState } from "react";

let svgViewBox = `-80 -80 600 420`
let svgFill = "gainsboro";
let svgStroke = 6;
let displaySVG = false;
let lengthArray = [];
let xGap = 20;
let startXArr = [];
let maxXDivArr = [];
let maxYDivArr = [];

let restArray = [];
let unusedArray = [];
let lastArray = [];

let tile = {
id: '',
name: '',
width: 0,
height: 0,
stroke: '',
color: '',
};

let svgFillArr = [];
let svgStroke2 = 1;
let svgViewBox2 = `0 -310 200 330`
let startPathArr = [];
let wallsSVG = [];
let wallPathArr=[];
let wallXArr = [];
let wallYArr = [];
let modArray = [];
let dwArray = [];

const myStorage = window.localStorage;

let modelObjectArr = [];
let tileObjectArr = [];
let positionArr = [[95, 0], [0, 0], [71, 0], [0, 0], [79, 0], [34, 0]];

const Form = () => {
const [line, setLine] = useState([]);
const [valueSVG, setValueSVG] = useState('');
const [wallNumber, setWallNumber] = useState(0);
const [change, setChange]=useState(false);

const options = [];
const optionsTile = [];
modelObjectArr = [];
tileObjectArr = [];

const getMaxYDiv = (svgArray, wallYArr, maxYDivArr) => {
  for (let i = 0; i<svgArray.length; i++) {
    wallYArr=[...wallYArr, []]
  for (let j = 0; j<svgArray[i].length; j++) {
    svgArray[i][j]=svgArray[i][j].split(' ')
    svgArray[i][j]=[parseInt(svgArray[i][j][0])-startXArr[i],parseInt(svgArray[i][j][1])];
    wallYArr[i].push(Math.abs(svgArray[i][j][1]))
  }
  svgArray[i]=[[0, 0], [lengthArray[i], 0],...svgArray[i]]
  wallYArr[i].sort((a,b)=>b-a);
  maxYDivArr[i]=Math.floor(wallYArr[i][0]/tile.height)
  }
}

const getMaxXDiv = (svgArray, wallXArr, maxXDivArr) => {
  for (let i = 0; i<svgArray.length; i++) {
    wallXArr=[...wallXArr, []]
    for (let j = 0; j<svgArray[i].length; j++) {    
      wallXArr[i].push(Math.abs(svgArray[i][j][0]))
    } 
  wallXArr[i].sort((a,b)=>b-a);
  maxXDivArr[i]=Math.floor((wallXArr[i][0]-positionArr[i][0])/tile.width)
  }
}
// max Div after positionning

const svgReducer = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = array[i].length-2; j > 0; j--)
    ((array[i][j][0] === array[i][j+1][0] & array[i][j][1] === array[i][j+1][1]))  && (array[i].splice(j,2), j = array[i].length-1);
  (array[i][array[i].length-1][0] == 0 & array[i][array[i].length-1][1] == 0) && array[i].pop();
  };
  

}
// reducing repeting points of SVG and end [0, 0]

for (let i=0; i<myStorage.length; i++) {   
    let label = myStorage.key(i);   
    if (label[0] == "O") {
      let option = {ID: label, value: modelObjectArr.length};
      options.push(option);
      modelObjectArr = [...modelObjectArr, JSON.parse(myStorage[myStorage.key(i)])]
    }  
  };

for (let i=0; i<myStorage.length; i++)
  {      
    let label = myStorage.key(i);
       
    if (label[0] == "T") {
      let option = {ID: label, value: tileObjectArr.length};
      optionsTile.push(option);
      tileObjectArr = [...tileObjectArr, JSON.parse(myStorage[myStorage.key(i)])]
    }
    
  };

const restSorter = (array) => {
  array.sort((a,b)=> a - b)
}

const onSVGPlanChange = (e) => {
  setValueSVG(modelObjectArr[e.target.value].planSVG);
  setWallNumber(0);
  setLine([]);
  
  let svgArray=[];
  let array = [];
  
 
  displaySVG=true;
  startPathArr=[];
  wallPathArr=[];
  maxYDivArr=[];
  

  startXArr=[...modelObjectArr[e.target.value].startXArr];
    
  lengthArray=[...modelObjectArr[e.target.value].lengthArray];

  wallsSVG=[...modelObjectArr[e.target.value].wallsSVG];
    
  setLine([...modelObjectArr[e.target.value].lineArray]);
  
  svgViewBox2 = `0 -330 ${lengthArray[0]} 360`
  
  
  for (let i=0; i<lengthArray.length; i++){
  array.push(wallsSVG[i].join(""));
  svgArray.push(array[i].substring(3));
  svgArray[i] = svgArray[i].substring(0, svgArray[i].length-2);
  svgArray[i] = svgArray[i].split(" L ");
  }
  
  getMaxYDiv(svgArray, wallYArr, maxYDivArr);

  getMaxXDiv(svgArray, wallXArr, maxXDivArr)
  
  e.preventDefault()
}


const onTileChange= (e) => {  
  maxYDivArr=[];

  tile = {

  ...tile,

  id: tileObjectArr[e.target.value].ID,
  
  name: tileObjectArr[e.target.value].name,
  
  width: parseInt(tileObjectArr[e.target.value].width),

  height: parseInt(tileObjectArr[e.target.value].height),
  
  stroke: tileObjectArr[e.target.value].stroke,
  
  color: tileObjectArr[e.target.value].color

  }
  
  setChange(p=>!p);
  
  let array=[];
  let svgArray=[];
  let yCutArray = [];
  let xCutArray = [];
  let xCutEndArray = [];
  let xyCutArray = [];
  let xyCutEndArray = [];

  for (let i=0; i<lengthArray.length; i++) {
    array.push(wallsSVG[i].join(""));
    svgArray.push(array[i].substring(3));
    svgArray[i] = svgArray[i].substring(0, svgArray[i].length-2);
    svgArray[i] = svgArray[i].split(" L ");
  }
  
  getMaxYDiv(svgArray, wallYArr, maxYDivArr);

  getMaxXDiv(svgArray, wallXArr, maxXDivArr);

  

  const xCut = () => {
    let nSVGArray = JSON.parse(JSON.stringify(svgArray));
    let arr = [];

    xCutArray = JSON.parse(JSON.stringify(svgArray));
    xCutEndArray = JSON.parse(JSON.stringify(svgArray));
    
    for (let i = 0; i < xCutArray.length; i++) {
      xCutArray[i].map(item => (item[0] > positionArr[i][0]) && (item[0] = positionArr[i][0]));   
      xCutEndArray[i].map(item => (item[0] = item[0] - positionArr[i][0] - maxXDivArr[i]*tile.width));   
      nSVGArray[i].map(item => (item[0] = item[0] - positionArr[i][0]));
      nSVGArray[i].map(item => (item[0] < 0) && (item[0] = 0));
      nSVGArray[i].map(item => (item[0] >= maxXDivArr[i]*tile.width) && (item[0] = maxXDivArr[i]*tile.width));
      xCutEndArray[i].map(item => (item[0] < 0) && (item[0] = 0));   
    };

    svgArray = nSVGArray;

    arr=[];
    for (let i = 0; i < nSVGArray.length; i++) {
      arr[i] = nSVGArray[i].filter(item => item[0] == 0);
    };

    for (let i = nSVGArray.length - 1; i >= 0; i--) {
      arr[i].length == nSVGArray[i].length && nSVGArray.splice(i, 1);   
    };  

    arr=[];
    for (let i = 0; i < xCutArray.length; i++) {
    arr[i] = xCutArray[i].filter(item => item[0] == 0);
    };
  
    for (let i = xCutArray.length - 1; i >= 0; i--) {
    arr[i].length == xCutArray[i].length && xCutArray.splice(i, 1);   
    };
  
    arr=[];
    for (let i = 0; i < xCutEndArray.length; i++) {
      arr[i] = xCutEndArray[i].filter(item => item[0] == 0);
    };

    for (let i = xCutEndArray.length - 1; i >= 0; i--) {
      arr[i].length == xCutEndArray[i].length && xCutEndArray.splice(i, 1);   
    };

    svgReducer(xCutArray);
    svgReducer(xCutEndArray);
    
  };
  
//bez ścinek szerokości, zostają w (xCutArray, xCutEndArray)
let modYCutArray = [];


  const yCut = (array) => {

    yCutArray = JSON.parse(JSON.stringify(array));

    for (let i = 0; i < maxYDivArr[0]; i++) {
      for (let j = 0; j < array.length; j++) {
        array[j].map(item => (item[1] < -tile.height) && (item[1] = -tile.height));      
        yCutArray[j].map(item => (item[1] < -tile.height) && (item[1] = item[1] + parseInt(tile.height)));       
      };
      modArray = [...modArray, ...array];
      
    }; 
    
    

    modYCutArray = [...modYCutArray, ...yCutArray];
    
    for (let i = 0; i < modYCutArray.length; i++) {
      for (let j = 0; j < modYCutArray[i].length; j++) {
      (modYCutArray[i][j][1] == -tile.height) && (modYCutArray[i][j][1] = 0)
      };
    }

    for (let i = modYCutArray.length - 1; i >= 0; i--) {
      (modYCutArray[i].length < 4) && modYCutArray.splice(i, 1)
    };

    svgReducer(yCutArray);

    

    console.log('yCutArray', yCutArray)
  };


  const yxCut = () =>{
    
    let nSVGArray = JSON.parse(JSON.stringify(yCutArray));
    xyCutArray = JSON.parse(JSON.stringify(yCutArray));
    xyCutEndArray = JSON.parse(JSON.stringify(yCutArray));
    let arr = [];

    for (let i=0; i<xyCutArray.length; i++) {
      xyCutArray[i].map(item => (item[0] > positionArr[i][0]) && (item[0] = positionArr[i][0]));   
      xyCutEndArray[i].map(item => (item[0] = item[0] - positionArr[i][0] - maxXDivArr[i]*tile.width));   
      nSVGArray[i].map(item => (item[0] = item[0] - positionArr[i][0]));
      nSVGArray[i].map(item => (item[0] < 0) && (item[0] = 0));
      nSVGArray[i].map(item => (item[0] >= maxXDivArr[i]*tile.width) && (item[0] = maxXDivArr[i]*tile.width));
      xyCutEndArray[i].map(item => (item[0] < 0) && (item[0] = 0));   
    };
    
    arr=[];
    for (let i = 0; i < xyCutArray.length; i++) {
    arr[i] = xyCutArray[i].filter(item => item[0] == 0);
    };
  
    for (let i = xyCutArray.length - 1; i >= 0; i--) {
    arr[i].length == xyCutArray[i].length && xyCutArray.splice(i, 1);   
    };
  

    arr=[];
    for (let i = 0; i < xyCutEndArray.length; i++) {
      arr[i] = xyCutEndArray[i].filter(item => item[0] == 0);
    };

    for (let i = xyCutEndArray.length - 1; i >= 0; i--) {
      arr[i].length == xyCutEndArray[i].length && xCutEndArray.splice(i, 1);   
    };

    svgReducer(xyCutArray);
    svgReducer(xyCutEndArray);


  };
  
  //bez ścinek z wysokości, zostają w (yCutArray)



const yCutSorter = () => {
  
  let cornerArray= [] ;
  let arr=[];
  
  for (let i = 0; i < modYCutArray.length; i++) {
    arr.push(modYCutArray[i][2])
  };

  console.log('modYCutArray', modYCutArray)
  console.log('arr', arr)
  for (let i = 0; i < arr.length; i++) {
    (arr[i][0] % tile.height !== 0) && cornerArray.push(arr[i]);
    
  };
  for (let i = arr.length - 1; i > 0; i--) {
    (arr[i][0] % tile.height !== 0) && arr.splice(i, 1)
  };
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] / tile.height !== 1) {arr.push([arr[i][0] - tile.height, arr[i][1]]); arr[i][0] = parseInt(tile.height); }
  };
  
  for (let i = 0 ; i < arr.length; i++) {
    unusedArray.push(parseInt(tile.height) + parseInt(arr[i][1]));
    lastArray.push(parseInt(tile.height));
  }
  

  let sortedCornerArray = cornerArray.sort((a, b) => a[0] - b[0]);
  
  const cutReduction = (array, number) => {
    for (let i = 0 ; i < array.length; i++) {
      for (let j = array.length - 1; j > 0; j--) {
        
        if (array[i][0] + array[j][0] <= number) {
          restArray.push(number);
          unusedArray.push(parseInt(tile.height) + parseInt(arr[i][1]));
          array.splice(j, 1); 
          array.splice(i, 1); 
          i = 0;
          j = array.length - 1;
        }
      }
    }
  }
  
  cutReduction(sortedCornerArray, tile.height);


  console.log('unused', unusedArray)
  
  


  console.log('xx', arr);
  console.log('xxx', sortedCornerArray);
  };



  xCut();
  yCut(svgArray);  
  yCut(xCutArray); 
  yCut(xCutEndArray);     
  yCutArray.length > 2 && yxCut();
  yCutArray.length > 2 && yCutSorter();
  
  console.log('myca', modYCutArray);
  

  modArray.map(item=>{
    let x = 1;
    if (item[item.length-1][0] == 0 & item[item.length-1][1] == 0 & x == 1) {
      item.pop();
      x = 1;
    } else {
      x = 0 
    }   
  });
  
  //usuwanie [0,0] z końca zamknięcia

  dwArray = modArray.filter(item => item.length > 6);// podział na ściany i ściany z otworami
  modArray = modArray.filter(item => item.length <= 6);

  for (let i =0 ; i<modArray.length; i++) {
    lastArray.push(modArray[i][1][0])
  };
  
  restArray = lastArray.filter(item=>item % tile.width !== 0);
  lastArray = lastArray.filter(item=>item % tile.width == 0);
  
  let arr = dwArray.filter(item => item[0] == 0 | item[0] == -tile.height);

  // sprawdzanie otworu 1

 
  
  for (let i=0; i<dwArray.length; i++) {
      restArray.push(Math.abs(dwArray[i][5][0])); 
      restArray.push(Math.abs(dwArray[i][1][0] - dwArray[i][7][0])); 
      // lastArray = [...lastArray, Math.floor((dwArray[i][3]-dwArray[i][7])/tile.width)*tile.width, Math.floor((dwArray[i][3]-dwArray[i][7])/tile.width)*tile.width],
      // restArray = [...restArray, dwArray[i][5]%tile.width,  (dwArray[i][3] - dwArray[i][7]%tile.width)]  
  }; 

  for (let i=restArray.length-1; i>=0; i--) {
    restArray[i]>tile.width && (
    lastArray.push(tile.width*Math.floor(restArray[i]/tile.width)),
    restArray[i]= restArray[i]-tile.width*Math.floor(restArray[i]/tile.width)
    )
  };
  // console.log('lastArray', lastArray);
  // console.log('restArray', restArray);

  restSorter(restArray);
  restSorter(unusedArray);

  

  e.preventDefault();
}
console.log('rA', restArray);
console.log('uA', unusedArray);


console.log('rA', restArray);

for (let i = 0 ; i < restArray.length; i++) {
    for (let j = restArray.length - 1; j > 0; j--) {        
      if (restArray[i] + restArray[j] <= tile.width) { 
        lastArray.push(parseInt(tile.width));
        restArray.splice(j, 1); 
        restArray.splice(i, 1); 
        i = 0;
        j = restArray.length;
      }
    }
  }

if (tile.height == tile.width) {
for (let i = restArray.length - 1; i > 0; i--) {
  for (let j = unusedArray.length - 1; j > 0; j--) {        
    if (restArray[i] < unusedArray[j]) { 
      console.log('rA', restArray);
      console.log('uA', unusedArray);
      unusedArray.splice(j, 1); 
      restArray.splice(i, 1); 
      }
    }
  }
}

console.log('rA', restArray);

for (let i = 0; i < restArray.length; i++) {
  lastArray.push(parseInt(tile.width))
}




lastArray.map(item => parseInt(item))
console.log(lastArray)
let amount = lastArray.reduce((total, item)=> total + item, 0)/tile.width

console.log(amount)

const handleLeftWallBtn = () => {
  
  const nWallNumber = wallNumber -1;   
  
  if (nWallNumber === -1) {
    setWallNumber(line.length-1);
    svgViewBox2 = `${startXArr[lengthArray.length-1]} -330 ${lengthArray[line.length-1]} 360`    
  } else {
    setWallNumber(nWallNumber);
    svgViewBox2 = `${startXArr[nWallNumber]} -330 ${lengthArray[nWallNumber]} 360` 
  }
}

const handleRightWallBtn = () => {
  const nWallNumber = wallNumber + 1;  
    if (nWallNumber === line.length) {
      setWallNumber(0);
      svgViewBox2 = `${startXArr[0]} -330 ${lengthArray[0]} 360` 
      
    } else {
      setWallNumber(nWallNumber);
      svgViewBox2 = `${startXArr[nWallNumber]} -330 ${lengthArray[nWallNumber]} 360` 
    }
}

const miniSVG = (displaySVG) => {if (displaySVG)  return (
    <svg className="planMiniSVG" viewBox={svgViewBox} style={{width:150, height:300}} >
        <path id="planPath" d={valueSVG}  stroke="black" strokeWidth={svgStroke} fill={svgFill} />
        <defs>
          <filter id="f1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="20" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        
        <path id="planStrong" d={line[wallNumber]}  stroke="goldenrod" strokeWidth={3*svgStroke} filter="url(#f1)"/>
    </svg>
)}


function drawWallsSVG(displaySVG) {

  startPathArr=[];
  wallPathArr=[];

  let z;
    for (z=0; z<lengthArray.length; z++) {
    svgFillArr.push('none');
  };

  let i;
  for (i=1; i<lengthArray.length+1; i++) {
        
    startPathArr=[...startPathArr, <path key={i-1} id={`startWallPath${i-1}`} d={`M ${startXArr[i-1]} 0 L ${lengthArray[i-1]+startXArr[i-1]} 0`}  stroke="goldenrod" strokeWidth={svgStroke2} fill={svgFillArr[wallNumber]} filter="url(#f1)" />];
      
    wallPathArr=[...wallPathArr, <path key={i-1} id={`wallPath${i-1}`} d={`M ${startXArr[i-1]} 0 L ${lengthArray[i-1]+startXArr[i-1]} 0 ${wallsSVG[i-1].join(' ')}`}  stroke='black' strokeWidth={svgStroke2} fill="url(#tile)"/>];
        
  };
  
if (displaySVG) {
    return (
      <>
        <button className="leftWallBtn" onClick={(e)=>handleLeftWallBtn(e)}></button>
        <button className="rightWallBtn" onClick={(e)=>handleRightWallBtn(e)}></button>
        <svg className="planSVG" viewBox={svgViewBox2} style={{width:600, height:300, border: '1px solid #eee'}} >
        <defs>
          
          <linearGradient id="gradient" x1="0%" y1="0%" x2="50%" y2="0%">
            <stop offset="0%" style={{stopColor: tile.color, stopOpacity:0.95 }} />
            <stop offset="50%" style={{stopColor: tile.color, stopOpacity:0.9}} />
            <stop offset="60%" style={{stopColor: tile.color, stopOpacity:1}} />
          </linearGradient>
          <pattern id="tile" patternUnits="userSpaceOnUse" x={startXArr[wallNumber]+positionArr[wallNumber][0]} y={-positionArr[wallNumber][1]} width={tile.width} height={tile.height}>
          
            <rect id="element" x="0" y="0" width={tile.width} height={tile.height} stroke={tile.stroke} strokeWidth="0.3" fill="url(#gradient)" />
          
          </pattern>
        
          <filter id="f1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="20" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        {startPathArr}
        {wallPathArr}
        
        </svg>
      </>
    )
  }
}


return (
<>
  <div className="selectBox"> 
  <div id="modelInput" className="modelInput">
  
    <form>
      <h2>Select Plan:</h2>
      <select onChange={onSVGPlanChange}>
        <option disabled selected value> -- Select Plan -- </option>
          {options.map((item) => <option key={item.ID} value={item.value} >{item.ID}</option>)}
      </select>
    </form> 
  </div>
  <div id="tileInput" className="tileInput">
    <form>
      <h2>Select Tile:</h2>
      <select onChange={onTileChange}>
        <option disabled selected value> -- Select Tile -- </option>
        {optionsTile.map((item) => <option key={item.ID} value={item.value} >{item.ID}</option>)}
      </select>
    </form> 
  </div>
  </div> 
  <div className='planBox'>
    {miniSVG(displaySVG)}
       
    {drawWallsSVG(displaySVG, wallNumber)}
  </div>

</>
    )
}

ReactDOM.render(<Form/>, document.getElementById("root"));
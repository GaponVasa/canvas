let canvasBody = document.getElementById("canvas");
let ctx = canvasBody.getContext('2d');
let windowWidth = canvasBody.width = window.innerWidth;
let windowHeight = canvasBody.height = window.innerHeight;
let size = 5;
let random;
let startDistance = size;
const TWO_PI = 2 * Math.PI;
let part = 1.5 * size;
let posX = 0;
let setCircles = [];
let tick = 0;
let partTick = 2;



let createCirle = ()=>{
  let randomX = 0, randomY = 0;
  while(randomX <= size || randomX >= windowWidth - size){
    randomX = randomeMaxToMin(windowWidth, size);
  }
  while(randomY <= size || randomY >= windowHeight - size){
    randomY = randomeMaxToMin(windowHeight, size);
  }
  // console.log("size", size);
  // console.log("windowWidth", windowWidth);
  // console.log("randomX", randomX);
  // console.log("windowHeight", windowHeight);
  // console.log("randomY", randomY);
  setCircles.push({
    posX: randomX,
    posY: randomY,
    directionX: randomDirection(),
    directionY: randomDirection()
  })
}

let randomeMaxToMin = (max, min)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let randomDirection = ()=>{
  let direction = Math.random() < 0.5 ? (Math.random() < 0.5 ? -1 : 0) : 1;
  return direction;
}


let animate = ()=>{
  window.requestAnimationFrame(animate);
  step();
}

let step = () =>{
  tick++;
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  //ctx.fillStyle = "rgb(0, 0, 0, 0)";
  //ctx.save();
  ctx.fillRect(0, 0, windowWidth, windowHeight);
  setCircles.forEach(el => {
    if(el.directionX !== 0){
      el.posX = el.posX + (partTick * el.directionX);
      if(el.posX <= size || el.posX >= windowWidth - size){
        el.directionX = el.directionX * (-1);
      }
    }
    if(el.directionY !== 0){
      el.posY = el.posY + (partTick * el.directionY);
      if(el.posY <= size || el.posY >= windowHeight - size){
        el.directionY = el.directionY * (-1);
      }
    }
    ctx.beginPath();
    ctx.arc(el.posX, el.posY, size/2, 0, TWO_PI);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    if(tick % 200 === 0){
      el.directionX = randomDirection();
      el.directionY = randomDirection();
    }
    //console.log("el.posX ",el.posX, "el.posY ", el.posY );
  });  
  // ctx.fillStyle = "white";
  // ctx.fill();
}
for(let i = 0; i < 10; i++){
  createCirle();
}

animate();
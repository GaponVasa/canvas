let canvasBody = document.getElementById("canvas");
let ctx = canvasBody.getContext('2d');
let windowWidth = canvasBody.width = window.innerWidth;
let windowHeight = canvasBody.height = window.innerHeight;
let size = 15;
let arrayColors = [
  "red",
  "green",
  "gray",
  "brown",
  "violet",
  "tan",
  "teal",
  "SpringGreen",
  "SkyBlue",
  "Sienna",
  "plum",
  "pink",
  "PaleVioletRed",
  "OrangeRed",
  "orange",
  "navy",
  "lime",
  "indigo",
  "gold",
  "cyan"
];
let random, randomColor;
let startDistance = size;
const TWO_PI = 2 * Math.PI;
let part = 1.5 * size;

for(let i = startDistance; i < windowWidth; i += part){
  for(let j = startDistance; j < windowHeight; j += part){
    random = Math.floor(Math.random() * arrayColors.length);
    randomColor = arrayColors[random];
    ctx.beginPath();
    ctx.arc(i, j, size/2, 0, TWO_PI);                
    ctx.fillStyle = randomColor;
    ctx.fill();
  }
}

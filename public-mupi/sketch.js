const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, {
  path: '/real-time'
});
console.log('Server IP: ', NGROK);

class HappyMeal {
  constructor() {
    this.x = 200;
    this.y = 1200;
  }
}

class Ronald {
  constructor() {
    this.x = (Math.random() * 600) + 100;
    this.y = 0;
  }
  show() {
    fill(255, 0, 0);
    this.y += 3;
  }
}

class Thief {
  constructor() {
    this.x = (Math.random() * 600) + 100;
    this.y = 0;
  }
  show() {
    fill(255, 0, 255);
    this.y += 3;
  }
}

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;

let screen = 1
let mupiScreen = 4;
let screenMupi

let ronalds = [];
let thiefs = [];

let wHeight
let wWidth

let mupiImages = [];

let character = {
  x: 0,
  y: 0
};


function mupiLoadImages() {
  mupiImages[0] = loadImage('img/0.mupi.jpg');
  mupiImages[1] = loadImage('img/1.mupi.jpg');
  mupiImages[2] = loadImage('img/2.mupi.jpg');
  mupiImages[3] = loadImage('img/3.mupi.jpg');
  mupiImages[4] = loadImage('img/backg.png');
  mupiImages[5] = loadImage('img/5.mupi.jpg');
  mupiImages[6] = loadImage('img/6.mupi.jpg');
  mupiImages[7] = loadImage('img/box.png');
  mupiImages[8] = loadImage('img/bad.png');
  mupiImages[9] = loadImage('img/good.png');
}

function preload() {
  mupiLoadImages();
}

let happyMeal = new HappyMeal();

function setup() {
  createCanvas(960, 1440)
  background(0)
  frameRate(60);

  controllerX = wWidth / 2;
  controllerY = wHeight / 2;
  mupiWidth = wWidth;
  mupiHeight = wHeight;
  background(0);
}

function score(number){
  score+=number;
}

function substractScore(number){
  score-=number;
}

function validateCollisionRondald(){
  ronalds.forEach((ronalds,i) => {
    if(dist(ronalds.x, ronalds.y, controllerX, wHeight-400) <40){
      ronalds.splice(i,1);
      score(10);
    
    }});
  }
    
    

/////////
/* TO DO: 
 function validateCollisionRondald(){}
 function validateCollisionThief(){}
 function score(number){}
 function substractScore(){}
 function lostRonalds(){} 
 */
////////
function draw() {
  background(0);
   //newCursor(pmouseX, pmouseY);
  switch (mupiScreen) {
    case 0: // Pantalla inicial mupi 1
      image(mupiImages[0], 0, 0, 960, 1440);
      break;
    case 1: // Pantalla inicial mupi 2
      image(mupiImages[1], 0, 0, 960, 1440);
      break;
    case 2: // Pantalla misión
      image(mupiImages[2], 0, 0, 960, 1440);
      break;
    case 3: // Escoger personaje 
      image(mupiImages[3], 0, 0, 960, 1440);
      break;



    case 4: // Pantalla de Juego
      imageMode(CORNER);
      if (frameCount % 200 == 0) {
        ronalds.push(new Ronald()); //add splice
      }

      if (frameCount % 280 == 0) {
        thiefs.push(new Thief()); //add splice
      }
      image(mupiImages[4], 0, 0, wWidth, wHeight);
      imageMode(CENTER);
      image(mupiImages[7], controllerX, mupiHeight - 400, 270, 337);
     // image(mupiImages[7], 480, 900, 270, 337);

      imageMode(CORNER);
     // image(mupiImages[8], 0, 480, 158, 163);

      imageMode(CORNER);
    //  image(mupiImages[9], 400, 0, 158, 163);

      image(mupiImages[7], happyMeal.x, happyMeal.y, 200, 250)

      ronalds.forEach(element => {
        element.show();
        image(mupiImages[8], element.x, element.y, 100, 100);
      });
      thiefs.forEach(element => {
        element.show();
        image(mupiImages[9], element.x, element.y, 100, 100);
      })
      break;
    case 5: // Pantalla de puntos / recollecion de datos
      image(mupiImages[5], 0, 0, 960, 1440);
      break;
    case 6: // Pantalla thanks for playing
      image(mupiImages[6], 0, 0, 960, 1440);
      break;
    default:
      break;
  }
}

/////////////
/*


*/


/////////////////
socket.on('mupi-instructions', instructions => {

  let {
    interactions
  } = instructions;
  switch (interactions) {
    case 2:
      let {
        rotationX, rotationY, rotationZ
      } = instructions;
      console.log(" " + rotationX + " " + rotationY);
      controllerX = (rotationX * mupiHeight) / 90;
      break;
  }
});


socket.on('mupi-size', deviceSize => {
  let {
    wWidth,
    wHeight
  } = deviceSize;
  deviceWidth = wWidth;
  deviceHeight = wHeight;
  console.log(`User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`);

  
});


function windowResized() {
  resizeCanvas(wWidth, wHeight);
}
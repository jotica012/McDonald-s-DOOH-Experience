const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;

let screen = 1
let mupiScreen = 0;
let screenMupi

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
  mupiImages[4] = loadImage('img/4.mupi.jpg');
  mupiImages[5] = loadImage('img/5.mupi.jpg');  
  mupiImages[6] = loadImage('img/6.mupi.jpg');
  mupiImages[7] = loadImage('img/personaje1.png'); 
  mupiImages[8] = loadImage('img/enemy1.png');  
  mupiImages[9] = loadImage('img/top1.png');      
}

function preload () {
  mupiLoadImages();
}

function setup() {
  createCanvas(788,1067)
    background(0)
    frameRate(60);
  
    
    controllerX = wWidth / 2;
    controllerY = wHeight / 2;
    mupiWidth = wWidth;
    mupiHeight = wHeight;
    background(0);
}

function draw() {
    background(0);
   imageMode(CORNER);
         image(mupiImages[4], 0, 0, 960, 1440);
         imageMode(CENTER);
          image(mupiImages[7], controllerX, mupiHeight-400, 253, 411);
          
          imageMode(CORNER);
          image(mupiImages[8], 0, 480, 203, 203);
          
          imageMode(CORNER);
          image(mupiImages[9], 400, 0, 177, 244);
}


socket.on('mupi-instructions', instructions => {

  let { interactions } = instructions;
  switch (interactions) {
      case 2:
        console.log(" " + rotationX + " " + rotationY);
          let { rotationX, rotationY, rotationZ } = instructions;
          controllerY = (rotationX * mupiHeight) / 90;
          controllerX = (rotationY * mupiWidth) / 90;
          break;
  }
});


 socket.on('mupi-size', deviceSize => {
    let { wWidth, wHeight } = deviceSize;
    deviceWidth = wWidth;
    deviceHeight = wHeight;
    console.log(`User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`);
  
   // mupiScreen=2
});


  function windowResized() {
    resizeCanvas(wWidth, wHeight);
}


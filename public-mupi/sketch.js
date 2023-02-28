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
  mupiImages[0] = loadImage('./public-mupi/img/0.mupi.jpg');
  mupiImages[1] = loadImage('./public-mupi/img/1.mupi.jpg');
  mupiImages[2] = loadImage('./public-mupi/img/2.mupi.jpg');
  mupiImages[3] = loadImage('./public-mupi/img/3.mupi.jpg');
  mupiImages[4] = loadImage('./public-mupi/img/4.mupi.jpg');
  mupiImages[5] = loadImage('./public-mupi/img/5.mupi.jpg');  
  mupiImages[6] = loadImage('./public-mupi/img/6.mupi.jpg');
  mupiImages[7] = loadImage('./public-mupi/img/personaje1.png'); 
  mupiImages[8] = loadImage('./public-mupi/img/enemy1.png');  
  mupiImages[9] = loadImage('./public-mupi/img/top1.png');      
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
    background(255);
   /*imageMode(CORNER);
          image(mupiImages[4], 0, 0, 960, 1440);
          imageMode(CENTER);
          image(mupiImages[7], controllerX, wHeight-400, 253, 411);
          
          imageMode(CORNER);
          image(mupiImages[8], 0, 480, 203, 203);
          
          imageMode(CORNER);
          image(mupiImages[9], 400, 0, 177, 244);*/
          console.log(mupiImages[4])


  
}


socket.on('mupi-instructions', instructions => {

  let { interactions } = instructions;
  switch (interactions) {
      case 2:
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


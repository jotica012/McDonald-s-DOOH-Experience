const NGROK = `https://${window.location.hostname}`;
alert( NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;
let interactions = 2;
let isTouched = false;

let wHeight = screen.height;
let wWidth = screen.width;

let imageFiles = [];
let mobileScreen = 2;



function loadMobileImages() {
    imageFiles[0] = loadImage('img/control1.jpg');
    imageFiles[1] = loadImage('img/control2.jpg');
    imageFiles[2] = loadImage('img/control3.jpg');
    imageFiles[3] = loadImage('img/datauser.jpg');
    imageFiles[4] = loadImage('img/prize.jpg');
}

function preload () {
    loadMobileImages();
}

function setup() {
    frameRate(60);
    createCanvas(428, 926);

    controllerX = wWidth / 2;
    controllerY = wHeight / 2;
    background(2,3,4);
    angleMode(DEGREES);
   
    socket.emit('device-size', {wWidth,wHeight});

    let btn = createButton("Permitir movimiento");
    btn.mousePressed(function () {
        DeviceOrientationEvent.requestPermission();
    });	
    btn.position(100,100);
}
    

function draw() {
    background(0);
   
  
    switch (mobileScreen) {
        case 0:
            image(imageFiles[0], 30, 0, 395, 853);
           break;
           case 1:
            image(imageFiles[1], 30, 250, 700, 330);
            break;
            case 2:
                image(imageFiles[2], 30, 250, 700, 330);
                break;   
            case 3:
                image(imageFiles[3], 30, 0, 395, 853);
                break;  
            case 4:
                image(imageFiles[4], 30, 0, 395, 853);
                break;
}

       
}

function deviceMoved() {
    switch (interactions) {
        case 2:
            socket.emit('mobile-instructions', { interactions, rotationX, rotationY, rotationZ });
            background(0, 255, 0);
            break;
    } 
}



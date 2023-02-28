const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;
let interactions = 2;
let isTouched = false;

let wHeight
let wWidth

let imageFiles = [];
let mobileScreen = 3;

function setup() {
    frameRate(60);
    createCanvas(428, 926);

    controllerX = wWidth / 2;
    controllerY = wHeight / 2;
    background(0);
    angleMode(DEGREES);

    socket.emit('device-size', {wWidth,wHeight});
    
	}
    

function draw() {
    background(0);
    image(imageFiles[3], 30, 0, 395, 853);
       
}

function deviceMoved() {
    switch (interactions) {
        case 2:
            socket.emit('mobile-instructions', { interactions, rotationY, rotationZ });
            background(0, 255, 0);
            break;
    } 
}



function loadMobileImages() {
    imageFiles[0] = loadImage('img/control1.jpg');
    imageFiles[1] = loadImage('img/control2.jpg');
    imageFiles[2] = loadImage('img/control3.jpg');
    imageFiles[3] = loadImage('img/datauser.jpg');
    imageFiles[4] = loadImage('img/prize.jpg');
}
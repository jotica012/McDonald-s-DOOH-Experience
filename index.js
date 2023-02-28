//const express = require('express');
//const { Server } = require('socket.io');
import express from 'express';
import {Server} from 'socket.io';
const PORT = 5080; 
const SERVER_IP = '192.168.68.110 '; //Reemplazar IP U: 172.30.65.245..

const app = express();
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

const httpServer = app.listen(PORT, () => {
    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});

const io = new Server(httpServer, { path: '/real-time' });

io.on('connection', socket => {
    console.log(socket.id);

   socket.on('device-size', deviceSize => {
        socket.broadcast.emit('mupi-size', deviceSize);
    });

    socket.on('mobile-instructions', instructions => {
        console.log(instructions);
        socket.broadcast.emit('mupi-instructions', instructions);
    })

});


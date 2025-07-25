"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8081 });
let userCount = 0;
let allSockets = [];
// no methods in ws, so writing connection code once is enough
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount += 1;
    console.log("user connected #", userCount);
    socket.on("message", (message) => {
        console.log("message received : ", message.toString());
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s.send(message.toString() + ": sent from the server");
        }
    });
});

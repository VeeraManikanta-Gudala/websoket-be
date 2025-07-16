import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port:8081});

// we can optimize this by using objects, but I personally want to use interface
interface User{
    socket:WebSocket,
    roomId:String
}
let allSockets:User[] = [];

// no methods in ws, so writing connection code once is enough
//the ssocket is the type of websocket so for typescript we use that webSOcket type.

wss.on("connection",(socket) => {

    socket.on("message",(message) =>{
        // @ts-ignore
        const parsedMessage = JSON.parse(message)

        if(parsedMessage.type =="join"){
            allSockets.push({socket, roomId:parsedMessage.payload.roomId})
        }
        if(parsedMessage.type == "chat"){
            console.log("user wants to chat");
            let currentUserRoom = null;
            for(let i = 0 ; i < allSockets.length;i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom  = allSockets[i].roomId; 
                }
            }
            for(let i = 0; i<allSockets.length;i++){
                if(allSockets[i].roomId == currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }
            
        }
        // console.log("message received : ", message.toString());
        // for(let i = 0; i < allSockets.length ; i++){
        //     const s = allSockets[i];

        //     s.send(message.toString() + ": sent from the server")
        // }
    })
    //removing all the disconnectes sockets from the global array
    socket.on("disconnect",() =>{
        allSockets = allSockets.filter(x=>x.socket!=socket)
    })
    
})
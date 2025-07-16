
## User
1. joining a room

type : join 
payload: {
    roomId : 123
    name : vmr
}

2. sending a message

type: chat
paload: {
    message : "Hello there"
}

## server

message broadcasting.

type : chat,
paload : {
    message : "Hello"
}
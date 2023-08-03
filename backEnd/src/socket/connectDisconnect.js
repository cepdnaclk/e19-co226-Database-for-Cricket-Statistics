const mainController = require("../controller/mainController");

function connected(socket,io){
    mainController(io);
    console.log(`User Connected: ${socket.id}`);
};

function disconnected(socket){
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
};

module.exports =  {connected, disconnected};
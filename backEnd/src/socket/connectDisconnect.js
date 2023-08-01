
function connected(socket){
    console.log(`User Connected: ${socket.id}`);
};

function disconnected(socket){
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
};

module.exports =  {connected, disconnected};
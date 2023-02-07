module.exports = function(app, obj){

    const io = app.io;
    var counting = 0;
    var currentSockets = [];

    io.on("connection", function(socket){
        
        console.log("New connection " + socket.id);
        currentSockets.push(socket.id);
        io.sockets.emit("server-send-all-current_sockets", {arr:currentSockets});

        socket.on("disconnect", function(){
            console.log(socket.id + " has been disconnected!");
            currentSockets = currentSockets.filter(function(item) {
                return item !== socket.id;
            });
            io.sockets.emit("server-send-all-current_sockets", {arr:currentSockets});
        });

        socket.on("client_send_to_server_1", function(data){
            console.log(socket.id + " has sent: " + JSON.stringify(data));

            // Bắn cho tất cả clients (Toàn server) 
            //io.sockets.emit("server-send-to-all-clients", {message:data.message});

            // server emit to SENDER
            //socket.emit("server-send-to-all-clients", {message:data.message});

            // server emit to nhung nguoi khác cùng sv (ngoại trừ SENDER)
            //socket.broadcast.emit("server-send-to-all-clients", {message:data.message})
            
            io.to(data.receiver).emit("server-send-to-all-clients", {message:data.message})
            
        });

    });

    app.get("/", function(req, res){
        res.render("home", {params:obj});
    });

    // timeCounting();

    // function timeCounting(){
    //     counting = counting + 1;
    //     console.log(counting);

    //     io.sockets.emit("server-send-counting", {time:counting});

    //     setTimeout(()=>{
    //         timeCounting();
    //     }, 1000);
    // }
    
}
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
app.io = io;
server.listen(3000);

var fs = require("fs");
fs.readFile("./config.json", "utf8", function(err, data){
    if(err){
        console.log("Load config file error!");
    }else{
        var obj = JSON.parse(data);
        require("./routes/main")(app, obj);
    }
});
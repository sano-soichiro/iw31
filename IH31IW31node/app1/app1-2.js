"use strict";
const http = require("http");
const app = http.createServer();
app.on("request" , function(req , res){
    res.writeHead(200 , {"Content-Type": "text/plain"});
    res.write("Hello Node1-2!!!");
    res.end();
});
app.listen(9000 , function(){
    console.log("サーバー起動:"+9000+"　ポート監視中");
});
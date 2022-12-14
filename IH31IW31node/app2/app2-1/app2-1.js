"use strict";
var routeResponseMap={
    "/":"./views/index.html",
    "/page1":"./views/page1.html"
}
var port = 9000;
var http = require("http");
var fs = require("fs");
var app = http.createServer();
app.on("request" , function(request , response){
    if(routeResponseMap[request.url]){
        response.writeHead(200,{"Content-Type": "text/html"});
        fs.readFile(routeResponseMap[request.url],
            function(error , data){
                response.write(data);
                response.end();
        });
    }else{
        response.writeHead(404 , {"Content-Type": "text/html"});
        response.write("<h1>Not Found</h1>");
        response.end();
    }
});
app.listen(port);
console.log("サーバー起動:" + port + "ポート監視中");
"use strict";
var port = 9000;
var http = require("http");
var app = http.createServer();
app.on("request" , function(request , response){
    console.log("リクエストを送信しました");
    console.log("---request.method---");
    console.log(request.method);
    console.log("---request.url---");
    console.log(request.url);
    console.log("---request.headers---");
    console.log(request.headers);

    var params = (new URL(request.url , "http://localhost:9000")).searchParams;
    for(var param of params){
        console.log("name :" , param[0] , " value :" , param[1]);
    }
    console.log("=================");

    response.writeHead(200 , { "Content-Type": "text/html" });
    var responseMessage = "<h1>Hello Reqest1-3</h1>";
    response.end(responseMessage);
});
app.listen(port);
console.log("サーバ起動:" + port + "　ポート監視中");
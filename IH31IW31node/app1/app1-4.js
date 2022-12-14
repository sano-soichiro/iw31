"use strict";
var port = 9000;
var http = require("http");
var app = http.createServer();
app.on("request" , function(request , response){
    var body = [];
    request.on("data" , function(bodydata){
        console.log("---data---");
        console.log(bodydata);
        console.log("----------");
        body.push(bodydata);
    })
    request.on("end" , function(){
        const body_string = Buffer.concat(body).toString();
        console.log("Request body contents:" + body_string);
        if(body_string === ""){
            return 0
        }
        var array = JSON.parse('{"' + decodeURI(body_string.replace(/&/g , "\" , \"").replace(/=/g , "\":\"")) + '"}');
        for(var key in array){
            console.log("name :" + key + "　　" + "value :" + array[key]);
        }
    });
    console.log("リクエストを受信しました");
    console.log(request.method);
    console.log(request.url);
    console.log(request.headers);

    response.writeHead(200 , { "Content-Type": "text/html" });
    var responseMessage = "<h1>Hello Reqest POST</h1>";
    response.end(responseMessage);
});
app.listen(port);
console.log("サーバ起動:" + port + "　ポート監視中");
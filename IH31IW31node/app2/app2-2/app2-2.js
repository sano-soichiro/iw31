"use strict";
var routeResponseMap={
    "/":"./views/index.html",
    "/page1":"./views/page1.html"
}

var sendErrorResponse = function(response){
    response.writeHead(404 , {"Content-type":"text/html"});
    response.write("<h1>Not Found</h1>");
    response.end();
}

var customReadFile = function(file_path , response){
    if(fs.existsSync(file_path)){
        fs.readFile(file_path , function(error , data){
            if(error){
                sendErrorResponse(response);
                return;
            }else{
                response.write(data);
                response.end();
            }
        });
    }else{
        sendErrorResponse(response);
    }
}

var port = 9000;
var http = require("http");
var fs = require("fs");
var app = http.createServer();

app.on("request" , function(request , response){
    var url = request.url;
    console.log(url);
    if(url == "/"){
        response.writeHead(200 , {"Content-type":"text/html"});
        fs.readFile(routeResponseMap[url] , function(error , data){
            response.end(data);
        })
    }else if(url.indexOf(".html") != -1){
        response.writeHead(200 , {"Content-type":"text/html"});
        customReadFile("views" + url , response);
    }else if(url.indexOf(".css") != -1){
        response.writeHead(200 , {"Content-type":"text/css"});
        customReadFile("public" + url , response);
    }else if(url.indexOf(".js") != -1){
        response.writeHead(200 , {"Content-type":"text/javascript"});
        customReadFile("public" + url , response);
    }else if(url.indexOf(".jpg") != -1){
        response.writeHead(200 , {"Content-type":"image/jpeg"});
        customReadFile("public" + url , response);
    }else if(url.indexOf(".png") != -1){
        response.writeHead(200 , {"Content-type":"image/png"});
        customReadFile("public" + url , response);
    }else{
        sendErrorResponse(response);
    }
});
app.listen(port);
console.log("サーバー起動:" + port + "ポート監視中");
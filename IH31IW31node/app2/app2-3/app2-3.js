"use strict";

var config = require("./config");

var contentType = require("./contenttype");

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

var http = require("http");
var fs = require("fs");
var app = http.createServer();

app.on("request" , function(request , response){
    var url = request.url;
    console.log(url);
    if(url == "/"){
        response.writeHead(200 , {"Content-type":"text/html"});
        fs.readFile(config.routeResponseMap[url] , function(error , data){
            response.end(data);
        })
    }else{
        var filetype = "";
        for(var key in contentType.fileContentTypePathMap){
            if(url.indexOf(key) != -1){
                filetype = key;
            }
        }
        if(filetype == ""){
            sendErrorResponse(response);
        }else{
            response.writeHead(200 , {"Content-type":contentType.fileContentTypePathMap[filetype]["Content-type"]});
            customReadFile(contentType.fileContentTypePathMap[filetype]["path"] + url , response);
        }
    }
});
app.listen(config.port);
console.log("サーバー起動:" + config.port + "ポート監視中");
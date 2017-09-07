var http = require("http");
var app = require("./config/express")();

http.createServer(app).listen(5000,function () {
  console.log("Servidor");
})

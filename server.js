var http        = require("http")
var path        = require("path")
var serveStatic = require("serve-static");

var serve = serveStatic(path.join(__dirname, "app"));

var server = http.createServer(function(req, res){
  serve(req, res, function(){
    res.end();
  });
});

server.listen(3000);

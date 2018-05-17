var express = require('express'),
app = express(),
port = process.env.PORT||3000,
bodyParser = require('body-parser'),
http = require('http');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var routes = require('./app/routes/hikeroute');
routes(app); //register the routes

/*const server = http.createServer((req,res)=>{
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200, {'Content-Type': 'application/json'});
      var responseBody = {header, method,url,body};
    //  res.write(JSON.stringify(responseBody));
      res.end(JSON.stringify(responseBody));
  }).listen(port,()=>{
    console.log("resfull api is running on port:"+port);
  });*/
app.listen(port);
console.log("resfull api is running on port:"+port);

const express = require('express');
const router = express.Router();
const app = express();
const patients = require('./source/routes/patient');
const departments = require('./source/routes/department');
const visits = require('./source/routes/visit');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
var http = require('http');
// const index = require('./index.html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/patients',patients);
app.use('/departments',departments);
app.use('/visits',visits);

// function onRequest(req,res){
//   res.writeHead(200,{'Content-Type':'text/html'});
//   fs.readFile('./index.html',null,function(error,data){
//     if(error){
//       res.writeHead(404);
//       res.write('File not found!');
//     }else{
//       res.write(data);
//     }
//     res.end();
//   });
// }

app.get('/',function(req,res){
  // res.send('Hello World!');
  res.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile('./index.html',null,function(error,data){
    // fs.readFile('./var/www/worldmed.hospital/html/index.html',null,function(error,data){
      if(error){
        res.writeHead(404);
        res.write('File not found!');
      }else{
        res.write(data);
      }
      res.end();
    });
})

app.listen(8080, function(){


  console.log(`
    ###########################
    ####  WorldMed Center  ####
    ###########################
    `);

  //TODO: print all CONFIGure details
  console.log('WebApp now running on: ', 'localhost'+':'+8080);

});

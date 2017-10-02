const express = require('express');
const router = express.Router();
const app = express();
const patients = require('./source/routes/patient');
const activities = require('./source/routes/activity');
const records = require('./source/routes/record');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
var http = require('http');
// const index = require('./index.html');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/patients',patients);
app.use('/api/activities',activities);
app.use('/api/records',records);

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

// app.get('/',function(req,res){
//   // res.send('Hello World!');
//   res.writeHead(200,{'Content-Type':'text/html'});
//     fs.readFile('./client',null,function(error,data){
//     // fs.readFile('./var/www/worldmed.hospital/html/index.html',null,function(error,data){
//       if(error){
//         res.writeHead(404);
//         res.write('File not found!');
//       }else{
//         res.write(data);
//       }
//       res.end();
//     });
// })
app.locals.pretty = true;


app.listen(8080, function(){


  console.log(`
    ###########################
    ####  Research Cleft  ####
    ###########################
    `);

  //TODO: print all CONFIGure details
  console.log('WebApp now running on: ', 'localhost'+':'+8080);

});

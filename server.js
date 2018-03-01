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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/patients',patients);
app.use('/api/activities',activities);
app.use('/api/records',records);
app.locals.pretty = true;
app.use(express.static(__dirname+'/client'));
app.listen(8080, function(){


  console.log(`
    ###########################
    ####  Research Cleft  ####
    ###########################
    `);

  //TODO: print all CONFIGure details
  console.log('WebApp now running on: ', 'localhost'+':'+8080);

});

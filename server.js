const express = require('express');
const router = express.Router();
const app = express();
const patients = require('./source/routes/patient');
const departments = require('./source/routes/department');
const visits = require('./source/routes/visit');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api/patients',patients);
app.use('/api/departments',departments);
app.use('/api/visits',visits);
app.listen(8080, function(){
  console.log(`
    ###########################
    ####  WorldMed Center  ####
    ###########################
    `);

  //TODO: print all CONFIGure details
  console.log('WebApp now running on: ', 'localhost'+':'+8080);

});
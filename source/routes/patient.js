const express = require('express');
const router = express.Router();
const models = require('../models');
const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'worldmed_reborn',
  'root',
  'secret',
  {
    host: '128.199.90.155',
    port: 3306,
    dialect: 'mysql',
    timezone: 'Asia/Bangkok',
  }
);

var app = express();

router
  .route('/')
  //List Patients
  .get( (req, res) => {
    var obj = {
      where: {},
    }

    models.Patient
      .findAll(obj)
      .then( (patients) => {
	      res.json(patients);
      });
    })

    .post( (req, res) => {
  	   models.Patient
  		   .create(req.body)
         .then( (patient) => {
           res.json(patient);
         },function(err){
           res.status(400);
           res.json(err);
  	     });
       });

router
    .route('/:id')
    //List Patients
    .get( (req, res) => {
      models.Patient
        .findById(req.params.id)
        .then ( (patient) => {
          res.json(patient);
        });
    })

    .put( (req,res) => {
  	  models.Patient
        .update(req.body,{
          where: {
            id: req.params.id
          }
        })
        .then( (patient) => {
          res.json(patient);
        },function(err){
          res.status(400);
          res.json(err)
        });
    })

    .delete( (req,res) => {
  	  models.Patient
        .destroy({
  		  where:{
  			  id: req.params.id
  		  }
  	  })
  	  .then( (data) => {
  		  res.json(data);
  	  })
    });

module.exports = router;

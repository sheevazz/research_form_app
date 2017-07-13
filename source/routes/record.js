const express = require('express');
const router = express.Router();
const models = require('../models');
const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'research_cleft',
  'root',
  'root',
  {
    // host: '128.199.90.155',
    host: 'localhost',
    port: 8889,
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
      // include:[models.Patient,models.Activity],
      where: {},
    }
    if (req.query.patient_id) {
      obj.where.patient_id = parseInt(req.query.patient_id) ;
    }

    if (req.query.activity_id) {
      obj.where.activity_id = parseInt(req.query.activity_id) ;
    }

    models.Record
      .findAll(obj)
      .then( (records) => {
	      res.json(records);
      });
    })

    .post( (req, res) => {
  	   models.Record
  		   .create(req.body)
         .then( (record) => {
           res.json(record);
         },function(err){
           res.status(400);
           res.json(err);
  	     });
       });

router
    .route('/:id')
    //List Patients
    .get( (req, res) => {
      models.Record
        .findById(req.params.id)
        .then ( (record) => {
          res.json(record);
        });
    })

    .put( (req,res) => {
  	  models.Record
        .update(req.body,{
          where: {
            id: req.params.id
          }
        })
        .then( (record) => {
          res.json(record);
        },function(err){
          res.status(400);
          res.json(err)
        });
    })

    .delete( (req,res) => {
  	  models.Record
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

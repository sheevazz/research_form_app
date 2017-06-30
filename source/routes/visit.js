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
    // host: '128.199.90.155',
    host: 'worldmed.hospital',
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

    models.Visit
      .findAll(obj)
      .then( (visits) => {
	      res.json(visits);
      });
    })

    .post( (req, res) => {
  	   models.Visit
  		   .create(req.body)
         .then( (visit) => {
           res.json(visit);
         },function(err){
           res.status(400);
           res.json(err);
  	     });
       });

router
    .route('/:id')
    //List Patients
    .get( (req, res) => {
      models.Visit
        .findById(req.params.id)
        .then ( (visit) => {
          res.json(visit);
        });
    })

    .put( (req,res) => {
  	  models.Visit
        .update(req.body,{
          where: {
            id: req.params.id
          }
        })
        .then( (visit) => {
          res.json(visit);
        },function(err){
          res.status(400);
          res.json(err)
        });
    })

    .delete( (req,res) => {
  	  models.Visit
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

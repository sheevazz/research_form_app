const express = require('express');
const router = express.Router();
const models = require('../models');
const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'worldmed_dev',
  'root',
  'root',
  {
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
      where: {},
    }

    models.Department
      .findAll(obj)
      .then( (departments) => {
	      res.json(departments);
      });
    })

    .post( (req, res) => {
  	   models.Department
  		   .create(req.body)
         .then( (department) => {
           res.json(department);
         },function(err){
           res.status(400);
           res.json(err);
  	     });
       });

router
    .route('/:id')
    //List Patients
    .get( (req, res) => {
      models.Department
        .findById(req.params.id)
        .then ( (department) => {
          res.json(department);
        });
    })

    .put( (req,res) => {
  	  models.Department
        .update(req.body,{
          where: {
            id: req.params.id
          }
        })
        .then( (department) => {
          res.json(department);
        },function(err){
          res.status(400);
          res.json(err)
        });
    })

    .delete( (req,res) => {
  	  models.Department
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

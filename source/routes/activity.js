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
      where: {},
    }

    if(req.query.age_range){
      obj.where.age_range = req.query.age_range;
    }

    models.Activity
      .findAll(obj)
      .then( (activities) => {
	      res.json(activities);
      });
    })

    .post( (req, res) => {
  	   models.Activity
  		   .create(req.body)
         .then( (activity) => {
           res.json(activity);
         },function(err){
           res.status(400);
           res.json(err);
  	     });
       });

router
    .route('/:id')
    //List Patients
    .get( (req, res) => {
      models.Activity
        .findById(req.params.id)
        .then ( (activity) => {
          res.json(activity);
        });
    })

    .put( (req,res) => {
  	  models.Activity
        .update(req.body,{
          where: {
            id: req.params.id
          }
        })
        .then( (activity) => {
          res.json(activity);
        },function(err){
          res.status(400);
          res.json(err)
        });
    })

    .delete( (req,res) => {
  	  models.Activity
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

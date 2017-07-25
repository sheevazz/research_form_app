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
  .route('/preprocessed')
    //List Patients
    .get( (req, res) => {
      var obj = {
        where: {},
        include: [
          {
            model: models.Record
          }
        ],
        order:[
          ['id','ASC'],
          [models.Record,'visited_date','ASC']
        ]
      }

      models.Patient
        .findAll(obj)
        .then( (patients) => {
          var big_array = [];
       	  for(let patient in patients){
            var small_array = [];
            // console.log(patients[patient].dataValues.records);
            if(patients[patient].dataValues.records){
              for(let record in patients[patient].dataValues.records){
                // console.log(patients[patient].dataValues.records[record].dataValues.patient_id+':'+patients[patient].dataValues.records[record].dataValues.activity_id);
                small_array.push(patients[patient].dataValues.records[record].dataValues.activity_id);
                small_array.push(-1)
              }
              small_array.push(-2)
              big_array.push(small_array);
            }

          }
          var result = '';
          for(i in big_array){
            // console.log(typeof big_array[i].join(' '));
            result += big_array[i].join(' ');
            result += '\n'
          }
          // console.log(big_array);
          res.send(result);
        });
    })

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

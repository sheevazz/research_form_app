const express = require('express');
const router = express.Router();
const models = require('../models');
const fs = require('fs');
const moment = require('moment');
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
      // console.log(req.body);
      var obj = req.body;
      var vn_name;
      var vn_number;
      for(var key in obj) {
        if(req.body.hasOwnProperty(key)){
          if(key==='department_id'&&req.body[key]==="1"){
            vn_name = 'OPD';
            vn_number = 1;

          }else if (key==='department_id'&&req.body[key]==="2") {
            vn_name = 'ER';
            vn_number = 2;

          }else if (key==='department_id'&&req.body[key]==="3") {
            vn_name = 'Ward1';
            vn_number = 3;

          }else if (key==='department_id'&&req.body[key]==="4") {
            vn_name = 'Ward2';
            vn_number = 4;

          }else if (key==='department_id'&&req.body[key]==="5") {
            vn_name = 'Treatment';
            vn_number = 5;

        }
        if(key==='visited_date'){
          var visited_date = req.body[key];
          var startDate = moment(visited_date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
          var endDate = moment(visited_date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
        }
        }
      }
      // console.log('vn_number = '+vn_number);
      // console.log('visited_date = '+visited_date);
      // console.log('start of the day = '+startDate);
      // console.log('end of the day = '+endDate);

      models.Visit
        .count({ where: {
          'visited_date': {$between: [startDate,endDate]},
          'department_id':{$eq:parseInt(vn_number)}
        }
        })
        .then(c => {
          // console.log("There are " + c + " visits todays");
          // console.log("VN = "+vn_name+'-'+(parseInt(c)+1));
          if(parseInt(c)<=9){
              obj.visit_number = vn_name+'-'+'00'+(parseInt(c)+1);
          }else if (parseInt(c)>=10&&parseInt(c)<=99) {
            obj.visit_number = vn_name+'-'+'0'+(parseInt(c)+1);
          }else{
            obj.visit_number = vn_name+'-'+(parseInt(c)+1);
          }
          models.Visit
     		   .create(obj)
            .then( (visit) => {
              res.json(visit);
            },function(err){
              res.status(400);
              res.json(err);
     	     });
        }
        )
        // console.log(vn_name);
        // console.log(moment(new Date()).startOf('day').format('YYYY-MM-DD HH:mm:ss'));
        // console.log(moment(new Date()).endOf('day'));
        // console.log(new Date());

  	  //  models.Visit
  		//    .create(req.body)
      //    .then( (visit) => {
      //      res.json(visit);
      //    },function(err){
      //      res.status(400);
      //      res.json(err);
  	  //    });
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

    let getDepartmentName = function(department_id){
      // console.log(department_id);
      if(department_id===1){
        return "OPD"
      }else if (department_id===2) {
        // console.log("MEAW");
        return "ER"
      }else if (department_id===3) {
        return "Ward1"
      }else if (department_id===4) {
        return "Ward2"
      }else if (department_id==5) {
        return "Treatment"
      }
    }

module.exports = router;

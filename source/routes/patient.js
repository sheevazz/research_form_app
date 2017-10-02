const express = require('express');
const router = express.Router();
const models = require('../models');
const fs = require('fs');
var moment = require('moment')
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
  .route('/chronicles')
    .get( (req, res) => {
      // var obj = {
      //   include:[models.Patient],
      //   where: {},
      // }
      var obj = {
        include:[
          {
            model: models.Patient,
          },
          {
            model: models.Activity,
          }
        ],
        where: {}
        //logging:console.log
      }

      //read sequences input
      var freq_seq = [];
      var text = fs.readFileSync(__dirname + '/cm-clasp_01.txt').toString('utf-8');
      var seq_array = text.split("\n")
      var pattern = [];
      // var test = seq_array[0].split("#SUP:")
      console.time('timer');
      for(seq in seq_array){
        var tmp = seq_array[seq].split("#SUP:");
        // console.log(typeof tmp[0]);
        var tmpseq = tmp[0].split(" -1 ");
        for(t in tmpseq){
          tmpseq[t] = parseInt(tmpseq[t]);
        }
        // freq_seq.push({seq:tmp[0].replace(/ -1 /g,',').slice(0, -1),minsup:tmp[1]});
        freq_seq.push({seq:tmpseq.slice(0,-1),minsup:tmp[1],chronicles:[]});
      }


      // console.log(freq_seq);
      models.Record
        .findAll(obj)
          .then( (records) => {
            var activity_id_all = [];
            var activity_name_all = [];
            var array_obj = [];
            var obj_act_date = {};
            var visited_date =[];
            var first_visit=null;
            var last_visit=null;
            var lowerbound = 100;
            var upperbound = 0;
            var maxseq = []
            var chronicles = [];

            for(record in records){
              activity_id_all.push(records[record].dataValues.activity.id);
              activity_name_all.push(records[record].dataValues.activity.name);
            }

            activity_id_all = Array.from(new Set(activity_id_all));
            activity_name_all = Array.from(new Set(activity_name_all));

            for(length in activity_id_all){
              array_obj.push({activity_id:activity_id_all[length],activity_name:activity_name_all[length],visited_age:[],age_different:[],age_different_avg:[]})
            }

            for(record in records){
              for(i=0;i<array_obj.length;i++){
                if(records[record].dataValues.activity_id===array_obj[i].activity_id){
                  // visited_date[i].push(records[record].dataValues.visited_date);
                  // array_obj[i].visited_age.push(records[record].dataValues.visited_date);
                  array_obj[i].visited_age.push(Math.abs(moment(records[record].dataValues.visited_date).diff(records[record].dataValues.patient.dob, 'years' ,true)).toFixed(4))
                  // console.log('visit age'+'---'+parseFloat(array_obj[i].visited_age));
                  // console.log('age_range_min'+'---'+parseFloat(records[record].dataValues.activity.age_range_min));
                  // console.log('age_range_max'+'----'+parseFloat(records[record].dataValues.activity.age_range_max));
                  var tmp_visit_age = Math.abs(moment(records[record].dataValues.visited_date).diff(records[record].dataValues.patient.dob, 'years' ,true)).toFixed(4);
                  // console.log(tmp_visit_age);
                  if((parseFloat(tmp_visit_age) >= records[record].dataValues.activity.age_range_min) && (tmp_visit_age <= records[record].dataValues.activity.age_range_max)){
                    array_obj[i].age_different.push(0);
                    // array_obj[i].age_different_avg.push({1:0,2:0});
                    // console.log('IN RANGE');
                  }else if(parseFloat(tmp_visit_age) < parseFloat(records[record].dataValues.activity.age_range_min)){
                    // console.log('lowerbound'+'='+Math.abs(parseFloat(array_obj[i].visited_age) - parseFloat(records[record].dataValues.activity.age_range_min)));
                    array_obj[i].age_different.push(Math.abs(parseFloat(tmp_visit_age) - records[record].dataValues.activity.age_range_min).toFixed(4)) ;
                    // array_obj[i].age_different_avg.push({1:parseFloat(tmp_visit_age),2:records[record].dataValues.activity.age_range_min});
                  }else if(parseFloat(tmp_visit_age) > parseFloat(records[record].dataValues.activity.age_range_max)){
                  // console.log('upperbound'+'='+Math.abs(parseFloat(array_obj[i].visited_age) - parseFloat(records[record].dataValues.activity.age_range_max)));
                    array_obj[i].age_different.push(Math.abs(parseFloat(tmp_visit_age) - records[record].dataValues.activity.age_range_max).toFixed(4)) ;
                    // array_obj[i].age_different_avg.push({1:parseFloat(tmp_visit_age),2:records[record].dataValues.activity.age_range_max});

                  }
                  // array_obj[i].record_id.push(records[record].dataValues.id);
                  // if(array_obj[i].first_visit===null&&array_obj[i].last_visit===null){
                  //   array_obj[i].first_visit= records[record].dataValues.visited_date;
                  //   array_obj[i].last_visit= records[record].dataValues.visited_date;
                  //   // console.log('sus');
                  // }
                  // else if(array_obj[i].first_visit!==null&&(new Date(array_obj[i].first_visit).getTime() > new Date(records[record].dataValues.visited_date).getTime())){
                  //   array_obj[i].first_visit = records[record].dataValues.visited_date;
                  //   // console.log(new Date(records[record].dataValues.visited_date));
                  // //  console.log(new Date(first_visit).getTime() > new Date(records[record].dataValues.visited_date).getTime());
                  // }else if(array_obj[i].last_visit!==null&&(new Date(array_obj[i].last_visit).getTime() < new Date(records[record].dataValues.visited_date).getTime())){
                  //   array_obj[i].last_visit = records[record].dataValues.visited_date;
                  //     // console.log(new Date(records[record].dataValues.visited_date));
                  //   //  console.log(new Date(first_visit).getTime() > new Date(records[record].dataValues.visited_date).getTime());
                  // }
                }
              }
            }
            for(a in array_obj){
              var total = 0;
              for(b in array_obj[a].age_different){
                total += parseFloat(array_obj[a].age_different[b]);
                // console.log(parseFloat(array_obj[a].age_different[b]));
              }
              // console.log(array_obj[a].activity_id+'--'+total);
              var avg = total/array_obj[a].age_different.length
              array_obj[a].age_different_avg.push(avg.toFixed(4));
              // console.log(avg);
            }
            for (var i = 0; i < array_obj.length - 1; i++) {
              // This is where you'll capture that last value
              for (var j = i + 1; j < array_obj.length; j++) {
                var years_gap = [];
                // results.push(array[i] + ' ' + array[j]);
                // console.log(array_obj[i].activity_id+'-'+array_obj[j].activity_id);
                // for(var k = 0; k < Math.max(array_obj[i].visited_date.length, array_obj[j].visited_date.length);k++){
                for(var k = 0; k < array_obj[i].visited_age.length;k++){
                  for(var m = 0; m < array_obj[j].visited_age.length;m++){
                    years_gap.push(Math.abs(array_obj[i].visited_age[k]-array_obj[j].visited_age[m]).toFixed(4))

                  }
                  // console.log(Math.abs(moment(array_obj[i].visited_date[k]).diff(array_obj[j].visited_date[k], 'years' ,true)).toFixed(2));
                  // years_gap.push(Math.abs((array_obj[i].visited_date[k]).diff(array_obj[j].visited_date[k], 'years' ,true)).toFixed(2))
                }
                chronicles.push({activity_id:[array_obj[i].activity_id,array_obj[j].activity_id].sort(function(a, b){return a-b}),activity_first:array_obj[i].activity_name,activity_second:array_obj[j].activity_name,lowerbound:Math.min.apply( Math, years_gap ),upperbound:Math.max.apply( Math, years_gap )});
              }
            }

            for(f in freq_seq){
              tempfreqseq = Array.from(new Set(freq_seq[f].seq));
              for(c in chronicles){
                for (var i = 0; i < tempfreqseq.length - 1; i++) {
                  // This is where you'll capture that last value
                  for (var j = i + 1; j < tempfreqseq.length; j++) {
                    var tmp_act = [tempfreqseq[i],tempfreqseq[j]].sort(function(a, b){return a-b});
                    if(tmp_act.toString()===chronicles[c].activity_id.toString()){
                      // console.log(tmp_act.toString()+'---'+chronicles[c].activity_id.toString());
                      // pattern.push([chronicles[c].activity_first,[chronicles[c].lowerbound,chronicles[c].upperbound],chronicles[c].activity_second]);
                      freq_seq[f].chronicles.push([chronicles[c].activity_first,[chronicles[c].lowerbound,chronicles[c].upperbound],chronicles[c].activity_second]);
                    }
                  }
                }
              }
            }
            for(freq in freq_seq){
              var score = 0;
              var tmp_seq = Array.from(new Set(freq_seq[freq].seq));
              for(seq in tmp_seq){
                for(act in array_obj){
                  if(array_obj[act].activity_id == freq_seq[freq].seq[seq]){
                    score += parseFloat(array_obj[act].age_different_avg);
                  }
                }
              }
              freq_seq[freq].pattern_score = score;
            }

            // console.log(array_obj);
            // console.log(activity_id_all+'---'+activity_id_all.length);
            // console.log(visited_date+'---'+visited_date.length);
            // console.log(Array.from(new Set(activity_id_all)));
            // console.log(array_obj[0].activity_id);
            // console.log(new Date().getTime() < new Date(2012-10-30).getTime());
            // var t1 = performance.now();
            // console.log(pattern);
            console.timeEnd('timer');
            // console.log("execution time = "+(t1-t0)+"ms");
            // res.json(records);
            // console.log(typeof freq_seq);
            var sort_by = function(field, reverse, primer){
              var key = primer ?
                function(x) {return primer(x[field])} :
                function(x) {return x[field]};

              reverse = !reverse ? 1 : -1;

              return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
              }
            }
            freq_seq.sort(sort_by('pattern_score', true, parseInt));
            res.json(freq_seq);
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
          // console.log(result);
          res.format({
            'text/plain': function(){
              res.type('html')
              res.send(result);
            }
          });

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

const Sequelize = require('sequelize');
const Patient = require('./patient');
const Activity = require('./activity');
const Record = require('./record');

const sequelize = new Sequelize(
  'research_cleft',
  'root',
  'root',
  {
    host: 'localhost',
    // host: '128.199.90.000',
    port: 3306,
    dialect: 'mysql',
    timezone: 'Asia/Bangkok',
    logging: false,
  }
);

var db = {
  Instance: sequelize,
  Patient: new Patient(sequelize, Sequelize),
  Activity: new Activity(sequelize, Sequelize),
  Record: new Record(sequelize, Sequelize),
}

db.Patient.hasMany(db.Record,{foreignKey: 'patient_id'});
db.Record.belongsTo(db.Patient,{foreignKey:'patient_id'});
db.Activity.hasMany(db.Record,{foreignKey: 'activity_id'});
db.Record.belongsTo(db.Activity,{foreignKey:'activity_id'});

sequelize.sync();
// sequelize.sync({force:true});

module.exports = db;

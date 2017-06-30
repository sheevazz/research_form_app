const Sequelize = require('sequelize');
const Patient = require('./patient');
const Department = require('./department');
const Visit = require('./visit');
const Admission = require('./admission');

const sequelize = new Sequelize(
  'worldmed_reborn',
  'root',
  'secret',
  {
    host: 'worldmed.hospital',
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
  Department: new Department(sequelize, Sequelize),
  Visit: new Visit(sequelize, Sequelize),
  Admission: new Admission(sequelize, Sequelize),
}

db.Patient.hasMany(db.Visit,{foreignKey: 'patient_id'});
db.Patient.hasMany(db.Admission,{foreignKey: 'patient_id'});
db.Department.hasMany(db.Visit,{foreignKey: 'department_id'});

sequelize.sync();
// sequelize.sync({force:true});

module.exports = db;

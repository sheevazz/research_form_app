module.exports = function (sequelize, Sequelize) {
  const Patient = sequelize.define('Patient', {
    first_name: {
      type: Sequelize.STRING,
      validate:{
        is: {
          args: ["^[a-zA-Z\u0e00-\u0e5b ]+$",'i'],
          msg: "Firstname should be character (Eng or Thai)"
      },
        max: {
          args: 18,
          msg: "Exceed character limit(18)"
    }
      }
    },
    last_name: {
      type: Sequelize.STRING,
      validate:{
        is: {
          args: ["^[a-zA-Z\u0e00-\u0e5b ]+$",'i'],
          msg: "Lastname should be character (Eng or Thai)"
      },
        max: {
        args: 16,
        msg: "Exceed character limit(16)"
    }
      }
    },
    middle_name: {
      type: Sequelize.STRING,
      validate:{
        is: {
          args: ["^[a-zA-Z\u0e00-\u0e5b ]+$",'i'],
          msg: "Middle should be character (Eng or Thai)"
      },
        max: {
          args: 18,
          msg: "Exceed character limit(18)"
    }
      }
    },
    first_name_th: {
      type: Sequelize.STRING,
      validate:{
        is: {
          args: ["^[a-zA-Z\u0e00-\u0e5b ]+$",'i'],
          msg: "Firstname should be character (Eng or Thai)"
      },
        max: {
          args: 18,
          msg: "Exceed character limit(18)"
    }
      }
    },
    last_name_th: {
      type: Sequelize.STRING,
      validate:{
        is: {
          args: ["^[a-zA-Z\u0e00-\u0e5b ]+$",'i'],
          msg: "Lastname should be character (Eng or Thai)"
      },
        max: {
          args: 18,
          msg: "Exceed character limit(18)"
    }
      }
    },
    gender: {
      type: Sequelize.STRING,
      validate:{
        is: {
          args: ["^[a-zA-Z\u0e00-\u0e5b ]+$",'i'],
          msg: "Gender should be character (Eng or Thai)"
      }
      }
    },
    dob: Sequelize.DATE,
    drug_allergy: Sequelize.STRING,
	  blood_group: Sequelize.STRING,
    blood_group_rh: Sequelize.STRING,
    id_number:Sequelize.STRING,
    nationality:Sequelize.STRING,
    religion: Sequelize.STRING,
    telephone: Sequelize.STRING,
    hospital_number: Sequelize.STRING,
    marital_status: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate:{
        isEmail: {
          args: true,
          msg: "Invalid Email pattern"
      }
      }
    },
    address: Sequelize.STRING,
    address_th: Sequelize.STRING,
    clinic_discovery:Sequelize.STRING,
    occupation: Sequelize.STRING,
    emergency_name: {
      type: Sequelize.STRING,
      validate:{
        is: {
          args: ["^[a-zA-Z\u0e00-\u0e5b ]+$",'i'],
          msg: "Name should be character (Eng or Thai)"
      }
      }
    },
    emergency_relation: Sequelize.STRING,
    emergency_address: Sequelize.STRING,
    emergency_telephone: Sequelize.STRING,
    insurance_name: Sequelize.STRING,
  },{
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_bin',
    freezeTableName: true,
    tableName: 'patient',
    //Naming strategy Example
    name: {
      singular: 'patient',
      plural: 'patients'
    },

  });
  return Patient;
};

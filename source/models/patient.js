module.exports = function (sequelize, Sequelize) {
  const Patient = sequelize.define('Patient', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    dob: Sequelize.DATE,
    vpi_result: Sequelize.STRING,
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

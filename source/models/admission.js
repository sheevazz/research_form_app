module.exports = function (sequelize, Sequelize) {
  const Admission = sequelize.define('Admission', {
    name: Sequelize.STRING,
    admission_date: Sequelize.DATE
  },{
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_bin',
    freezeTableName: true,
    tableName: 'admission',
    //Naming strategy Example
    name: {
      singular: 'admission',
      plural: 'admissions'
    },

  });
  return Admission;
};

module.exports = function (sequelize, Sequelize) {
  const Visit = sequelize.define('Visit', {
    visit_number: Sequelize.STRING,
    note: Sequelize.STRING,
    visited_date: Sequelize.DATE
  },{
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_bin',
    freezeTableName: true,
    tableName: 'visit',
    //Naming strategy Example
    name: {
      singular: 'visit',
      plural: 'visits'
    },

  });
  return Visit;
};

module.exports = function (sequelize, Sequelize) {
  const Record = sequelize.define('Record', {
    visited_date: Sequelize.DATE
  },{
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_bin',
    freezeTableName: true,
    tableName: 'record',
    //Naming strategy Example
    name: {
      singular: 'record',
      plural: 'records'
    },

  });
  return Record;
};

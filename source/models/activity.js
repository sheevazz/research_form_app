module.exports = function (sequelize, Sequelize) {
  const Activity = sequelize.define('Activity', {
    name: Sequelize.STRING,
    age_range: Sequelize.STRING,
    age_range_min: Sequelize.FLOAT,
    age_range_max: Sequelize.FLOAT,
  },{
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_bin',
    freezeTableName: true,
    tableName: 'activity',
    //Naming strategy Example
    name: {
      singular: 'activity',
      plural: 'activities'
    },

  });
  return Activity;
};

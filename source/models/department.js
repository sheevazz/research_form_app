module.exports = function (sequelize, Sequelize) {
  const Department = sequelize.define('Department', {
    name: Sequelize.STRING,
  },{
    timestamps: true,
    paranoid: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_bin',
    freezeTableName: true,
    tableName: 'department',
    //Naming strategy Example
    name: {
      singular: 'department',
      plural: 'departments'
    },

  });
  return Department;
};

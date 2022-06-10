'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "idusers",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  notes.init({
    body: DataTypes.TEXT,
    idusers: DataTypes.INTEGER,
    noteImg:  DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};
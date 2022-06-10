'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.notes, {
        foreignKey: "idusers",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  users.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
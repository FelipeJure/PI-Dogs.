const { DataTypes } = require('sequelize');
// const { UPSERT } = require('sequelize/types/query-types');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = async (sequelize) => {
  // defino el modelo
  const User = await sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    access:{
      type: DataTypes.ENUM('admin', 'client'),
      defaultValue: 'client'
    }
  })
  User.beforeCreate(user => {
    const hashedPassword = user.name + user.password 
    user.password = hashedPassword;
  })
};

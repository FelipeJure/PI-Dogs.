const { DataTypes } = require('sequelize');
// const { UPSERT } = require('sequelize/types/query-types');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Temperament = sequelize.define('temperament',{
    name:{
      type: DataTypes.STRING
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },{
    timestamps: false
  })
};

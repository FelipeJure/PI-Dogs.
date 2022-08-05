const { DataTypes } = require('sequelize');
// const { UPSERT } = require('sequelize/types/query-types');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull:false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull:false
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.pinclipart.com/picdir/big/532-5327559_dachshund-yorkshire-terrier-puppy-bichon-frise-clip-silueta.png'
    }
  },
  {
    timestamps: false
  });
};

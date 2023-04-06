const { DataTypes } = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('temperament', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true
            //primayKey: true //busqueda por id 
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,   //busqueda por nombre
        }
    }, { timestamps: false }
    );
};
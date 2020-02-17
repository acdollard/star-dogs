let Sequelize = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    let Horoscope = sequelize.define("Horoscope", {
        sign: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    });

    return Horoscope
}
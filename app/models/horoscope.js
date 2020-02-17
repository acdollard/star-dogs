
module.exports = function(sequelize, DataTypes){
    let Horoscope = sequelize.define("Horoscope", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sign: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    
    });

    return Horoscope;
}
module.exports = function(sequelize, DataTypes){
    let Dog = sequelize.define("Dog", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sign: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    
    });

    Dog.associate = function(models) {
        Dog.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        } )
    };

    return Dog;
}
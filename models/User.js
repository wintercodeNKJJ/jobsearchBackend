module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("user",{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        addresse:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        bio:{
            type: DataTypes.TEXT,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        birthdate:{
            type: DataTypes.DATE,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        cathegory:{
            type: DataTypes.NUMBER,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        }
    });

    return User;
}
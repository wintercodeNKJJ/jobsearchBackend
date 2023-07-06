module.exports = (sequelize,DataTypes) => {
    const Application = sequelize.define("application",{
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        job_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validator: {
                notEmpty: true,
            },
            primaryKey: true
        },
        status:{
            type:DataTypes.INTEGER,
            allowNull:false,
            default: 0,
            validate:{
                notEmpty: true
            }
        }
    });

    return Application;
}
const Application = require("./Application");

module.exports = (sequelize,DataTypes) => {
    const JobOffer = sequelize.define("joboffer",{
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        employerId:{
            type: DataTypes.NUMBER,
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
        dateline:{
            type: DataTypes.DATE,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        task:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        benefits:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        },
        prerequest:{
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true,
            }
        }
        
    });
    
    return JobOffer;
}
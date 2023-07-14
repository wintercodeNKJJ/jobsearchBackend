const { application,user } = require("../models");
const {UniqueConstraintError,Error,Sequelize} = require("sequelize");

let sequelize = new Sequelize('freedb_jobsearch_db','freedb_jordan_junior','7sTM2@6mXSFf!Q9',{
    host: 'sql.freedb.tech',
    dialect: 'mysql'
});

// "development": {
//     "username": "root",
//     "password": "Emmaculate.",
//     "database": "jobsearch_db",
//     "host": "localhost",
//     "dialect": "mysql"
//   },

// let sequelize = new Sequelize('jobsearch_db','root','Emmaculate.',{
//     host: 'localhost',
//     dialect: 'mysql'
// });

const create = (req, res)=>{
    return application.create(req.body).then((resp)=>{
        res.send(JSON.stringify(resp))
    }).catch(UniqueConstraintError =>{
        res.send(JSON.stringify(`You have already applied ${JSON.stringify(UniqueConstraintError.errors)}`))
    });
}
const getOne = (req, res)=>{
    res.send(application.findAll({
        where: {
            user_id: req.params.user_id,
            job_id: req.params.id
        }
    }))
}
const getAll = (req, res)=>{
    res.send(application.findAll({where: {user_id: req.body.id}}))
}
const removeOne = (req, res)=>{
    const item = application.findOne({
        where: {
            user_id: req.body.user_id,
            job_id: req.body.job_id
        }
      });
    
    application.destroy({
        where: {
            user_id: req.body.user_id,
            job_id: req.body.job_id
        }
    }).catch((UniqueConstraintError)=>{
        res.send(JSON.stringify('Error deleting'))
    });

    res.send(item);
}

const handleApp = (req,res)=>{
    application.findByPk(req.params.id).then((respond)=>{
        application.update({...respond,role:req.params.role}).then((repply)=>{
            res.send(repply)
        })
    })
}

const getApplicantstoJob = async(req,res)=>{
    console.log("request data body",req.body.id)
    const jobs = await sequelize.query(`SELECT * FROM users WHERE id IN (SELECT user_id FROM applications WHERE job_id = ${req.body.id})`,{
        model: user,
        mapToModel: true
    }).then(result=>{
        res.send(result)
    })
}

module.exports = {
    create,
    getOne,
    getAll,
    removeOne,
    handleApp,
    getApplicantstoJob
}
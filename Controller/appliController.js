const { Application,User } = require("../models");
const {UniqueConstraintError,Error,Sequelize} = require("sequelize");

const create = (req, res)=>{
    return Application.create(req.body).then((resp)=>{
        res.send(JSON.stringify(resp))
    }).catch(UniqueConstraintError =>{
        res.send(JSON.stringify(`You have already applied ${JSON.stringify(UniqueConstraintError.errors)}`))
    });
}
const getOne = (req, res)=>{
    res.send(Application.findAll({
        where: {
            user_id: req.params.user_id,
            job_id: req.params.id
        }
    }))
}
const getAll = (req, res)=>{
    res.send(Application.findAll({where: {user_id: req.body.id}}))
}
const removeOne = (req, res)=>{
    const item = Application.findOne({
        where: {
            user_id: req.body.user_id,
            job_id: req.body.job_id
        }
      });
    
    Application.destroy({
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
    Application.findByPk(req.params.id).then((respond)=>{
        Application.update({...respond,role:req.params.role}).then((repply)=>{
            res.send(repply)
        })
    })
}

const getApplicantstoJob = async(req,res)=>{
    let sequelize = new Sequelize('jobsearch_db','root','Emmaculate.',{
        host: 'localhost',
        dialect: 'mysql'
    });
    console.log("request data body",req.body.id)
    const jobs = await sequelize.query(`SELECT * FROM users WHERE id IN (SELECT user_id FROM applications WHERE job_id = ${req.body.id})`,{
        model: User,
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
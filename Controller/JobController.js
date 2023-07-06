const {Sequelize} = require("sequelize");

const { joboffer,user,Application } = require("../models");

const create = async(req,res) =>{
    // find existing job
    joboffer.findOne({where: {
        title: req.body.title
    }}).then((res)=>{
        console.log("respons",res)
        if(res !== null){
            console.log("existing",res)
            res.send(JSON.stringify('Job Exists already'))
            return 0
        }
    })

    // create job if not existing
    const newJob = await joboffer.create(req.body).then((res)=>{
       return res;
    });

    res.send(newJob)
}

const edit = (req,res) =>{
    res.send(joboffer.update(req.body))
}

const jobsApplied = async(req,res)=>{
    let sequelize = new Sequelize('jobsearch_db','root','Emmaculate.',{
        host: 'localhost',
        dialect: 'mysql'
    });
    const jobs = await sequelize.query(`SELECT * FROM joboffers WHERE id IN (SELECT job_id FROM applications WHERE user_id = ${req.body.id})`,{
        model: joboffer,
        mapToModel: true
    }).then(result=>{
        res.send(result)
    })
}

const jobsCreated = async(req,res)=>{
    let sequelize = new Sequelize('jobsearch_db','root','Emmaculate.',{
        host: 'localhost',
        dialect: 'mysql'
    });
    const jobs = await sequelize.query(`SELECT * FROM joboffers WHERE employerId = ${req.body.id}`,{
        model: joboffer,
        mapToModel: true
    }).then(result=>{
        res.send(result)
    })
}

const removeOne = (req,res) =>{
    joboffer.destroy({
        where: {
            id: req.body.id,
            employerId: req.body.EmployerId
        }
    }).then((respond)=>{
        res.send(JSON.stringify(respond))
    });
}
const getOne = (req,res) =>{
    joboffer.findByPk(req.params.id).then((jo)=>{
        res.send(jo)
    });
}
const getAll = async(req,res) =>{
    joboffer.findAll().then((joboffer)=>{
        res.send(joboffer)
    });
}

module.exports = {
    create,
    edit,
    removeOne,
    getOne,
    getAll,
    jobsApplied,
    jobsCreated
}
const { Employer,Jobbody,Joboffer,Jobdesc,user,Application } = require("../models");
const {getToken,getUser} = require('../api/auth/auth');
const { UniqueConstraintError, Op } = require("sequelize");
const bcrypt = require('bcrypt');

/**
 * This function creates a new user
 * @param {http_request} req request
 * @param {http_respons} res response
 * @returns created user
 */
const register = async(req,res) =>{
    // check if that user already exists.
    const user1 = await user.findOne({
        where: {
            [Op.or]:[
                {name: req.body.name}
            ]
        }
    }).then((res)=>{
        return res
    });

    // if user exists interupt creation
    if (user1){
        const message = "this user and email is already taken!"
        res.send(JSON.stringify(message))
        return 0;
    };
    const password = await bcrypt.hash(req.body.password,10).then((res)=>{
        return res;
    });
    req.body.password = password
    // Create user
    const crtuser = await user.create(req.body).then((res)=>{
        const token = getToken(res)
        return res
    }).catch(UniqueConstraintError =>{
        const message = `error occured ${UniqueConstraintError}`
        res.send(JSON.stringify(message));
    })

    res.send(crtuser);
}

/**
 * Loggin a user
 * @param {http_request} req 
 * @param {http_respons} res 
 * @param {context} param2 
 * @returns user loged in
 */
const login = async(req,res,{auth}) =>{
    let user1 = await user.findOne({
        where: {
            [Op.or]:[
                {name: req.params.name},
                {email: req.params.name}
            ]
        }
    }).then((res)=>{
        return res
    });

    const match = await bcrypt.compare(req.params.password, user1.password);
    if (!match){res.send(JSON.stringify('Wrong Password'))};

    const token = getToken(user1);
    res.send({...user.dataValues,token:token});
}

const update = (req,res) =>{
    user.update(req.body, {where: {id: req.params.id}});
    res.send(user.findByPk(req.params.id))
}
const remove = async(req,res) =>{
    // const user = await getUser(auth)
    const removed = user.findByPk(req.params.id)
    user.destroy({where: {id: req.params.id}}).catch((err)=>{
        if(err){console.log(err);}
    });
    res.send(removed)
}

/**
 * get connected user
 * @param {http_request} req 
 * @param {http_respons} res 
 * @param {context} param2 
 * @returns user
 */
const getaUser = async(req,res) =>{
    const user1 = await user.findOne({
        where:{
            name: req.body.name,
        }
    }).then((user)=>{
        return user
    });

    if(!user1){
        // throw new Error('this user is not found!')
        res.send(JSON.stringify("User does not Exist!"))
        return 0;
    }
    const match = await bcrypt.compare(req.body.password, user1.password);
    console.log('match result',req.body.password,user1.password)

    if (!match) {res.send(JSON.stringify('wrong password!'));
    return 0};
    // console.log(user)
    res.send(user1)
}

module.exports = {
    register,
    login,
    update,
    remove,
    getaUser
}
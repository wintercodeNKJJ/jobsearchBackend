// const connexction = require("../data/mysqldata");
// // const { employer,jobOffer } = require('../sampleData');
// const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString,GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
// const { Employer,Jobbody,Joboffer,Jobdesc,User,Application } = require("../../models");
// const {getToken,getUser} = require('../auth/auth');
// const { Op } = require("sequelize");
// const bcrypt = require('bcrypt');
// const { reset } = require("nodemon");

// //Employer Type
// const EmployerType = new GraphQLObjectType({
//     name:'Employer',
//     fields:()=>({
//         id: {type: GraphQLID},
//         name:{type: GraphQLString},
//         email:{type: GraphQLString},
//         phone:{type: GraphQLString},
//         password:{type: GraphQLString},
//         addresse:{type: GraphQLString},
//         birthdate:{type: GraphQLString},
//         bio:{type: GraphQLString}
//     })
// });

// //User Type
// const UserType = new GraphQLObjectType({
//     name:'User',
//     fields:()=>({
//         id: {type: GraphQLID},
//         name:{type: GraphQLString},
//         email:{type: GraphQLString},
//         phone:{type: GraphQLString},
//         password:{type: GraphQLString},
//         addresse:{type: GraphQLString},
//         birthdate:{type: GraphQLString},
//         bio:{type: GraphQLString},
//         cathegory:{type: GraphQLInt},
//         token:{type: GraphQLString},
//         role:{type: GraphQLString},
//     })
// });

// // JobBody type
// const JobBodyType = new GraphQLObjectType({
//     name: 'JobBody',
//     fields:()=>({
//         id:{type: GraphQLID},
//         description:{type: GraphQLString},
//         type:{type: GraphQLInt}
//     })
// });

// // JobDesc
// const JobDescType = new GraphQLObjectType({
//     name:'JobDesc',
//     fields:()=>({
//         job_offer_id:{type: GraphQLID},
//         job_body_id:{type: GraphQLID}
//     })
// });

// // Application
// const ApplicationType = new GraphQLObjectType({
//     name:'Application',
//     fields:()=>({
//         user_id:{type: GraphQLID},
//         job_id:{type: GraphQLID}
//     })
// });

// // JobOffer Type
// const JobOfferType = new GraphQLObjectType({
//     name:"JobOffer",
//     fields:()=>({
//         id:{type: GraphQLID},
//         employerId:{type: GraphQLID},
//         title:{type: GraphQLString},
//         description:{type: GraphQLString},
//         cathegory:{type: GraphQLString},
//         dateline:{type: GraphQLString},
//         requirements:{
//             // type: new GraphQLList(GraphQLString),
//             type: new GraphQLList(JobBodyType),
//             resolve(parent,args){
//                 let req = []
//                 return Joboffer.findByPk(parent.id,{include:{ model:Jobbody , attributes: ['id','description'], where: { type: 1 }  }}).then((res)=>{
//                     if(res){
//                         // res.Jobbodies.map((item)=>{
//                         //     req.push(item.description);
//                         // })
//                         // return req;
//                         return res.Jobbodies;
//                     }
//                 });
//             }
//         },
//         benefits:{
//             type: new GraphQLList(JobBodyType),
//             resolve(parent,args){
//                 let req = []
//                 return Joboffer.findByPk(parent.id,{include:{ model:Jobbody , attributes: ['id','description'], where: { type: 2 }  }}).then((res)=>{
//                     if(res){
//                         // res.Jobbodies.map((item)=>{
//                         //     req.push(item.description);
//                         // })
//                         // return req;
//                         return res.Jobbodies;
//                     }
//                 });
//             }
//         },
//         tasks:{
//             type: new GraphQLList(JobBodyType),
//             resolve(parent,args){
//                 let req = []
//                 return Joboffer.findByPk(parent.id,{include:{ model:Jobbody , attributes: ['id','description'], where: { type: 3 }  }}).then((res)=>{
//                     if(res){
//                         // res.Jobbodies.map((item)=>{
//                         //     req.push(item.description);
//                         // })
//                         // return req;
//                         return res.Jobbodies;
//                     }
//                 });
//             }
//         },
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields:{
//         //Get an Employer
//         employer:{
//             type: EmployerType,
//             args: {id:{type: GraphQLID}},
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 return Employer.findByPk(args.id);
//             }
//         },
//         //Get all Employers
//         employers:{
//             type: new GraphQLList(EmployerType),
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 return Employer.findAll().then((employers)=>{
//                     return employers;
//                 })
//             }
//         },
//         //Get a User
//         user:{
//             type: UserType,
//             args: {id:{type: GraphQLID}},
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 return User.findByPk(args.id);
//             }
//         },
//         //Get all Users
//         Users:{
//             type: new GraphQLList(EmployerType),
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 return User.findAll().then((users)=>{
//                     return users;
//                 })
//             }
//         },
//         //Get a Joboffer -1
//         joboffer:{
//             type: JobOfferType,
//             args: {id:{type: GraphQLID}},
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 return Joboffer.findByPk(args.id).then((jo)=>{
//                     return jo;
//                 });
//             }
//         },
//         //Get all Joboffer of a cathegory -0
//         alljoboffer:{
//             type: new GraphQLList(JobOfferType),
//             args: {cathegory:{type: GraphQLInt}},
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 return Joboffer.findAll({where:{cathegory: args.cathegory}}).then((jo)=>{
//                     return jo;
//                 });
//             }
//         },
//         //Get all JobOffer -1
//         joboffers:{
//             type: new GraphQLList(JobOfferType),
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 if(logeduser){
//                     return Joboffer.findAll().then((joboffer)=>{
//                         return joboffer
//                     });
//                 }
//             }
//         },
//         //Get all JobApplication -1
//         getApplication:{
//             type: new GraphQLList(ApplicationType),
//             args: {id: {type: GraphQLID}},
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 return Application.findAll({where: {user_id: args.id}});
//             }
//         },
//         //Get all Jobs for a user
//         getUserJobs:{
//             type: new GraphQLList(JobOfferType),
//             args: {id: {type: GraphQLID}},
//             async resolve(parent,args,{auth}){
//                 const logeduser = await getUser(auth);
//                 // return Joboffer.findAll({where: {}})
//                 return User.findByPk(args.id,{include: Joboffer }).then((res)=>{
//                     if(res){
//                         // res.Jobbodies.map((item)=>{
//                         //     req.push(item.description);
//                         // })
//                         // return req;
//                         return res.Joboffers;
//                     }
//                 });
//             }
//         },
//         //Get all requirments bodies
//         getRequirments:{
//             type: new GraphQLList(JobBodyType),
//             resolve(parent,args,{auth}){
//                 return Jobbody.findAll({where: {type:1}});
//             }
//         },
//         //Get all Benefits bodies
//         getBinefits:{
//             type: new GraphQLList(JobBodyType),
//             resolve(parent,args,{auth}){
//                 return Jobbody.findAll({where: {type:2}});
//             }
//         },
//         //Get all Tasks bodies
//         getTasks:{
//             type: new GraphQLList(JobBodyType),
//             resolve(parent,args,{auth}){
//                 return Jobbody.findAll({where: {type:3}});
//             }
//         },
//         //get User
//         getUser:{
//             type: UserType,
//             async resolve(parent,args,{auth}){
//                 const res = await getUser(auth)
//                 let user = await User.findOne({
//                     where:{
//                         id: res.id
//                     }
//                 }).then((res)=>{
//                     return res
//                 });
//                 if(!user){
//                     user = await Employer.findOne({
//                         where:{
//                             id: res.id
//                         }
//                     }).then((res)=>{
//                         return res
//                     });
//                     user.dataValues = {...user.dataValues, role:"Employer"}
//                 }else{
//                     user.dataValues = {...user.dataValues, role:"JobSeeker"}
//                 }
//                 console.log(user)
//                 return user.dataValues
//             }
//         },
//     }
// });

// const Mutations = new GraphQLObjectType({
//     name: 'mutations',
//     fields:{
//         //Add an Employer
//         addEmployer:{
//             type: EmployerType,
//             args: {
//                 name:{type: GraphQLNonNull(GraphQLString)},
//                 email:{type: GraphQLNonNull(GraphQLString)},
//                 phone:{type: GraphQLNonNull(GraphQLString)},
//                 addresse:{type: GraphQLNonNull(GraphQLString)},
//                 password:{type: GraphQLNonNull(GraphQLString)},
//                 birthdate:{type: GraphQLNonNull(GraphQLString)},
//                 bio:{type: GraphQLNonNull(GraphQLString)}
//             },
//             async resolve(parent,args){
//                 // check if that user already exists.
//                 const user = await Employer.findOne({
//                     where: {
//                         [Op.or]:[
//                             {name: args.name},
//                             {email: args.email}
//                         ]
//                     }
//                 }).then((res)=>{
//                     return res
//                 });

//                 if (user) return new Error('this user and email is already taken!');
//                 const password = await bcrypt.hash(args.password,10).then((res)=>{
//                     return res;
//                 });
//                 const res = Employer.create({
//                     ...args,
//                     password: password
//                 }).catch((err)=>{
//                     if(err){console.log(err);}
//                 })
//                 const token = getToken(res)
//                 return res;
//             }
//         },
//         //Remove an Employer
//         removeEmployer:{
//             type: EmployerType,
//             args: {id:{type: GraphQLID}},
//             resolve(parent,args){
//                 const res = Employer.findByPk(args.id)
//                 Employer.destroy({where: {id: args.id}}).catch((err)=>{
//                     if(err){console.log(err);}
//                 });
//                 return res;
//             }
//         },
//         //Update an Employer
//         updateEmployer:{
//             type: EmployerType,
//             args: {
//                 id:{type: GraphQLID},
//                 name:{type: GraphQLNonNull(GraphQLString)},
//                 email:{type: GraphQLNonNull(GraphQLString)},
//                 phone:{type: GraphQLNonNull(GraphQLString)},
//                 addresse:{type: GraphQLNonNull(GraphQLString)},
//                 password:{type: GraphQLNonNull(GraphQLString)},
//                 birthdate:{type: GraphQLNonNull(GraphQLString)},
//                 bio:{type: GraphQLNonNull(GraphQLString)}
//             },
//             resolve(parent,args){
//                 Employer.update(args, {where: {id: args.id}});
//                 return Employer.findByPk(args.id);
//             }
//         },
//         //Add a User -1
//         addUser:{
//             type: GraphQLString,
//             args: {
//                 name:{type: GraphQLNonNull(GraphQLString)},
//                 email:{type: GraphQLNonNull(GraphQLString)},
//                 phone:{type: GraphQLNonNull(GraphQLString)},
//                 addresse:{type: GraphQLNonNull(GraphQLString)},
//                 password:{type: GraphQLNonNull(GraphQLString)},
//                 birthdate:{type: GraphQLNonNull(GraphQLString)},
//                 bio:{type: GraphQLNonNull(GraphQLString)},
//                 cathegory:{type: GraphQLNonNull(GraphQLInt)}
//             },
//             async resolve(parent,args){
//                 // check if that user already exists.
//                 const user = await User.findOne({
//                     where: {
//                         [Op.or]:[
//                             {name: args.name},
//                             {email: args.email}
//                         ]
//                     }
//                 }).then((res)=>{
//                     return res
//                 });

//                 if (user) return new Error('this user and email is already taken!');
//                 const password = await bcrypt.hash(args.password,10).then((res)=>{
//                     return res;
//                 });
//                 const res = User.create({
//                     ...args,
//                     password: password
//                 }).catch((err)=>{
//                     if(err){console.log(err);}
//                 })
//                 const token = getToken(res)
//                 return res;
//             }
//         },
//         //login User -1
//         userlogin:{
//             type: UserType,
//             args:{
//                 name:{type: GraphQLNonNull(GraphQLString)},
//                 password:{type: GraphQLNonNull(GraphQLString)},
//             },
//             async resolve(parent,args){
//                 let user = await User.findOne({
//                     where: {
//                         [Op.or]:[
//                             {name: args.name},
//                             {email: args.name}
//                         ]
//                     }
//                 }).then((res)=>{
//                     return res
//                 });

//                 if (!user){
//                     user = await Employer.findOne({
//                         where: {
//                             [Op.or]:[
//                                 {name: args.name},
//                                 {email: args.name}
//                             ]
//                         }
//                     }).then((res)=>{
//                         return res
//                     });
//                     if(!user){throw new Error('this user is not found!')}
//                     else user.dataValues = {...user.dataValues, role:"Employer"}
//                 }else{
//                     user.dataValues = {...user.dataValues, role:"JobSeeker"}
//                 };
//                 const match = await bcrypt.compare(args.password, user.password);
//                 if (!match) throw new Error('wrong password!');

//                 const token = getToken(user);
//                 return {...user.dataValues,token:token};
//             } 
//         },
//         //Remove a user -1
//         removeUser:{
//             type: UserType,
//             args: {id:{type: GraphQLID}},
//             resolve(parent,args){
//                 const res = User.findByPk(args.id)
//                 User.destroy({where: {id: args.id}}).catch((err)=>{
//                     if(err){console.log(err);}
//                 });
//                 return res;
//             }
//         },
//         //Update a user -1
//         updateUser:{
//             type: UserType,
//             args: {
//                 id:{type: GraphQLID},
//                 name:{type: GraphQLNonNull(GraphQLString)},
//                 email:{type: GraphQLNonNull(GraphQLString)},
//                 phone:{type: GraphQLNonNull(GraphQLString)},
//                 addresse:{type: GraphQLNonNull(GraphQLString)},
//                 password:{type: GraphQLNonNull(GraphQLString)},
//                 birthdate:{type: GraphQLNonNull(GraphQLString)},
//                 bio:{type: GraphQLNonNull(GraphQLString)},
//                 cathegory:{type: GraphQLNonNull(GraphQLInt)}
//             },
//             resolve(parent,args){
//                 User.update(args, {where: {id: args.id}});
//                 return User.findByPk(args.id);
//             }
//         },
//         //Add a job offer -1
//         addjoboffer:{
//             type: JobOfferType,
//             args:{
//                 employerId:{type: GraphQLNonNull(GraphQLInt)},
//                 title:{type: GraphQLNonNull(GraphQLString)},
//                 description:{type: GraphQLNonNull(GraphQLString)},
//                 cathegory:{type: GraphQLNonNull(GraphQLInt)},
//                 dateline:{type: GraphQLNonNull(GraphQLString)},
//                 requirements:{type: GraphQLList(GraphQLInt)},
//                 benefits:{type: GraphQLList(GraphQLInt)},
//                 tasks:{type: GraphQLList(GraphQLInt)},
//             },
//             async resolve(parent,args,{auth}){
//                 const res = await getUser(auth)                
//                 // args.requirements.map((i)=>console.log(i));
                
//                  const newJob = await Joboffer.create({
//                      employerId: args.employerId,
//                      title: args.title,
//                      description: args.description,
//                      cathegory: args.cathegory,
//                      dateline: args.dateline
//                  }).then((res)=>{
//                     return res
//                  });

//                  console.log(newJob)

//                  if(args.requirements && args.requirements.length > 0){
//                     args.requirements.map((id)=>{
//                         Jobdesc.create({
//                            job_offer_id: newJob.dataValues.id,
//                            job_body_id: id
//                         });
//                     });
//                  }

//                  if(args.benefits && args.benefits.length > 0){
//                     args.benefits.map((id)=>{
//                         Jobdesc.create({
//                            job_offer_id: newJob.dataValues.id,
//                            job_body_id: id
//                         });
//                     });
//                  }

//                  if(args.tasks && args.tasks.length > 0){
//                     args.tasks.map((id)=>{
//                         Jobdesc.create({
//                            job_offer_id: newJob.dataValues.id,
//                            job_body_id: id
//                         });
//                     });
//                  }
//                  return newJob
//             }
//         },
//         //Update a job offer -1
//         updatejoboffer:{
//             type:JobOfferType,
//             args:{
//                 id:{type: GraphQLNonNull(GraphQLID)},
//                 employerId:{type: GraphQLNonNull(GraphQLID)},
//                 title:{type: GraphQLNonNull(GraphQLString)},
//                 description:{type: GraphQLNonNull(GraphQLString)},
//                 cathegory:{type: GraphQLNonNull(GraphQLInt)},
//                 dateline:{type: GraphQLNonNull(GraphQLString)},
//             },
//             async resolve(parent,args,{auth}){
//                 const res = await getUser(auth)

//                 return Joboffer.update({
//                     id: args.id,
//                     employerId: args.employerId,
//                     title: args.title,
//                     description: args.description,
//                     cathegory: args.cathegory,
//                     dateline: args.dateline,
//                 });
//             }
//         },
//         //Remove a job offer -1
//         removejoboffer:{
//             type:JobOfferType,
//             args:{
//                 id:{type: GraphQLNonNull(GraphQLID)},
//             },
//             async resolve(parent,args,{auth}){
//                 const res = await getUser(auth)
//                 Joboffer.destroy({
//                     where: {
//                         id: args.id,
//                     }
//                 });

//                 Jobdesc.destroy({
//                     where:{
//                         job_offer_id: args.id,
//                     }
//                 });

//                 return {id:0};
//             }
//         },
//         //create a job body
//         createjobbody:{
//             type: JobBodyType,
//             args:{
//                 description: {type: GraphQLNonNull(GraphQLString)},
//                 type: {type: GraphQLNonNull(GraphQLInt)}
//             },
//             resolve(parent,args){
//                 return Jobbody.create(args);
//             }
//         },
//         //Delete a job body
//         deletejobbody:{
//             type: JobBodyType,
//             args:{
//                 id: {type: GraphQLNonNull(GraphQLID)},
//                 description: {type: GraphQLNonNull(GraphQLString)}
//             },
//             resolve(parent,args){
//                 const res = Jobbody.findByPk(args.id)
//                 Jobbody.destroy({where: {id: args.id}}).catch((err)=>{
//                     if(err){console.log(err);}
//                 });
//                 return res;
//             }
//         },
//         //add some body to a job offer
//         addoffertobody:{
//             type: JobDescType,
//             args:{
//                 job_offer_id: {type: GraphQLNonNull(GraphQLInt)},
//                 job_body_id: {type: GraphQLNonNull(GraphQLInt)}
//             },
//             resolve(parent,args){
//                 return Jobdesc.create({
//                     job_body_id: args.job_body_id,
//                     job_offer_id: args.job_offer_id
//                 });
//             }
//         },
//         //Remove some body from a job offer
//         removeoffertobody:{
//             type: JobDescType,
//             args:{
//                 job_offer_id: {type: GraphQLNonNull(GraphQLID)},
//                 job_body_id: {type: GraphQLNonNull(GraphQLID)}
//             },
//             resolve(parent,args){
//                 const item = Jobdesc.findOne({
//                     where: {
//                         job_body_id: args.job_body_id,
//                         job_offer_id: args.job_offer_id
//                     }
//                   });
                
//                 Jobdesc.destroy({
//                     where: {
//                         job_body_id: args.job_body_id,
//                         job_offer_id: args.job_offer_id
//                     }
//                 }).catch((err)=>{
//                     if(err){console.log(err);}
//                 });

//                 return item;
//             }
//         },
//         //Apply to a job offer -1
//         apply:{
//             type: ApplicationType,
//             args:{
//                 user_id: {type: GraphQLNonNull(GraphQLInt)},
//                 job_id: {type: GraphQLNonNull(GraphQLInt)}
//             },
//             async resolve(parent,args,{auth}){
//                 const res = await getUser(auth)
//                 return Application.create({
//                     user_id: args.user_id,
//                     job_id: args.job_id
//                 }).then((res)=>{
//                     return res
//                 });
//             }
//         },
//         //Remove an application to a job offer -1
//         removeApplication:{
//             type: JobDescType,
//             args:{
//                 job_id: {type: GraphQLNonNull(GraphQLID)},
//                 user_id: {type: GraphQLNonNull(GraphQLID)}
//             },
//             resolve(parent,args){
//                 const item = Application.findOne({
//                     where: {
//                         user_id: args.user_id,
//                         job_id: args.job_id
//                     }
//                   });
                
//                 Application.destroy({
//                     where: {
//                         user_id: args.user_id,
//                         job_id: args.job_id
//                     }
//                 }).catch((err)=>{
//                     if(err){console.log(err);}
//                 });

//                 return item;
//             }
//         }
//     }
// });

// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation:Mutations
// })
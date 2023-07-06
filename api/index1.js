const express = require("express");
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema');
const port = process.env.PORT || 5000;
const cors = require('cors')
const app = express();
const db = require('../models');
const {Employer,Joboffer,Jobbody,Jobdesc,User} = require("../models");
// const {} = require("../models");
// const {} = require("../models");

Employer.hasMany(Joboffer, {foreignKey: 'employerId'});
Joboffer.belongsTo(Employer);

User.belongsToMany(Joboffer, {through: 'applications' ,foreignKey: 'user_id'});
Joboffer.belongsToMany(User, {through: 'applications' ,foreignKey: 'job_id'});

Jobbody.belongsToMany(Joboffer, { through: 'jobdescs' ,foreignKey: 'job_body_id' });
Joboffer.belongsToMany(Jobbody, { through: 'jobdescs' ,foreignKey: 'job_offer_id' });

Joboffer.hasMany(Jobdesc,{foreignKey: 'job_offer_id'});
Jobdesc.belongsTo(Joboffer);

app.use(cors());

app.use('/graphql',graphqlHTTP((req,res,graphQLParams)=>{
    return {
        schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: {
            auth: req.headers.authorization || '',
        }
    }
}));

db.sequelize.sync().then((res)=>{
    app.listen(port,console.log(`Server running on  http://localhost:${port}/graphql/`));
});

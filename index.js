const express = require("express")
require('dotenv').config()
const routes = require('./routes/routes')
const port = process.env.PORT || 4000
const cors = require('cors')
const app = express()
const db = require('./models')
const JobOffer = require("./models")

app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use("/",(req,res)=>{
//     res.send('Express on vercel')
// })

app.use('/',routes)

db.sequelize.sync().then((res)=>{
    app.listen(port,console.log(`Server running on  http://localhost:${port}/`));
});

module.exports = app
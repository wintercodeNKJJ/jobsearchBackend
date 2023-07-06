const express = require('express');
const userController = require('../Controller/UserController')
const jobController = require('../Controller/JobController')
const appliController = require('../Controller/appliController')

const router = express.Router()

// user routes
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/upateUser/:id',userController.update)
router.post('/removeUser/:id',userController.remove)
router.post('/user',userController.getaUser)

// job routes
router.get('/job/:id',jobController.getOne)
router.get('/jobs',jobController.getAll)
router.post('/createJob',jobController.create)
router.put('/editJob/:id',jobController.edit)
router.delete('/deleteJob',jobController.removeOne)

// Job Application
router.post('/jobApplied',jobController.jobsApplied)

// Jobs created by an Employer
router.post('/createdJobs',jobController.jobsCreated)

// application routes
router.post('/apply',appliController.create)
router.get('/application/:id',appliController.getOne)
router.post('/application/all',appliController.getAll)
router.delete('/deletApplication',appliController.removeOne)
router.post('/getApplicants',appliController.getApplicantstoJob)

// application Managment
router.get('/handleApp',appliController.handleApp)

module.exports = router
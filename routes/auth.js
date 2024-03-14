const express=require('express')
const router= express.Router()
const{login,regiester}=require('../controllers/auth')
router.post('/regiester',regiester)
router.post('/login',login)
module.exports= router
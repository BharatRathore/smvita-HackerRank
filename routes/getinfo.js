const express=require('express')
const router=express.Router()
const userInfo=require('../models/saveinfo')


router.get('/',(req,res)=>{
    userInfo.find()
    .then(alldata=>{
        res.json(alldata)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=router
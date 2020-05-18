const express=require('express')
const mongoose=require('mongoose')
const login=require('../models/login')
const axios=require('axios')
const router=express.Router()
require('dotenv/config')

router.post('/',(req,res)=>{
    userid=req.body.userid
    password=req.body.password
    console.log(userid,password)
    login.find({
        $and:[
            {userid:userid},
            {password:password}
        ]
    }).countDocuments().then(count=>{
        if(count!=0){
            res.send({
                valid:true,
                key:process.env.key
            })
        }
        else{
            res.send({
                valid:false,
                
            })
        }
    })
})

module.exports=router

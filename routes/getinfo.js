const express=require('express')
const router=express.Router()
const userInfo=require('../models/saveinfo')
require('dotenv/config')

router.get('/:key',(req,res)=>{
    if(req.params.key==process.env.key){
        userInfo.find()
    .then(alldata=>{
        res.json(alldata)
    })
    .catch(err=>{
        console.log(err)
    })
    }
    else{
        res.send("Unauthorized...")
    }
    
})

module.exports=router

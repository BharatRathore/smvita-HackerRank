const express=require('express')

const login=require('../models/saveinfo')

const router=express.Router()

router.post('/',(req,res)=>{
    prn_no=req.body.prn_no
    password=req.body.password
    console.log(prn_no,password)
    login.find({
        $and:[
            {prn_no:prn_no},
            {password:password}
        ]
    }).countDocuments().then(count=>{
        if(count!=0){
            login.find({
                $and:[
                    {prn_no:prn_no},
                    {password:password}
                ]
            }).then(doc=>{
                res.send({valid:true,data:doc[0]})
            })
        }
        else{
            res.send({
                valid:false
            })
        }
    })
})

module.exports=router
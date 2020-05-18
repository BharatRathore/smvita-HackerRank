const express=require('express')

const login=require('../models/saveinfo')

const router=express.Router()

router.post('/',(req,res)=>{
    //console.log(req.body.course)
    prn_no=req.body.prn_no
    password=req.body.password
    course=req.body.course
    //console.log(prn_no,password)
    login.find({
        $and:[
            {prn_no:prn_no},
            {password:password},
            {course:course}
        ]
    }).countDocuments().then(count=>{
        if(count!=0){
            login.find({
                $and:[
                    {prn_no:prn_no},
                    {password:password},
                    {course:course}
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
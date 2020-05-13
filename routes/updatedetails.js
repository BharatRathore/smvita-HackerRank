const express=require('express')
const router=express.Router()
const userInfo=require('../models/saveinfo')
const axios=require('axios')
let badgeInfo={}

router.put('/',async (req,res)=>{
    let c=await userInfo.find({_id:{$nin:req.body.id},
        $or:[
            {prn_no:req.body.prn_no},
            {hackerRankId:req.body.hid},
            {githubId:req.body.gid}
        ]}).countDocuments()
    if(c==0){
        let update= await userInfo.findByIdAndUpdate(
            req.body.id,{
                $set:{
                    full_name:req.body.name,
                    prn_no:req.body.prn_no,
                    hackerRankId:req.body.hid,
                    githubId:req.body.gid,
                    password:req.body.password
                }
            },
            {useFindAndModify:false,new:true},
            function(err,doc){
                if(err){
                    console.log(err)
                }
                else{
                    res.send({
                        valid:true,
                        message:"Updated Successfully"
                    })
                }
            }
        )
        

    }
    else{
        res.send({
            valid:false,
            message:"PRN , Github or HackerRank ID already exists"
        })
    }
    
})

module.exports=router
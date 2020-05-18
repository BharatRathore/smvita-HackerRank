const express=require('express')
const router=express.Router()
const userInfo=require('../models/saveinfo')


router.put('/',async (req,res)=>{
    //console.log(req.body.id)
    let id=0;
    if(req.body.id){
        id= await userInfo.find({_id:req.body.id}).countDocuments()
    }
    if(id!=0){
        let c=await userInfo.find({_id:{$nin:req.body.id},
            course:req.body.course,
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
                        console.log(req.body.name + " Updated")
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
    }
    else{
        res.sendStatus(403).send({message:"Invalid"})
    }
    
    
    
})

module.exports=router
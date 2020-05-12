const express=require('express')
const router=express.Router()
const userInfo=require('../models/saveinfo')
const axios=require('axios')
let badgeInfo={}
let url='https://hackerrank-badges.herokuapp.com/api/'

router.post('/',(req,res)=>{
    let newurl=""
    let prn=req.body.prn_no
    userInfo.find({
        $or:[
            {prn_no:prn},
            {hackerRankId:req.body.hackerrankid}
        ]
    }).countDocuments().then(count=>{
        if(count==0){
            newurl=url+req.body.hackerrankid
            newurl=newurl.toLowerCase()
            //console.log(newurl)
            axios.get(newurl)
                .then(response=>{
                    
                    if (response.data.status=="OK"){
                        const data=response.data
                        const user = new userInfo({
                            prn_no:req.body.prn_no,
                            hackerRankId:req.body.hackerrankid,
                            githubId:req.body.githubid,
                            full_name:req.body.full_name,
                            course:req.body.course,
                            badgeInfo:data 
                        })
                        
                         badgeInfo=data
                         //res.status(200).send(badgeInfo)
                        user.save()
                        .then(()=>{
                            res.status(200).send(badgeInfo)
                            console.log("Saved in DB : "+req.body.full_name)
                        })
                        .catch((err)=>{
                            console.log("Error:",err)
        
                        })
                    }
                    else{
                        res.send({
                            error:"0",
                            message:"Wrong User ID"
                        })
                    }
                    
                    
                })
        }
        else{
            res.send({
                error:"0",
                message:"PRN or HackerRankID already exists"
            })
        }
    })
   

    
    
})

module.exports=router
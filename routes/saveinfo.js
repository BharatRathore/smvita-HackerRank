const express=require('express')
const router=express.Router()
const userInfo=require('../models/saveinfo')
const axios=require('axios')
let badgeInfo={}
let url='https://hackerrank-badges.herokuapp.com/api/'

router.post('/',(req,res)=>{
    let newurl=""
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
                    full_name:req.body.full_name,
                    course:req.body.course,
                    badgeInfo:data 
                })
                
                 badgeInfo=data
                 res.status(200).send(badgeInfo)
                user.save()
                .then(()=>{
                    res.status(200).send(badgeInfo)
                    console.log("Saved in DB")
                })
                .catch((err)=>{
                    console.log("Error:",err)

                })
            }
            else{
                res.send("0")
            }
            
            
        })

    
    
})

module.exports=router
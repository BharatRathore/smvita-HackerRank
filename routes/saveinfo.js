const express=require('express')
const router=express.Router()
const userInfo=require('../models/saveinfo')
const axios=require('axios')
let badgeInfo={}
let url='https://hackerrank-badges.herokuapp.com/api/'

router.post('/',(req,res)=>{
    
    let newurl=url+req.body.hackerrankid
    newurl=newurl.toLowerCase()
    
    axios.get(newurl)
        .then(response=>{
            console.log(response.data)
            if (response.data.status=="OK"){
                const user = new userInfo({
                    prn_no:req.body.prn_no,
                    hackerRankId:req.body.hackerrankid,
                    full_name:req.body.full_name,
                    badgeInfo:response.data
                    
                    
                })
                // user.save()
                // .then(()=>{
                //     console.log("Saved in DB")
                // })
                // .catch((err)=>{
                //     console.log("Error:",err)
                // })
                let userResponse=response.data
                userResponse.error=false
                userResponse.name=req.body.full_name
                userResponse.prn=req.body.prn_no
                res.send(userResponse)
            }
            else{
                res.send("0")
            }
            newurl=""
            
        })

    
    
})

module.exports=router
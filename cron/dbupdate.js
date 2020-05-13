var cron = require('node-cron');
//const mongoose = require('mongoose')
const _=require('underscore')


//const hidUpdate=new mongoose.Schema({hackerRankId:String,badgeInfo:Object})


//const dbupdatecron=mongoose.model('hackerrankdbs',hidUpdate,'hackerrankdbs')
const dbupdatecron=require('../models/saveinfo')

let url='https://hackerrank-badges.herokuapp.com/api/'
const axios=require('axios')

cron.schedule('* * * * *',dbupdate) //DAILY updates at 12:30 AM UTC (6:00 AM IST)

    function dbupdate(){
        console.log("Update started :" + new Date())
        dbupdatecron.find({},{hackerRankId:1,badgeInfo:1,_id:1}).then(data=>{

        var i = 0;
        const l=data.length
        var intervalId = setInterval(function(){
           if(i == l-1){
              
            console.log("Last")  
              clearInterval(intervalId);
           }
            let a=data[i]
            let newurl=url+a.hackerRankId
            
            axios.get(newurl).then(badgeData=>{
                
                return badgeData.data

            }).then(data=>{
                if(data.status!="ERROR" && !_.isEqual(data,a.badgeInfo)){
                    dbupdatecron.findByIdAndUpdate(
                        a._id,
                        {$set:
                         {
                             'badgeInfo':data
                             
                         }
                        },
                        {useFindAndModify:false,new:true}
                        ,function(err, doc) {
                         console.log(a.hackerRankId + " Updated at " + new Date());
                         
                         
                     },
                     
                     
                        )
                }
                
               
            }).catch(err=>{
                console.log(err)
            })
           i++;
        }, 5000);
        
    }
    )
    
}

    
      


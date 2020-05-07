var cron = require('node-cron');
const mongoose = require('mongoose')
const fetch=require('node-fetch')

const hidUpdate=new mongoose.Schema({hackerRankId:String,badgeInfo:Object})

const dbupdatecron=mongoose.model('hackerrankdbs',hidUpdate,'hackerrankdbs')
let url='https://hackerrank-badges.herokuapp.com/api/'
const axios=require('axios')
let hids=[]

    dbupdatecron.find({},{hackerRankId:1,_id:1}).then(data=>{

        var i = 0;
        const l=data.length
        var intervalId = setInterval(function(){
           if(i == l-1){
              clearInterval(intervalId);
           }
            let a=data[i]
            let newurl=url+a.hackerRankId
            console.log(a._id)
            axios.get(newurl).then(badgeData=>{
                console.log(newurl)
                return badgeData.data

            }).then(data=>{
                console.log(data)
               dbupdatecron.findByIdAndUpdate(
                   a._id,
                   {$set:
                    {
                        'badgeInfo':data
                    }
                   },function(err, doc) {
                    console.log(doc);
                }
                   )
            })
           i++;
        }, 5000);



            
        
    
    })
    
      


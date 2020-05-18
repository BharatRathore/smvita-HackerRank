const mongoose=require('mongoose')

const hackerRankdb=mongoose.Schema({
    prn_no:String,
    hackerRankId:String,
    githubId:String,
    full_name:String,
    course:String,
    badgeInfo:Object,
    password:String
    
    
},
{timestamps: true} )

module.exports=mongoose.model('hackerRankdb',hackerRankdb)
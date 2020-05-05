const mongoose=require('mongoose')

const hackerRankdb=mongoose.Schema({
    prn_no:String,
    hackerRankId:String,
    full_name:String,
    course:String,
    badgeInfo:Object
    
})

module.exports=mongoose.model('hackerRankdb',hackerRankdb)
const express=require('express')
const mongoose=require('mongoose')
//require('./cron/dbupdate')
const getInfo=require('./routes/getinfo')
const saveInfo=require('./routes/saveinfo')
const updateDetails=require('./routes/updatedetails')
const login=require('./routes/login')
const studentLogin=require('./routes/studentLogin')
const app=express()

let port = process.env.PORT || 3000;

var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static('public'));

require('dotenv/config')




mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("Connected to MongoDB!!!")
})

//app.use('/getinfo',getInfo)
app.use('/getinfo',getInfo)
app.use('/saveinfo',saveInfo)
app.use('/login',login)
app.use('/studentLogin',studentLogin)
app.use('/updatedetails',updateDetails)

app.listen(port, () => {
    console.log("Running on port " + port);
  });
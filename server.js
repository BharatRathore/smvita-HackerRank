const express=require('express')
const mongoose=require('mongoose')

const getInfo=require('./routes/getinfo')
const saveInfo=require('./routes/saveinfo')
const login=require('./routes/login')
const app=express()

var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static('public'));

require('dotenv/config')




mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("Connected yoo!!!!!!")
})

//app.use('/getinfo',getInfo)
app.use('/getinfo',getInfo)
app.use('/saveinfo',saveInfo)
app.use('/login',login)

app.listen(3000,"0.0.0.0")
const express = require('express')
const mongoose=require('mongoose')

const adminlogin=new mongoose.Schema({})

module.exports=mongoose.model('admin',adminlogin,'admin')
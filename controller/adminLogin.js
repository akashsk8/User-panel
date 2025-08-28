const adminSchema = require('../model/adminUser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()

app.use(cookieParser())

const adminLogin = async (email,password,res,req)=>{
    let admin = await adminSchema.findOne({email})
    req.session.admin = admin
    if(!admin){
        res.send('User not registerd')
    }
    else{
        bcrypt.compare(password , admin.password , (err,result)=>{
            if(err){
                res.send('incorrect password')
            }
            else{
                let token = jwt.sign({email: admin.email , id: admin._id},process.env.Secret)
                res.cookie('token' , token)
                res.redirect('/')
            }
        })
    }
}

module.exports = adminLogin
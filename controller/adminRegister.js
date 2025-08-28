const adminSchema = require('../model/adminUser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
app.use(cookieParser())

const adminRegister = async (username,email,password,age,res)=>{
    let admin = await adminSchema.findOne({email})
    if(admin){
        res.send('User already registered')
    }
    else{
        bcrypt.genSalt(10 , async (err,salt)=>{
            bcrypt.hash( password ,salt , async (err,hash)=>{
                let admin = new adminSchema({
                    username,
                    email,
                    password : hash,
                    age
                })
                await admin.save()
                let token = jwt.sign({email: admin.email , id: admin._id},process.env.Secret)
                res.cookie('token' , token)
                res.render('index' , {admin ,token})
            })
        })
    }
}

module.exports = adminRegister;
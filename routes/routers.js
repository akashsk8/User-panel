const express = require('express')
const adminReg = require('../controller/adminRegister')
const adminLog = require('../controller/adminLogin')
const addUser = require('../controller/addedUser')
const addModel = require('../model/addedUser')
const isLogin = require('../middleware/isLogin')
const router = express.Router()


router.get('/',(req,res)=>{
    let token = req.cookies.token
    const admin = req.session.admin
    res.render('index' , {token , admin})
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login' ,async (req,res)=>{
     const {email,password} = req.body;
     await adminLog(email,password,res,req)
})

router.get('/register' , (req,res)=>{
    res.render('register')
})
router.post('/register',async (req,res)=>{
    const { username,email,password,age } = req.body
    await adminReg(username,email,password,age,res)
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    let token = null
    req.session.token = token
    res.redirect('/')
})

router.get('/addUser', isLogin , (req,res)=>{
   res.render('addUser')
})

router.post('/addUser' , async (req,res)=>{
    const {firstname , lastname , email , city} = req.body;
    await addUser(firstname,lastname,email,city ,res)
})

router.get('/dashboard', isLogin , async (req,res)=>{
    const users = await addModel.find({})
    res.render('userDashboard' , {users})
})

router.get('/edit/:id' ,async (req,res)=>{
    let editUser = await addModel.findById(req.params.id)
    res.render('update' , {editUser})
})
router.post('/edit/:id', async (req,res)=>{
    const {firstname,lastname,email,city} = req.body;
    let updateUser = await addModel.findByIdAndUpdate(req.params.id,{firstname,lastname,email,city})
    await updateUser.save();
    res.redirect('/dashboard')
})
router.get('/delete/:id' , async (req,res)=>{
    await addModel.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
})
module.exports = router
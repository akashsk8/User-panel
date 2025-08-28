const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path')
const Db = require('./config/dbConection')
const routes = require('./routes/routers')
const session = require('express-session')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname , 'public')))
app.set('view engine' , 'ejs')
app.use(session({
  secret: 'alfa',
  resave: false,
  saveUninitialized: true
}))

app.use('/', routes)
app.use('/login', routes)
app.use('/register' , routes)
app.use('/logout' , routes)
app.use('/addUser' , routes)
app.use('/dashboard' , routes)

app.listen(5000, async (err)=>{
    await Db();
    console.log('App is running port no 5000')
})


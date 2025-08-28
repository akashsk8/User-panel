require('dotenv').config()
const mongoose = require('mongoose');

const DbConnection =  async ()=>{
    try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connection successfull")
    } catch(error){
        console.log("Connection faild ---> " , error)
    }
}

module.exports = DbConnection;
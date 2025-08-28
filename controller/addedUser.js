const addedUserSchema = require('../model/addedUser')
const addedUser = async (firstname , lastname , email , city , res)=>{
    let exitingUser = await addedUserSchema.findOne({email})
    if(exitingUser){
        res.send('This email is already added')
    }
    else{
        let addNewUser = new addedUserSchema({
            firstname,
            lastname,
            email,
            city
        })
        await addNewUser.save();
        res.redirect('/dashboard')
    }
}

module.exports = addedUser; 
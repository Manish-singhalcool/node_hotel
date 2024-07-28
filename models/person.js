const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
//const { Schema } = mongoose;


const personSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef','waiter','manager']
    },
    username: {
        type: String,
        required:true
    }, 
    password: {
        type: String,
        required:true
    },

   

});

    personSchema.pre('save', async  function(next){
        const parson=this;
        if(!parson.isModified('password'))  return next();
        try{
            // hash password generation
            const salt = await bcrypt.genSalt(10);
            // hash password
            const hasPassword= await bcrypt.hash(parson.password,salt);
            parson.password=hasPassword;
            next()
        }catch(err){
            return next(err);
        }
            
    });
    personSchema.methods.comparePassword = async function(candidatePassword){
        try{
            const isMatch = await bcrypt.compare(candidatePassword, this.password);
            return isMatch;
        } catch(err){
            throw err;

        }
    }
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
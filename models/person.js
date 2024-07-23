const mongoose= require('mongoose');
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
    }

});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
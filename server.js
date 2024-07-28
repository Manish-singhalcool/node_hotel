const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const personLink = require('./routes/personRoutes');
const menuLink = require('./routes/menuRoutes');
const passport = require('./auth.js');
const port = process.env.PORT || 3000;


    // local ek Strategy h
        app.use(passport.initialize());
        const loadAuthMiddleware = passport.authenticate('local',{session:false}); 

    
    // middleware
    const loadRequest= (req,res,next)=>{
        console.log(`[${new Date().toLocaleString()}] request  made  to : ${req.originalUrl}`);
        next();
    }
    app.use(loadRequest);
    

    app.get('/home',(req,resp)=>{
        resp.send(`hello Home <br><a href="/about">Click Me </a>` )
    })
    app.get('/about',(req,resp)=>{
        resp.send('hello About <br><a href="/home">Click Me </a>')
    })
    
    app.use('/', personLink);
    app.use('/', menuLink);
   


app.listen(port, ()=>{
    console.log(`Example app listing on port ${port}`)
})

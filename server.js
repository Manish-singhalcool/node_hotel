const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const personLink = require('./routes/personRoutes');
const menuLink = require('./routes/menuRoutes');


    const port = 3000;
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
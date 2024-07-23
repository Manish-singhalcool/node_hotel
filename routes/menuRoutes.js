const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/menuItem');



 //menu Item
 router.post('/menuitem', async (res,resp)=>{
    try{
        const data =  res.body;
        const newMenu=new MenuItem(data);
        const response = await newMenu.save();
        resp.status(200).json(response)
    }catch(err){
        resp.status(500).json({err: 'Internal server error'});
    }
})
//get menu
router.get('/getMenu', async (res,resp)=>{
    try{
        const getMenu = await MenuItem.find();
        resp.status(200).json(getMenu);
    } catch(err){
        resp.status(500).json({err: 'Internal server error'});
    }
})
module.exports=router;
const express = require('express');
const router = express.Router();


    const Person = require('./../models/person');
    router.post('/person', async (req,resp)=>{
   
        try{
            const data = req.body;
            const newPerson = new Person(data);
            const response = await newPerson.save();
            console.log('data saved');
            resp.status(200).json(response);
        } 
        catch(err){
            console.log(err);
            resp.status(500).json({err: 'internal server error'});
        }
    });
    router.get('/getPerson', async (req,resp)=>{

        try{
            const data = await Person.find();
            console.log('data Get');
            resp.status(200).json(data);
        } catch(err){
            console.log(err);
            resp.status(500).json({err: 'internal server error'});
        }
    });
    router.get('/getPerson/:workType', async (res,resp)=>{
       try{
         
        const workType = res.params.workType;
        //const workArray = ['chef','manager','waiter'];
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response= await Person.find({work:workType});
            if(response !=''){
                resp.status(200).json(response);
            }else{
                resp.status(404).json({error: 'Work not found'});
            }
            
        } else{
            resp.status(404).json({error: 'Work not found'});
        }
       } catch(err){
            resp.status(500).json({err:'Internal server error'});

       }
    });
    router.put('/person/:id', async(res,resp)=>{
        try{
            const parsonId= res.params.id;
            const bodyData= res.body;
            const response= await Person.findByIdAndUpdate(parsonId,bodyData,{
                new:true,
                runValidators:true,
            })
            if(!response){
                return resp.status(404).json({error: 'Person Not found'});
            }
            resp.status(200).json(response)
        }catch(err){
            resp.status(500).json({err:'Internal server error'});
        }
    })
    router.delete('/person/:id', async(req,res)=>{
        try{
            const paramId = req.params.id;
            const response = await Person.findByIdAndDelete(paramId); 
            if(!response){
                return res.status(404).json({error: 'Person Not found'});
            }
            res.status(200).json("delete sucsessfully");
        } catch(err){
            res.status(500).json({err:'Internal server error'});
        }
    })
    module.exports = router;


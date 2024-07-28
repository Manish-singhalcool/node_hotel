const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware , generateToken} = require('./../jwt');

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
    router.get('/getPerson',jwtAuthMiddleware, async (req,resp)=>{

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
    // sing up
    router.post('/person/signup', async(req,res)=>{
           
          try{
            const data = req.body;
            const newPerson = new Person(data);

            const response = await newPerson.save();
            console.log('data saved');
            const userPayload={
                id: response.id,
                name : response.username
            }
            const token = generateToken(userPayload)
            res.status(200).json({response: response , token:token});
          } catch(err){
              console.log(err);
              res.status(500).json({error: 'Internal server error'});

          }
    })
    // user login
    router.post('/person/login',async(req,res) => {
           try{
                const {username,password} = req.body;
                
                const user = await Person.findOne({ username : username})
                
                // if user does not exist or password does not match , return error
                if(!user || !(await user.comparePassword(password))){
                    return res.status(401).json({error : 'Invalid Username or password'})
                }

                // Generate token
                const payload = {
                    id : user.id,
                    username : user.username
                }
                const token = generateToken(payload);
                //console.log(token);
                res.json({token});
           }catch(err){
                console.log(err);
                res.status(500).json({error : 'Internal Server error'});
           }
    })
    // get user profile
    router.get('/person/profile',jwtAuthMiddleware, async(req,res) => {
       try{
        const data = req.user;
        const userId= data.id;
        //console.log(data);
        const userDetail= await Person.findById(userId);
        res.status(200).json({userDetail});
       } catch(err){
            console.log(err);
            res.status(500).json({error : 'Internal Server error'});
       }
    });
    module.exports = router;


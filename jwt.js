const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req,res,next) => {
    
    const authorization= req.headers.authorization;
    
    if(!authorization) return res.status(401).json({error : 'token not found'})
   
    
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error : 'Unauthorized' });
   
    try{
        //verify the jwt token
        const decode= jwt.verify(token , process.env.JWT_SECRET);
     
        //attach user ek key h aap isme or varible ka name bhi le sakte ho information to the request object
        req.user = decode;
        next();
    }catch(err){
        next(err);
    
        res.status(401).json({error: 'Invalid Token'});
    }
}

// Function to generate JWT token
const generateToken = (userData) => {
          return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});
}

module.exports = {jwtAuthMiddleware , generateToken};
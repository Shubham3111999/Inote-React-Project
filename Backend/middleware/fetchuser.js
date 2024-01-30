var jwt = require('jsonwebtoken');
const PrivateKey = "This is private key used in webtoken";

const fetchuser=(req,res,next)=>{
    // First verify token and get user id from token (from payload) and add to req body
    const token=req.header("auth-token");
    if (!token){
        res.status(401).send({error:"authenticate using valid token"});    
    }
    
    try {
        const data= jwt.verify(token,PrivateKey );                 //verify token and get the payload we send at the time of token creation
        req.user=data.user;                                      // modify the req 
    } catch (error) {
        res.status(401).send({error:"authenticate using valid token"}); 
    }
    

    next();                            //call the next middleware function
}

module.exports = fetchuser;
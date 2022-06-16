const jwt = require('jsonwebtoken')

const tokenverification = (req,res,next) =>
{    
    const auth = req.headers['authorization'];
    if(auth)
    {     
        const token = auth.split(' ')[1]

        if(token)
        {  
            console.log(token,"token verified")
            try{
                   var verification = jwt.verify(token,"Itsmy_secret_token")
                   next();
            }
            catch(err)
            {
                res.json({"error":err})        
            }
        }
    }
    else
    {
       res.json({message:"Not authorized"}) 
    }

}

module.exports = tokenverification;
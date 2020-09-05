const jwt = require('jsonwebtoken');

module.exports= (req,res ,next)=>{
    try{
        console.log("you are in server")
    const token = req.headers.authorization.spilt('Bearer ')[1];
    console.log("server auth"+token);
    jwt.verify(token,"this_is_secret_password");
    }
    catch(error){
        res.status(401).json({
            message:"Auth faild"
        });

    }
    

}
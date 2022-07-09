const jwt = require('jsonwebtoken')

exports.verifyToken = (req,res, next)=>{

    console.log(req.cookies)
    const token = req.cookies.isLogin;
    if(!token){
        res.status(401).json({message:"You are not authenticated"})
    }
    jwt.verify(token,process.env.JWT, (err, user)=>{
        if(err){
            res.status(403).json({message:"Token is not valid"});
        }
        req.user = user
        next()
    })
}
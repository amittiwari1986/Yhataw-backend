const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token;
    console.log(authHeader)
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SCRT,(err,user)=>{
            // if(err) res.status(403).json("Token is Not Valid...")
            req.user = user
            next()
        })
    }else{
        return res.status(401).json("You are not authenticated...")
    }
}



const verifyTokenAndAuthoreization = (req,res,next) =>{
    console.log(req);
    let id = req.params.id
    console.log("param id",id)
    verifyToken(req,res,()=>{
        if(id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Your are not allowed to do that !")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,()=>{
        let admin = req.params.id
        let id = req.user.id
        console.log("isAdmin Status",id)
        if(admin){
            next()
        }else{
            res.status(403).json("Your are not allowed to do that !")
        }
    })
}
module.exports = {verifyToken,verifyTokenAndAuthoreization,verifyTokenAndAdmin}
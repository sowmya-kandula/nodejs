//jsonwebtoken importing
const jwt=require("jsonwebtoken")

//middleware for checking token
const checkToken=(req,res,next)=>{
    let token=req.headers.authorization
    let s_token=token.split(" ")[1] //we are spliting the token so that bearer  and white space is removed 
    if(s_token==undefined)
    {
        return res.send({message:"unauthorized token"})
    }
    else{
        //if token exists verify the token
        jwt.verify(s_token,'abcdef',(err,data)=>{
            if(err){return res.send({message:"session expired... login again::(("})}
            else{
                next()
            }
        })
    }
}


//export middleware 
module.exports=checkToken
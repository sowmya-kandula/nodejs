//creating mini express
const exp=require('express')
const userapi=exp.Router(); //creates mini route 

//import the checktoken middleware
const checkToken=require('./middlewares/verifytoken')

userapi.use(exp.json())
//import mongoclient
const mc=require("mongodb").MongoClient;

//importing bcryptjs
const bcryptjs=require("bcryptjs")

//importing jsonwebtokens
const jwt=require("jsonwebtoken")

//importing express-aync-handler to handle errors
const expresserr=require("express-async-handler")

//importing cloudinary and all from middlewares folder
var upload=require("./middlewares/multer")

//sample route
userapi.get("/getusers",(req,res)=>
{   //using colobj here using req.app.get
    //readind docs from cloud 
    //find returns cursor to the data so to pack them into array we use toArray()
    let colobj=req.app.get("userobj")
    colobj.find().toArray((err,data)=>{
        if(err)
        {res.send({message:err.message})}
        else{
            res.send({message:data})
        }
    })

})

//getting specific users data
userapi.get("/getusers/:username",(req,res)=>
{   let un=req.params.username;
    let colobj=req.app.get("userobj")
    colobj.findOne({username:un},(err,user)=>
    {
        if(err){
            //console.log("err in reading ",user)
            res.send({message:err.message})
        }

        if(user==null)
        {    //console.log("err in null")
            res.send({message:"user not found"})
        }
        else
        {//console.log("else",user)
            res.send({message:user})
        }
    })
})


//adding users
userapi.post("/createuser",upload.single("photo"),expresserr(async(req,res)=>{
    let colobj=req.app.get("userobj")
    //let newuser=req.body
    let newuser=JSON.parse(req.body.userObj)
    let user = await colobj.findOne({username:newuser.username})
    if(user==null)
    {   //hashing the password
        let hashedPass= await bcryptjs.hash(newuser.password,7)

        //replace user's password with hashed password
        newuser.password=hashedPass
        //adding photo cdn link
        newuser.photo=req.file.path
        console.log(newuser)
        await colobj.insertOne(newuser)
        res.send({message:"user created"})
    }
    else{
        res.send({message:`user with username ${newuser.username} already exists`})
    }
}))
//updating specifuc users data
userapi.put("/updateuser/:username",(req,res,next)=>
{   let colobj=req.app.get("userobj")
    let updateduser=req.body
    colobj.findOne({username:updateduser.username},(err,user)=>
    {
        if(err){
            console.log("err in finding user")
        }
        if(user==null)
        { console.log("no user")
            res.send("no such user exists")
        }
        else{
            colobj.updateOne({username:updateduser.username},{$set:{...updateduser}},(err,data)=>
            {
                if(err)
                {
                    console.log("err in updating")
                }
                else
                { 
                    res.send("user updated")
                }
            })
        }
    })
})

//deleting user using promise
userapi.delete("/deleteuser/:username",(req,res,next)=>
{let colobj=req.app.get("userobj")
    let un=req.params.username
    colobj.findOne({username:un})
    .then(
        user=>{
            if(user==null)
            {
                res.send({message:`no such user with username ${un}`})
            }
            else{
                colobj.deleteOne({username:un})
                res.send({message:`user with username ${un} deleted`})
            }
        }
    )
    .catch(err=>{
        console.log("err in deleting user=",err)
    })
})
//deleting user using callbacks 
userapi.delete("/deleteuser/:username",(req,res,next)=>
{   let colobj=req.app.get("userobj")
    let un=req.params.username
    colobj.findOne({username:un},(err,user)=>
    {
        if(err)
        {
            console.log("error in finding user")
        }
        if(user==null)
        {
            res.send({message:"no such user exists"})
        }
        else{
            colobj.deleteOne({username:un},(err,success)=>
            {
                if(err)
                {
                    console.log("error in deleting user")
                }
                else{
                    res.send({message:"user deleted"})
                }
            })
        }
    })
})
//login using async await
userapi.post("/login",expresserr(async(req,res)=>{
    let colobj=req.app.get("userobj")
    let userobj=req.body
    let user =await colobj.findOne({username:userobj.username})
    if(user==null)
    {
        res.send({message:"INVALID USERNAME"})
    }
    else{
        //compare password
        let r= await bcryptjs.compare(userobj.password,user.password)
        if(r==false)
        {res.send({message:"INVALID PASSWORD"})}
        else{
            //create a token and send to client
            let user_token= jwt.sign({username:user.username},'abcdef',{expiresIn:10})
            res.send({message:"login success",token:user_token,username:user.username,user:user})
        }
    }
}))

//add to cart route
userapi.post("/add-to-cart",expresserr(async(req,res)=>{
    let proObj=req.app.get("usersproductsobj")
    let newobj=req.body
    let userProColObj=await proObj.findOne({username:newobj.username})
    if(userProColObj==null)
    {
        //create new obj and insert products into a list and add this obj to collection
        let products=[]
        products.push(newobj.productObj)
        let newobjtocol={username:newobj.username,cartProducts:products}
        await proObj.insertOne(newobjtocol)
        res.send({message:" product added to cart"})
    }
    else{
        //push new product to existing products array
        userProColObj.cartProducts.push(newobj.productObj)
        console.log(userProColObj)
        //update document
        await proObj.updateOne({username:newobj.username},{$set:{...userProColObj}})
        res.send({message:" product added to cart"})
    }
}))

//geetting products added to cart by user
userapi.get("/getCart/:username",expresserr(async(req,res)=>{
    let proObj=req.app.get("usersproductsobj")
    let un=req.params.username
    let cartObj=await proObj.findOne({username:un})
    if(cartObj==null)
    {
        res.send({message:"Cart empty"})
    }
    else{
        //console.log("in getacart",cartObj)
        res.send({message:cartObj})
    }
}))
//dummy route to create a protected resource
userapi.get("/testing",checkToken,(req,res)=>{
    res.send({message:"tring to access protected data"})
})
//export this object 
module.exports=userapi

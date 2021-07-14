//create mini express
const exp=require('express')
const proapi=exp.Router();//mini route

//json to js
proapi.use(exp.json())

//creating mongodb object
const mc= require("mongodb").MongoClient

//importing express-aync-handler to handle errors
const expresserr=require("express-async-handler")

//import cloudinary,multer(middleware),multer-storage-cloudinary
const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary")

const multer = require("multer")

//configureing cloudinary
cloudinary.config({

    cloud_name: "sowmya",
      api_key: "158958128746638",
    api_secret: "I8Vaip3y7dCHLo4Okg-mbs8rsnU",
  
  });

//configuring multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
        return {

        folder: 'backend',       
        public_id: file.fieldname + '-' + Date.now()

    }},

});

//configuring multer 
var upload = multer({ storage: storage });
/*
//databaseurl
let dburl="mongodb+srv://backend:backend@sowmya.mjms4.mongodb.net/backend?retryWrites=true&w=majority"

//connecting database
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>
{
    if(err)
    {console.log("error in connecting database=",err)}

    else
    {
        //create a database  object and collection object
        dbobj=client.db("backend")
        objcol=dbobj.collection("productcollection")
        console.log("database connection successfull in products-1.js file")
    }
})*/

//getting products using async and await

proapi.get("/getproducts",expresserr(async(req,res,next)=>
{
    let products= await objcol.find().toArray();
    res.send({message:products})
})
)

//getting products by mrp using async and await
proapi.get("/getproducts/:mrp",expresserr(async(req,res) => {
    let price=(+req.params.mrp)
    let product= await objcol.findOne({mrp:price})
    if(product==null)
    {res.send({message:`no product with mrp ${price}`})}

    else{
        res.send({message:product})
    }

}))

//creating user using async and await
proapi.post("/createProduct",upload.single("photo"),expresserr(async(req,res)=>{
    let objcol=req.app.get("productobj")
    let newproduct =JSON.parse(req.body.Productobj)
    //console.log(newproduct)
    let user= await objcol.findOne({name:newproduct.name})
    if(user==null)
    {newproduct.photo=req.file.path
        
        await objcol.insertOne(newproduct)
        res.send({message:"new product created"})
    }
    else{
        res.send({message:`product with name ${newproduct.name} already exits`})
    }
}))

//updating product using async and await
proapi.put("/updateProduct/:name",expresserr(async(req,res)=>
{
    let updated=req.body
    let product=await objcol.findOne({name:updated.name})
    if(product==null)
    {
        res.send(`no product with name ${updated.name} to update`)
    }
    else
    {
        await objcol.updateOne({name:updated.name},{$set:{...updated}})
        res.send({message:`product with name ${updated.name} updated`})
    }
}))

//deleting products by their username 
proapi.delete("/deleteProduct/:name",expresserr(async(req,res)=>
{
    let deleted=req.params.name
    let pro= await objcol.findOne({name:deleted})
    if(pro==null)
    {
        res.send({message:`no product with name ${deleted} to delete`})
    }
    else{
        await objcol.deleteOne({name:deleted})
        res.send({message:`product with name ${deleted} deleted`})
    }

}))
module.exports= proapi
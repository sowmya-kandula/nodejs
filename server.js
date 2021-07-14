const  exp=require('express')
const app=exp();
const port=2500
app.listen(port,()=>console.log(`server listening on ${port}`))
const path=require("path")

//connect angular to express server 
app.use(exp.static(path.join(__dirname,'./dist/connect')))

//import mongoclient
const mc=require("mongodb").MongoClient;

//database cloud connection string 
const databaseurl="mongodb+srv://backend:backend@sowmya.mjms4.mongodb.net/backend?retryWrites=true&w=majority"

//connect to Db
mc.connect(databaseurl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("error in db connection=",err)
    }
    else{
        //get database object
        let dbobj=client.db("backend")

        //creating collection object
        colobj=dbobj.collection("usercollection")
        objcol=dbobj.collection("productcollection")
        procol=dbobj.collection("usersproducts")
        app.set("userobj",colobj)
        app.set("productobj",objcol)
        app.set("usersproductsobj",procol)
        console.log("database connection successfull")
    }
})

//importing routes
const userapi=require("./APIS/user-api")
const productapi=require("./APIS/product-api")

//when user path is requested userapi will be loaded
app.use("/user",userapi)
app.use("/product",productapi)

//express
const express=require("express");
const app=express();
//layouts
const expressLayouts=require("express-ejs-layouts");
//dotenv
require("dotenv").config();
 //port 
 const PORT=process.env.PORT||3000

 //for req.body -> JSON
app.use(express.urlencoded({extended:true}))
//to use js and css file LOCATED -> PUBLIC
app.use(express.static("public"))
//ejs
app.set("view engine","ejs")
//ejs layout
app.use(expressLayouts);
//setting the layouts
app.set("layout","./layouts/main");
//express-sessiom
const session=require("express-session");

const fileUpload=require("express-fileupload");
const flash=require("connect-flash");


//config/objects used in sessions
const sessionConfig={
    
    secret:'thisisshiuldbeabettersecret!',
    resave:false,
    saveUninitialized:true,
    cookie:{
        //by default rahta then to
        httpOnly:true,
        //expiration dates
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }


}
//to use sessions
app.use(session(sessionConfig))

app.use(flash());
app.use(fileUpload());

//routes
const routes=require("./server/routes/reciepeRoutes.js");

app.use("/",routes);


app.listen(PORT,()=>{
    console.log(`SERVING ON PORT ${PORT}`)
})


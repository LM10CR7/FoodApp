const express=require("express");
const dotenv=require("dotenv");
const path=require("path");
const bodyparser=require("body-parser")
const home=require("./router/home");
 
const app=express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyparser.json()); 


app.use("/",home);


app.listen(process.env.PORT,() =>{
    console.log("app running"); 
})


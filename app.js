const express=require("express");
const dotenv=require("dotenv");
const path=require("path");
const bodyparser=require("body-parser")
const home=require("./router/home");
const login=require("./router/login");
const rider=require("./router/rider");
const userRegister=require("./router/userRegister"); 
const userLogin=require("./router/userLogin");
const riderRegister=require("./router/riderRegister");
const dashboard=require("./router/dashboard");
const menu=require("./router/menu");
const riderDashboard=require("./router/riderDashboard");
const order=require("./router/order");
const orderHistory=require("./router/orderHistory");
const details=require("./router/details");
const deliver_page=require("./router/deliver_page");
const cancelOrder=require("./router/cancelOrder");
const deliveryDetails=require("./router/deliveryDetails");
const review=require("./router/review");
const forgotPassword=require("./router/forgotPassword");
const session=require("express-session");

const{dbConfig}=require("./connection");

async function run(){
    connection=dbConfig();
}

 run();
const app=express();
dotenv.config();

app.use(session({
    secret: 'project559',
    resave : false,
    saveUninitialized : true,
}));
  
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyparser.json()); 


app.use("/",login);
app.use("/home",home);
app.use("/dashboard",dashboard);
app.use("/rider",rider); 
app.use("/userLogin",userLogin);
app.use("/userRegister",userRegister);
app.use("/riderRegister",riderRegister);
app.use("/menu",menu);
app.use("/riderDashboard",riderDashboard);
app.use("/orderHistory",orderHistory);
app.use("/details",details);
app.use("/deliver_page",deliver_page);
app.use("/cancelOrder",cancelOrder);
app.use("/deliveryDetails",deliveryDetails);
app.use("/review",review);
app.use("/forgotPassword",forgotPassword);

app.listen(process.env.PORT,() =>{
    console.log("app run"); 
})


const express=require("express");

const router=express.Router();

const userRegisterController=require("../controller/userRegisterController.js");

router.get('/',(req,res)=>{
    res.render('userRegister');
});

router.post('/',userRegisterController.registerUser);

module.exports=router;
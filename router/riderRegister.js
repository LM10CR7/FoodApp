const express=require("express");

const router=express.Router();

const riderRegisterController=require("../controller/riderRegisterController.js");

router.get('/',(req,res)=>{
    res.render('riderRegister');
});

router.post('/',riderRegisterController.registerRider);

module.exports=router;
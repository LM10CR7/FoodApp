const express=require("express");

const router=express.Router();

const{getStudents}=require("../controller/homeController.js");

router.get("/",getStudents);

module.exports=router;
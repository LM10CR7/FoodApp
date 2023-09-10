const oracle = require('oracledb');
const express = require('express');
const router = express.Router();
const{history}=require("../controller/detailsController.js");

   // Routes
router.get('/',history );
module.exports=router;
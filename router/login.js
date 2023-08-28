const express = require("express");

const router = express.Router();

const {getLogIn} = require("../controller/loginController");

router.get("/", getLogIn);

module.exports=router;
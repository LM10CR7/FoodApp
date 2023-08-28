const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('riderDashboard',{ error : "invalid ",bool:true}); // 

});
module.exports=router;
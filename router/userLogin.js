const express = require('express');
const router = express.Router();
const {checkLogin} = require('../controller/userLoginController');

   // Routes
router.get('/', (req, res) => {
     res.render('userLogin',{ error : "invalid "}); // 

});

router.post('/', checkLogin);

   // Export router
   module.exports = router;
   
const express = require('express');
const router = express.Router();
const {checkLogin} = require('../controller/riderController');

   // Routes
router.get('/', (req, res) => {
     res.render('rider',{ error : "invalid "}); // 

});

router.post('/', checkLogin);

// Export router
module.exports = router;
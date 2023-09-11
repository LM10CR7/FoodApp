const express=require("express");
const oracledb=require('oracledb');
const router=express.Router();

let order_id;



router.get('/',(req,res)=>{
    order_id = req.query.id;
    res.render('review');
})
router.post('/', async(req,res)=>{

    const connection=await oracledb.getConnection(  {
        user : "FOODCHAIN",
        password : "1234567",
        connectString : "localhost:1521/orclpdb",
    });

    const userReview = req.body.review;
    const query='UPDATE ORDERS SET REVIEW=:userReview WHERE ORDER_ID=:order_id';
    await connection.execute(query,{userReview,order_id});
    await connection.execute('commit');
    res.render('showreview',{userReview});
    //res.send('Review successfully Posted! You can now <a href="/orderHistory">Go Back</a>.');

})
module.exports=router;
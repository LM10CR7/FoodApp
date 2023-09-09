const express=require("express");
const oracledb=require('oracledb');
const router=express.Router();


router.get('/', async(req, res) => {
    const orderId = req.query.id; 
    console.log(orderId);

    const connection=await oracledb.getConnection(  {
        user : "FOODCHAIN",
        password : "1234567",
        connectString : "localhost:1521/orclpdb",
    });

    const query='DELETE FROM ORDERS WHERE ORDER_ID=:orderId';
    await connection.execute(query,{orderId});
    await connection.execute('commit')
    
    // After canceling the order, you can redirect the user back to the order history page
    res.render("cancelOrder");
});
module.exports=router;
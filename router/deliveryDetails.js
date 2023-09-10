const express=require("express");
const oracledb=require('oracledb');
const router=express.Router();



router.get('/', async(req, res) => {
    const orderId = req.query.order_id; 

    const connection=await oracledb.getConnection(  {
        user : "FOODCHAIN",
        password : "1234567",
        connectString : "localhost:1521/orclpdb",
    });
    // console.log(orderId,'chech');
    // const q2='SELECT USER_ID FROM ORDERS WHERE ORDER_ID=:orderId';
    // const res2=await connection.execute(q2,{orderId});
    //const user_id=res2.rows[0][0];
    const query='SELECT DELIVER_MAN_NAME,RATING,REVIEW,TIME,AMOUNT, (SELECT  FULLNAME FROM USERS WHERE USERS.USER_ID=GETUSERID(:orderId)) FROM DELIVER_MAN NATURAL JOIN ORDERS NATURAL JOIN PAYMENT WHERE ORDER_ID=:orderId';
    const result=await connection.execute(query,{orderId,orderId});
    const o1="GETUSERID";
    const o2="ORDER_ID";
    const deliver_man_id=process.env.riderId;
    await connection.execute(
        'INSERT INTO LOG_TABLE(RIDER_ID,FUNCTION_NAME,PARAMETERS) VALUES (:deliver_man_id,:o1,:o2)',{deliver_man_id,o1,o2}
    );
    await connection.execute('commit')
    
    // After canceling the order, you can redirect the user back to the order history page
    res.render("deliveryDetails",{details : result.rows});
});
module.exports=router;
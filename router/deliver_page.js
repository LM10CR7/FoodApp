const oracle=require("oracledb");
const express=require("express");

const router=express.Router();
const {dbConfig}=require("../connection");
router.get('/', async(req, res) => {

    const connection=await oracle.getConnection(  {
        user : "FOODCHAIN",
        password : "1234567",
        connectString : "localhost:1521/orclpdb",
    });

    const order_id = req.query.order_id;
    const deliver_man_id=req.session.riderId;
    const res1=await connection.execute('SELECT USER_ID FROM ORDER_SERIAL WHERE ORDER_ID=:order_id',
        {order_id} 
    );
    const user_id=res1.rows[0][0];
    //console.log(user_id,deliver_man_id,order_id,order_id);
    await connection.execute(
        'INSERT INTO PAYMENT (USER_ID,DELIVER_MAN_ID,ORDER_ID,AMOUNT) VALUES (:user_id,:deliver_man_id,:order_id,GET_BILL(:order_id))',
        {user_id,deliver_man_id,order_id,order_id}
    );
    var o1="GET_BILL";
    var o2="ORDER_ID";
    await connection.execute(
        'INSERT INTO LOG_TABLE(RIDER_ID,FUNCTION_NAME,PARAMETERS) VALUES (:deliver_man_id,:o1,:o2)',{deliver_man_id,o1,o2}
    );
    //console.log('err1');
    await connection.execute('UPDATE DELIVER_MAN SET DELIVERY_COUNT = DELIVERY_COUNT-1 WHERE DELIVER_MAN_ID=:deliver_man_id',
        {deliver_man_id}
    );
    //console.log('er2');
    await connection.execute('commit');
    await connection.execute('DELETE FROM ORDER_SERIAL WHERE ORDER_ID=:order_id',
        {order_id}
    );
    
    await connection.execute('commit');
    //console.log('er3');
    const q2='BEGIN UPDATE_COUNT(:order_id); END;'
    await connection.execute(q2,{order_id});
    o1="UPDATE_COUNT";
     o2="ORDER_ID";
    await connection.execute(
        'INSERT INTO LOG_TABLE(RIDER_ID,PROCEDURE_NAME,PARAMETERS) VALUES (:deliver_man_id,:o1,:o2)',{deliver_man_id,o1,o2}
    );

    await connection.execute('commit');
    res.render('deliver_page',{ error : "invalid "}); // 

});
module.exports=router;
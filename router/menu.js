const express=require("express");

const router=express.Router();

const oracle=require("oracledb");
const {dbConfig}=require("../connection");

//const{getMenu}=require("../controller/menuController.js");
//const{getOrder}=require("../controller/menuController.js");
let items={};
router.get('/',(req,res)=>{
    const id = req.query.id; 
    oracle.getConnection(
        {
            user : "FOODCHAIN",
            password : "1234567",
            connectString : "localhost:1521/orclpdb",
        },(err,con)=>{
            if(err) console.log("connection error");
            else{
                var query = "select * FROM Menu WHERE RESTAURANT_ID = :id"
                con.execute(
                    query,[id],{autoCommit:true},(e,result)=>{
                        if(e) console.log(e);
                        items=result.rows;
                        res.render("menu" , {menu : result.rows});
                        
                    }
                );
            }
        }
    );
});
router.post("/",async(req,res)=>{
    const orderedItems=[];
    try{
        const query1='SELECT * FROM DELIVER_MAN ORDER BY DELIVERY_COUNT ASC';
        const res1= await connection.execute(query1);
        const deliver_man_id=res1.rows[0][0];

        //const order_id=process.env.order_id;
        const user_id=process.env.userId;
        console.log(user_id,'user');
        const price=0;
        const review='pp';
        await connection.execute(
            "INSERT INTO ORDERS (ORDER_PRICE, REVIEW, USER_ID) VALUES (:price,:review, :user_id)",
            {price, review, user_id}
          );
        const res112=await connection.execute("SELECT ORDER_ID FROM ORDERS WHERE REVIEW='pp' ");
    
        //console.log(order_id);
        const order_id=res112.rows[0][0];
        console.log(order_id);
        for(var i=0;i<items.length;i++){
            const quantity=parseInt(req.body[items[i][0]]);
            if(quantity>0){
                orderedItems.push({name:items[i][1],quantity: quantity});
                const item_no=items[i][0];
                await connection.execute(
                    'INSERT INTO ORDER_HISTORY (ITEM_NO,ORDER_ID, COUNT) VALUES (:item_no,:order_id,:quantity)',
                    {item_no,order_id,quantity}
                  );
                  await connection.execute('commit');
            }
            //console.log(items[i][1],'Amount',quantities[items[i][1]]);
        }
        //console.log(quantities);
        res.render('order',{orderedItems});
    }catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

module.exports=router;
const express=require("express");

const router=express.Router();

const oracle=require("oracledb");

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
router.post("/",(req,res)=>{
    const orderedItems=[];
    for(var i=0;i<items.length;i++){
        const quantity=parseInt(req.body[items[i][0]]);
        if(quantity>0){
            orderedItems.push({name:items[i][1],quantity: quantity});
        }
        //console.log(items[i][1],'Amount',quantities[items[i][1]]);
    }
    //console.log(quantities);
    res.render('order',{orderedItems});
});

module.exports=router;
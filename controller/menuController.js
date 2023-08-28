const oracle = require('oracledb');

function getMenu(req,res){

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
                        res.render("menu" , {menu : result.rows});
                    }
                );
            }
        }
    );
}

function getOrder(req,res){
    console.log('ashse');
    console.log(menu);
    res.redirect("/home");
}

module.exports = {
    getOrder
}
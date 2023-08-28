const oracle = require('oracledb');

function getStudents(req,res){

    // const serializedObject = req.query.data;
    // const myObject = JSON.parse(decodeURIComponent(serializedObject));
    // console.log(myObject[0]);
    oracle.getConnection(
        {
            user : "FOODCHAIN",
            password : "1234567",
            connectString : "localhost:1521/orclpdb",
        },(err,con)=>{
            if(err) console.log("connection error");
            else{
                var query = "select * FROM Restaurants"
                con.execute(
                    query,[],{autoCommit:true},(e,result)=>{
                        if(e) console.log(e);
                        res.render("dashboard" , {students : result.rows});
                    }
                );
            }
        }
    );
}
module.exports = {
    getStudents,
}
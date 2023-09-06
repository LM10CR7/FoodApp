const oracle = require("oracledb");
async function getStudents(req,res){
    const connection=await oracle.getConnection(  {
        user : "FOODCHAIN",
        password : "1234567",
        connectString : "localhost:1521/orclpdb",
    });
    var query = "select * FROM Restaurants";
    var query2="SELECT * FROM RESTAURANTS NATURAL JOIN MENU";
    const result =await connection.execute(query);
    const res2=await connection.execute(query2);
    res.render("dashboard" , { students: result.rows, foods: res2.rows });
}
module.exports = {
    getStudents,
  };
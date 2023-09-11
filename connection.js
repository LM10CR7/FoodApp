const oracle = require("oracledb");

async function dbConfig(){

        connection =await oracle.getConnection(  {
            user : "FOODCHAIN",
            password : "1234567",
            connectString : "localhost:1521/orclpdb",
        });
    return connection;
}
module.exports={
    dbConfig
}
const oracledb=require('oracledb');
const { connect } = require('../router/home');
//const bcrypt=require('bcrpyt');

const dbConfig={
    user : "UNIVERSITY",
    password : "12345",
    connectString : "localhost:1521/orclpdb",
};


const saltRounds=10;

async function registerUser(req,res){
    const{username,password,name,email,phone,location}=req.body;
    console.log(username,password,name,email,phone,location);
    try {
        //const hashedPassword = await bcrypt.hash(password, saltRounds);
        //const connection = await oracledb.getConnection(dbConfig);
 
        await connection.execute(
          "INSERT INTO users (fullname,username, email, password,phone,city) VALUES (:name,:username,:email, :password,:phone,:location)",
          { name,username,email, password, phone,location}
        );
        await connection.execute('commit');
 
        res.send('Registration successful! You can now <a href="/userLogin">login</a>.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
 
// Export controller functions
 module.exports = {
     registerUser,
};
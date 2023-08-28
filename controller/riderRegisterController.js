const oracledb=require('oracledb');
const { connect } = require('../router/home');
//const bcrypt=require('bcrpyt');

const dbConfig={
    user : "FOODCHAIN",
    password : "1234567",
    connectString : "localhost:1521/orclpdb",
};


const saltRounds=10;

async function registerRider(req,res){
    const{name,password,phone,city}=req.body;
    const count=0,rating=5;
    console.log(name,password,phone,city);
    try {
        //const hashedPassword = await bcrypt.hash(password, saltRounds);
        //const connection = await oracledb.getConnection(dbConfig);
        //console.log(name,phone,location,password,rating,count);
        await connection.execute(
          "INSERT INTO DELIVER_MAN (DELIVER_MAN_NAME,MOBILE,CITY, password,RATING,Delivery_count) VALUES (:name,:phone,:city,:password,:rating,:count)",
          { name, phone,city,password,rating,count}
          
        );
  
        await connection.execute('commit');
 
        res.send('Registration successful! You can now <a href="/rider">login</a>.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
 
// Export controller functions
 module.exports = {
     registerRider,
};
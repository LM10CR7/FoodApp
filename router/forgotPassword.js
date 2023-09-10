const express=require("express");
const oracledb=require('oracledb');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("forgotPassword");
})

router.post("/",async(req,res)=>{
    const{username,email,newPassword}=req.body;
    const user_id=process.env.userId;
    console.log(username,email,newPassword);
    try {
           var query = 'SELECT  * from users WHERE USERNAME = :username' ;
        const result =await connection.execute(query,[username]); 
        console.log(result.rows.length)
        if(result.rows.length === 0){
            res.send("User not found");
        }
        else{
            ///console.log(result.rows);
            const useremail = result.rows[0][3];
            
            if (useremail===email) {
                // const query3='UPDATE USERS SET PASSWORD = :newPassword WHERE USERNAME=:username';
                // 
                const q2='BEGIN CHANGE_PASSWORD(:username,:newPassword); END;'
                await connection.execute(q2,{username,newPassword});
                const o1="CHANGE_PASSWORD";
                const o2="USERNAME";
                await connection.execute(
                    'INSERT INTO LOG_TABLE(USER_ID,PROCEDURE_NAME,PARAMETERS) VALUES (:user_id,:o1,:o2)',{user_id,o1,o2}
                );
                await connection.execute('commit');
                res.send('Password changed successfully! You can now <a href="/userLogin">login</a>.');
            
            } else {
                res.send('Email does not match!');
            }
        }
    }catch (err) {
        res.status(500).json({ error: err.message });
      }
});

module.exports=router;
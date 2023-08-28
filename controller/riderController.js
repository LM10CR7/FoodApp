async function checkLogin(req ,res){
    //console.log("running"); 
    const { mobile, password } = req.body;
    //console.log(username,password);
    var query = 'SELECT  * from deliver_man WHERE MOBILE = :mobile' ;
    const result =await connection.execute(query,[mobile]); 
    console.log(result.rows.length)
    if(result.rows.length === 0){
        res.send("User not found");
    }
    else{
        ///console.log(result.rows);
        const dbPasswordHash = result.rows[0][4];
        ///console.log(dbPasswordHash);
         //const match = dbPasswordHash==password;//await bcrypt.compare(password, dbPasswordHash);

         if (dbPasswordHash===password) {
          process.env.riderId=result.rows[0][0];
           //req.session.user = { username };
           res.redirect('/riderDashboard');
         } else {
           res.send('Invalid password');
         }
    }
}

 // Export controller functions
 module.exports = {
    checkLogin,
  };
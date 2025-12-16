import mysql2 from"mysql2";

const db=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Shiv@199",
    database:"CASETIME"
})

db.connect((err)=>{
    if(err){
        console.log("connection failed",err);

    }
    else{
        console.log("connected successfully !")
    }
})
export default db;
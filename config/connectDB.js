import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();

const Connection=mysql.createConnection({
     host:process.env.DB_HOST,
     database:process.env.DB_NAME,
     user:process.env.DB_USERNAME,
     password:process.env.DB_PASSWORD
});

Connection.connect( function(err){
    if(err) throw err ;
    console.log("Database connected !");
});

export default Connection;
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: './env'})
const app = express();

const db = mysql.createConnection({

    host: process.env.DATABABSE_HOST,
    user: process.env.DATABABSE_USER,
    password: process.env.DATABABSE_PASSWORD,
    database: process.env.DATABABSE
});

app.set('view engine', 'hbs')

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connted with mysql");
    }
});


app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>")
});

app.listen(5000, () => {
console.log("Server listening on port 5000");


});
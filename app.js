const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: './env'})
const app = express();

const db = mysql.createConnection({

    host: process.env.DATABABSE_HOST,
    user: process.env.DATABABSE_USER,
    password: process.env.DATABABSE_PASSWORD,
    database: process.env.DATABABSE
});


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
//onsole.log(__dirname);

app.set('view engine', 'hbs');

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connted with mysql");
    }
});


app.get("/", (req, res) => {
    //res.send("<h1>Home Page</h1>")
    res.render("index")

});

app.get("/register", (req, res) => {
    //res.send("<h1>Home Page</h1>")
    res.render("register")

});

app.listen(5000, () => {
console.log("Server listening on port 5000");


});

//We have all the time that life gives us, 
//but we don't know how long we have it.

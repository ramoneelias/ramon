const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const { Console } = require("console");
// const router = express.Router();
dotenv.config({ path: './env'})
const app = express();

// const db = mysql.createConnection({

//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
}).promise();


// Declaración de una función asíncrona
// async function miFuncion() {
//     try {
//       // Código con await
//       const [rows] = await pool.query('SELECT * FROM USERS');
//       console.log(rows);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  
//   // Llamada a la función asíncrona
//   miFuncion();
/////////////////////  

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


//parse url encoded bodies (as sent by html form)
app.use(express.urlencoded({ extended: false}));

//parser json bodles (as sent api client)
app.use(express.json());

//onsole.log(__dirname);
app.set('view engine', 'hbs');

 pool.getConnection((err)=>{
     if(err){
         console.log(err)
     }else{
                 console.log("connted with mysql");
     }
 });


//define routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(5001, () => {
console.log("Server listening on port 5001");



});



//We have all the time that life gives us, 
//but we don't know how long we have it.

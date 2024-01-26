const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({

    host: process.env.DATABABSE_HOST,
    user: process.env.DATABABSE_USER,
    password: process.env.DATABABSE_PASSWORD,
    database: process.env.DATABABSE
});

exports.register = (req, res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;

db.query("SELECT email FROM Proyecto1.usuario WHERE email = ?", [email], async( error, results) => {
if (error){
    console.log(error)
}

if(results?.length > 0 ) {
return res.render('register', {
    massage: "that email is alread exist!"
})

} else if (password != passwordConfirm){
    return res.render('register', {
        massage: "Passwords do not match"
    })
}

let hashePassword = await bcrypt.hash(password, 8);
console.log(hashePassword);
res.send('testing');



});



}
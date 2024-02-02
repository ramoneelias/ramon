const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);


const {name, email, password, passwordConfirm} = req.body;

db.query('SELECT email FROM PROYECTO.USERS WHERE email = ?', [email], async(error, results) => {
if (error){
    console.log(error);
}

if(results?.length > 0 ) {
return res.render('register', {
    massage: "that email is alread exist!"
})

} else if( password != passwordConfirm ) {
    return res.render('register', {
        massage: "Passwords do not match"
    });
}


let hashedPassword = await bcrypt.hash(password, 8);
console.log(hashedPassword);
res.send('testing');

});


}
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');

const { redirectToHome } = require('../middleware');

router.get('/', redirectToHome,(req, res) => {
    res.render('pages/signup');
});

// for creating new users

router.post('/', redirectToHome, (req, res) => {
    // creating variable
    const { firstname, lastname, email, password, confirm_password } = req.body;
    // console.log(req.body);

    //    putting data in databse users table
    // 1. first check if user already exists
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', email)
        .then((userExists) => {
            if (userExists) {
                res.redirect('/?message=User%20already%20exists');

                // 2.if not create a new user
            } else {
                // creating a hash password
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                // changing email text into lowercase and removing all the spaces
                const cleanEmail = email.toLowerCase().trim();

                console.log(`firstname : ${firstname}`);
                // if input is empty
                if (!firstname ||
                    !lastname ||
                    !email ||
                    !password ||
                    !confirm_password
                ) {
                    return res.status(400).json({ msg: 'Please fill all the field' });
                } else {
                    // putting data in database table
                    db.none(
                            'INSERT INTO users (firstname ,lastname ,email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, cleanEmail, hash]
                        )
                        .then(() => {
                            res.redirect('/');
                        })
                        .catch((err) => {
                            console.log(err);
                            res.send(err);
                        });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});


module.exports = router;
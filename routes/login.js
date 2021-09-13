const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('pages/login', {
    message: req.query.message
  })
});


router.post('/', (req, res) => {
  const { email, password } = req.body
  // 1. validate

  // 2. does the email exist in the db?
  const cleanedEmail = email.toLowerCase().trim()
  console.log(cleanedEmail)
  db.oneOrNone('SELECT * FROM users WHERE email = $1;', cleanedEmail)
  .then(user => {
    if (!user) {
      res.redirect('/login?message=Email%20or%20password%20is%20incorrect.')
    } else {
      // 3. if so, verify password and 
      console.log(password)
      console.log(user.id)
      bcrypt.compare(password, user.password)
      .then(result => {
        console.log(result)
        console.log(req.session)
         //res.redirect('/homepage')
        if (result) {
          //TODO: edit session and redirect with success message
         req.session.userId = user.id
         console.log(req.session)
          res.redirect('/homepage')
         } else {
          res.redirect('/login?message=Email%20or%20password%20is%20incorrect.')
        }
      })
      .catch(error => {
        console.log(error)
        res.send(error)
      })
    }
  })
  .catch(error => {
    console.log(error)
    res.send(error)
  })
})


module.exports = router;
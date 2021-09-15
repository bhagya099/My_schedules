const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middleware');

router.get('/', redirectToLogin, (req,res) => {
    res.render('pages/schedules')
})

router.post('/', redirectToLogin, (req, res) => {
     db.none('INSERT INTO schedules(users_id, day, start_time, end_time) VALUES($1, $2, $3, $4);', [req.body.users_id, req.body.day, req.body.start_time, req.body.end_time])
  .then(() => {
    res.redirect('/schedules')
  })
  .catch(error => {
    console.log(error)
    res.send(error)
  })
})
module.exports = router
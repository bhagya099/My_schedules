const express = require('express');
const router = express.Router();
const db = require('../database');

const { redirectToLogin } = require('../middleware');

router.get('/', redirectToLogin, (req, res) => {
  //   res.render('pages/homepage');
  db.any(
    'SELECT users.users_id, users.firstname, schedules.day, schedules.start_time, schedules.end_time FROM users RIGHT JOIN schedules ON schedules.users_id = users.users_id ORDER BY users.users_id;'
  )
    .then((users) => {
      // console.log(users);

      res.render('pages/homepage', {
        users,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
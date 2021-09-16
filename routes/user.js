const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/:id', (req, res) => {
  db.any('SELECT * FROM users;')
    .then((users) => {
      // if(req.params)
      users.forEach((user) => {
        if (user.users_id === Number(req.params.id)) {
          console.log('found it');
          //console.log(user);
          res.render('pages/user', {
            user,
          });
        }
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;

const express = require('express')

const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middleware');

router.get('/', redirectToLogin, (req, res) => {
  db.any('SELECT users_id, day, start_time, end_time FROM schedules;')
    .then((schedules) => {
      console.log(req.session.userId);
      const newSchedule = schedules.filter((schedule) => {
        if (schedule.users_id == req.session.userId) {
          console.log(schedule);
          return schedule;
        }
      });

      res.render('pages/schedules', {
        newSchedule,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});


router.post('/', redirectToLogin, (req, res) => {
  const { day, start_time, end_time } = req.body;
  // db.oneOrNone('SELECT * FROM schedules WHERE users_id = $1;', users_id)
  //   .then((userId) => {
  //     console.log(userId);
  // if (!userId) {
  // }
  //   db.none(
  //     'INSERT INTO schedules(users_id, day, start_time, end_time) VALUES($1, $2, $3, $4);',
  //     [users_id, day, start_time, end_time]
  //   ).then(() => {
  //     res.redirect('/schedules');
  //   });
  // })
  if (!day || !start_time || !end_time) {
    return res.status(400).json({ msg: 'Please fill all the field' });
  } else {
    db.none(
      'INSERT INTO schedules(users_id, day, start_time, end_time) VALUES($1, $2, $3,$4);',
      [req.session.userId, day, start_time, end_time]
    )
      .then(() => {
        res.redirect('/schedules');
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  }
})
module.exports = router
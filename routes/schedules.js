const express = require('express')

const router = express.Router()
const db = require('../database')
const { redirectToLogin } = require('../middleware');

router.get('/', redirectToLogin, (req, res) => {
  db.any(
    "SELECT users_id, day, TO_CHAR(start_time, 'HH12:MM AM') start_time, TO_CHAR(end_time, 'HH12:MM AM') end_time FROM schedules;"
  )
    .then((schedules) => {
      const newSchedule = schedules.filter((schedule) => {
        if (schedule.users_id == req.session.userId) {
          const week = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ];
          for (let i = 1; i <= week.length + 1; i++) {
            if (i == schedule.day) {
              schedule.day = week[i - 1];
            }
          }
          return schedule;
        }
      });

      res.render('pages/schedules', {
        newSchedule,
        message: req.query.message,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.post('/', redirectToLogin, (req, res) => {
  const { day, start_time, end_time } = req.body;
  // for not taking empty values
  if (!day || !start_time || !end_time) {
    // return res.status(400).json({ msg: 'Please fill all the fields' });
     res.redirect(
          '/schedules?message=Please%20fill%20has%20all%20the%20fields.'
        );
  } else if(end_time <= start_time){
      res.redirect(
          '/schedules?message=End%20time%20should%20be%20greater%20than%20start%20time.'
        );
  }
  else {
    db.any(
      'SELECT users_id, day, start_time, end_time FROM schedules WHERE users_id =$1 AND day=$2;',
      [req.session.userId, day]
    ).then((schedules) => {
      const overlap = schedules.some((schedule) => {
        return (
          start_time <= schedule.end_time && end_time >= schedule.start_time
        );
      });
      console.log(overlap);
      if (overlap) {
        res.redirect(
          '/schedules?message=This%20time%20has%20already%20been%20taken%20select%20another%20time.'
        );
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
    });
  }
});
module.exports = router
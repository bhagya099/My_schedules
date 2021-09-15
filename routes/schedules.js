const express = require('express')
const router = express.Router();
const db = require('../database');
//const { redirectToHome } = require('../middleware');

router.get('/', (req, res) => {
  db.any('SELECT users_id, day, start_time, end_time FROM schedules;')
    .then((schedules) => {
      console.log(req.session.userId);
      schedules.some((schedule) => {
        if (schedule.users_id == req.session.userId) {
          console.log(schedule);
          res.render('pages/schedules', {
            schedule,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// router.post('/', redirectToHome, (req, res) => {

//})
module.exports = router
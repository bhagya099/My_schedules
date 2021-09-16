const express = require('express');
const router = express.Router();
const db = require('../database');

const { redirectToLogin } = require('../middleware');

router.get('/', redirectToLogin, (req, res) => {
  //   res.render('pages/homepage');
  db.any(
    "SELECT users.users_id, users.firstname, schedules.day, TO_CHAR(start_time, 'HH12:MM AM') start_time, TO_CHAR(end_time, 'HH12:MM AM') end_time FROM users RIGHT JOIN schedules ON schedules.users_id = users.users_id ORDER BY users.users_id;"
  )
    .then((users) => {
      //console.log(users)
      users.forEach((user) =>{
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];
        for(let i=1; i <= 7; i++)
        { 
          if(i == user.day)
           {
               user.day = week[i-1];                         
          }
        }
        return user;
      })

      console.log(users);
    
      res.render('pages/homepage', {
        users,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
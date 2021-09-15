const express = require('express')
const router = express.Router()
//const { redirectToHome } = require('../middleware');

router.get('/', (req,res) => {
    res.render('pages/schedules')
})

// router.post('/', redirectToHome, (req, res) => {

//})
module.exports = router
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/login',{
        name: 'Pooja'
    })
})


module.exports = router